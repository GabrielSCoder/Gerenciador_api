import { Op, Sequelize } from "sequelize";
import Cliente from "../db/models/cliente";
import Perfil_Acesso from "../db/models/perfil_acesso";
import Usuario from "../db/models/usuario";
import { clienteForm, clientFilter, clientPagination } from "../types/cliente";


async function validar(data: clienteForm) {
    if (!data.nome || !data.endereco || !data.numero)
        throw new Error("Dados obrigatórios")

}

async function validarUpdate(data: clienteForm & { id : number}) {

    if (!data.nome || !data.endereco || !data.numero || !data.id)
        throw new Error("Dados obrigatórios")

    const checkPerfil = await Cliente.findByPk(data.id)

    if (!checkPerfil) throw new Error("Cliente não encontrado")
}


async function convert(data: any) {

    const cliente = {
        id: data.id,
        nome: data.nome,
        endereco : data.endereco,
        numero : data.numero,
        indentificacao : data.indentificacao ?? "",
        data_criacao: data.data_criacao,
        perfil_acesso_id: data.perfil_acesso_id,
        perfil_acesso_usuario: data.perfil_acesso_usuario
    }

    return cliente
}

export async function criarCliente(data: clienteForm, id : number) {
    await validar(data)

    const response = await Cliente.create({ ...data, data_criacao: Date.now(), usuario_criacao : id })

    if (!response) throw new Error("Erro na criação")

    return response.id
}

export async function getById(id: number) {
    const response = await Cliente.findOne({
        where: { id: id },
        include: [{
            model: Usuario,
            as: "cliente_usuario",
            attributes: ["nome", "id"]
        }]
    });

    if (!response) throw new Error("Não encontrado");

    return await convert(response);
}

async function getItem(id: number) {
    const response = await Cliente.findByPk(id)

    if (!response) throw new Error("Não encontrado")

    return response
}

export async function getallClients() {

    const list = await Cliente.findAll()

    const convertList = await Promise.all(list.map(async (value: any) => await convert(value)));

    return convertList
}

export async function update(data: clienteForm & {id : number}, id : number) {

    await validarUpdate(data)

    const update = await Cliente.update({
        ...data,
        data_modificacao: Date.now(),
        usuario_modificacao : id
    }, {
        where: { id: data.id }
    })

    if (!update) throw new Error("Erro na atualização")

    return update
}

export async function destroy(id: number) {
    const response = await getItem(id)

    const del = Cliente.destroy({ where: { id: response.id } })

    if (!del) throw new Error("Erro na deleção")

    return response.id
}

export async function getClientsByFilter (filter: clientFilter) {

    var list

    const lista = await Cliente.findAll(
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
