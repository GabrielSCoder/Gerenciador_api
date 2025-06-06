import { Op, Sequelize } from "sequelize";
import Perfil_Acesso from "../db/models/perfil_acesso";
import Usuario from "../db/models/usuario";
import { clientFilter, clientPagination } from "../types/cliente";
import { usuarioFormulario, usuarioFormularioResponse } from "../types/usuario";


async function validar(data: usuarioFormulario) {
    if (!data.email || !data.nome || !data.senha || !data.perfil_acesso_id)
        throw new Error("Dados obrigatórios")

    const checkPerfil = await Perfil_Acesso.findByPk(data.perfil_acesso_id)

    if (!checkPerfil) throw new Error("Perfil de acesso não encontrado")
}

async function validarUpdate(data: usuarioFormularioResponse) {
    if (!data.id || !data.email || !data.nome || !data.senha || !data.perfil_acesso_id)
        throw new Error("Dados obrigatórios")

    const checkPerfil = await Perfil_Acesso.findByPk(data.perfil_acesso_id)

    if (!checkPerfil) throw new Error("Perfil de acesso não encontrado")
}


async function convert(data: any) {

    const usuario = {
        id: data.id,
        nome: data.nome,
        email: data.email,
        data_criacao: data.data_criacao,
        perfil_acesso_id: data.perfil_acesso_id,
        perfil_acesso_usuario: data.perfil_acesso_usuario
    }

    return usuario
}

export async function criarUsuario(data: usuarioFormulario) {
    await validar(data)

    const response = await Usuario.create({ ...data, data_criacao: Date.now() })

    if (!response) throw new Error("Erro na criação")

    return response.id
}

export async function getById(id: number) {
    const response = await Usuario.findOne({
        where: { id: id },
        include: [{
            model: Perfil_Acesso,
            as: "perfil_acesso_usuario",
            attributes: ["nome", "descricao", "id"]
        }]
    });

    if (!response) throw new Error("Não encontrado");

    return await convert(response);
    // return response
}

async function getItem(id: number) {
    const response = await Usuario.findByPk(id)

    if (!response) throw new Error("Não encontrado")

    return response
}

export async function getallUsers() {

    const list = await Usuario.findAll()

    const convertList = await Promise.all(list.map(async (value: any) => await convert(value)));

    return convertList
}

export async function getUserSelect() {
    const list = await Usuario.findAll()

    const convertList = list.map((value) => { return { id : value.id, nome : value.nome }})

    return convertList
}

export async function getUsersByFilter (filter: clientFilter) {

    var list

    const lista = await Usuario.findAll(
        {
            where: {
                [Op.or]: [
                    { nome: { [Op.iLike]: `%${filter.pesquisa}%` } },
                    { endereco: { [Op.iLike]: `%${filter.pesquisa}%` } },
                    { indentificacao: { [Op.iLike]: `%${filter.pesquisa}%` } }
                ]
            },
            limit : filter.tamanhoPagina,
            offset : (filter.numeroPagina - 1) * filter.tamanhoPagina,
            order : [[Sequelize.literal("data_criacao"), "DESC"]]
        },
    )
    

    const nSegments = Math.ceil(lista.length / filter.tamanhoPagina)

    if (nSegments != filter.numeroPagina) {
        const primeiraPos = (filter.numeroPagina - 1) * filter.tamanhoPagina
        const ultimaPos = primeiraPos + filter.tamanhoPagina
        list = lista.slice(primeiraPos, ultimaPos)
    } else if (nSegments == filter.numeroPagina) {
        const primeiraPos = (filter.numeroPagina - 1) * filter.tamanhoPagina
        list = lista.slice(primeiraPos)
    }

    const item: clientPagination = {
        quantidade_clientes: lista.length,
        pagina: filter.numeroPagina,
        numeroPaginas: nSegments,
        listaClientes: list || []
    }

    return item
}

export async function update(data: usuarioFormularioResponse) {

    await validarUpdate(data)

    const update = await Usuario.update({
        ...data,
        data_modificacao: Date.now()
    }, {
        where: { id: data.id },
        individualHooks : true
    })

    if (!update) throw new Error("Erro na atualização")

    return true
}

export async function destroy(id: number) {
    const response = await getItem(id)

    const del = Usuario.destroy({ where: { id: response.id } })

    if (!del) throw new Error("Erro na deleção")

    return response.id
}

export async function createAdminUser() {

    const data = {
        nome: "ADMIN",
        senha: "123123",
        email: "dev@test.com",
        perfil_acesso_id : 1
    }

    const response = await Usuario.create({ ...data, data_criacao: Date.now() })

    return response.id
}