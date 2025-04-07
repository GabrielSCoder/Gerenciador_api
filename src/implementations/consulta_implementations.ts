import { Op, Sequelize } from "sequelize";
import Cliente from "../db/models/cliente";
import { clientFilter } from "../types/cliente";
import Consulta from "../db/models/consulta";
import { consultaForm, consultaPagination } from "../types/consulta";


async function validar(data: consultaForm) {
    if (!data.descricao || !data.preco || !data.cliente_id)
        throw new Error("Dados obrigatórios")

}

async function validarUpdate(data: consultaForm & { id : number}) {

    if (!data.descricao || !data.preco || !data.cliente_id || data.id)
        throw new Error("Dados obrigatórios")

    const checkConsulta = await Consulta.findByPk(data.id)

    if (!checkConsulta) throw new Error("Consulta não encontrado")
}


async function convert(data: any) {

    const consulta = {
        id: data.id,
        descricao: data.descricao,
        cliente_id : data.cliente_id,
        preco : data.preco,
        horario : data.horario ?? "",
        data_criacao: data.data_criacao
    }

    return consulta
}

export async function criarConsulta(data: consultaForm, id : number) {

    await validar(data)

    const response = await Consulta.create({ ...data, data_criacao: Date.now(), usuario_criacao : id })

    if (!response) throw new Error("Erro na criação")

    return response.id
}

export async function getById(id: number) {
    const response = await Consulta.findOne({
        where: { id: id },
        include: [{
            model: Cliente,
            as: "cliente",
            attributes: ["nome", "id"]
        }]
    });

    if (!response) throw new Error("Não encontrado");

    return await convert(response);
}

async function getItem(id: number) {
    const response = await Consulta.findByPk(id)

    if (!response) throw new Error("Não encontrado")

    return response
}

export async function getallConsultas() {

    const list = await Consulta.findAll()

    const convertList = await Promise.all(list.map(async (value: any) => await convert(value)));

    return convertList
}

export async function update(data: consultaForm & {id : number}, id : number) {

    await validarUpdate(data)

    const update = await Consulta.update({
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

    const del = Consulta.destroy({ where: { id: response.id } })

    if (!del) throw new Error("Erro na deleção")

    return response.id
}

export async function getConsultasByFilter (filter: clientFilter) {

    var list

    const lista = await Consulta.findAll(
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

    const item: consultaPagination = {
        quantidade: lista.length,
        pagina: filter.numeroPagina,
        numeroPaginas: nSegments,
        listaClientes: list || []
    }

    return item
}
