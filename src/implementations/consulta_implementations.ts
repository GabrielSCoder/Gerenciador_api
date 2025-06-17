import { Op, Sequelize } from "sequelize";
import Cliente from "../db/models/cliente";
import { clientFilter } from "../types/cliente";
import Consulta from "../db/models/consulta";
import { consultaFilter, consultaForm, consultaPagination } from "../types/consulta";
import Usuario from "../db/models/usuario";
import { startOfDay, endOfDay } from 'date-fns';
import { fromZonedTime } from 'date-fns-tz';

const timezone = 'America/Sao_Paulo';


async function validar(data: consultaForm) {
    const erros: string[] = [];

    if (!data.descricao) erros.push("Descrição obrigatória!");
    if (!data.preco) erros.push("Preço obrigatório!");
    if (!data.cliente_id) erros.push("Paciente obrigatório!");
    if (!data.tipo) erros.push("Tipo obrigatório!");
    if (!data.procedimento) erros.push("Procedimento obrigatório!");
    if (!data.forma_pagamento) erros.push("Forma de pagamento obrigatória!");
    if (!data.horario) erros.push("Data de criação obrigatória!");
    if (!data.profissional_id) erros.push("Profissional responsável obrigatório!");

    if (erros.length > 0) {
        throw new Error(erros.join(" | "));
    }
}

async function validarUpdate(data: consultaForm & { id: number }) {

    await validar(data)

    if (!data.id) throw new Error("id obrigatório")

    const checkConsulta = await Consulta.findByPk(data.id)

    if (!checkConsulta) throw new Error("Consulta não encontrado")
}


async function convert(data: any) {
    const consulta = {
        id: data.id,
        descricao: data.descricao,
        cliente_id: data.cliente_id,
        preco: data.preco ? parseFloat(data.preco.toString()) : 0,
        horario: data.horario ?? "",
        profissional_id: data.profissional_id,
        forma_pagamento: data.forma_pagamento,
        pago: data.pago,
        tipo: data.tipo,
        status: data.status,
        procedimento: data.procedimento,
        dente_afetado: data.dente_afetado,
        data_criacao: data.data_criacao,
        data_modificacao: data.data_modificacao,
        usuario_criacao: data.usuario_criacao,
        usuario_modificao: data.usuario_modificacao,

        cliente: data.cliente ? {
            id: data.cliente.id,
            nome: data.cliente.nome,
        } : null,

        profissional: data.profissional ? {
            id: data.profissional.id,
            nome: data.profissional.nome,
        } : null,
    };

    return consulta;
}


export async function criarConsulta(data: consultaForm, id: number) {

    await validar(data)

    const response = await Consulta.create({ ...data, data_criacao: Date.now(), usuario_criacao: id })

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
        },
        {
            model: Usuario,
            as: "profissional",
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

export async function update(data: consultaForm & { id: number }, id: number) {

    await validarUpdate(data)

    const update = await Consulta.update({
        ...data,
        data_modificacao: Date.now(),
        usuario_modificacao: id
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

export async function getConsultasByFilter(filter: consultaFilter) {

    var list

    const whereConditions: any = {
        [Op.or]: [
            { descricao: { [Op.iLike]: `%${filter.pesquisa}%` } },
            { procedimento: { [Op.iLike]: `%${filter.pesquisa}%` } },
            { tipo: { [Op.iLike]: `%${filter.pesquisa}%` } },
            { observacoes: { [Op.iLike]: `%${filter.pesquisa}%` } }
        ]
    }

    const andConditions: any[] = []

    if (filter.criador) {
        andConditions.push({ usuario_criacao: { [Op.eq]: filter.criador } })
    }

    if (filter.profissional) {
        andConditions.push({profissional_id : { [Op.eq]: filter.profissional }})
    }

    if (filter.cliente) {
          andConditions.push({cliente_id : { [Op.eq]: filter.cliente }})
    }

    if (filter.dataCadastroInicio && filter.dataCadastroFim) {
        // const inicio = fromZonedTime(startOfDay(new Date(filter.dataCadastroInicio)), timezone);
        // const fim = fromZonedTime(endOfDay(new Date(filter.dataCadastroFim)), timezone);

        const inicio = new Date(filter.dataCadastroInicio)
        const fim = new Date(filter.dataCadastroFim)
        andConditions.push({ data_criacao: { [Op.between]: [inicio, fim] } });
    } else if (filter.dataCadastroInicio) {
        const inicio = new Date(filter.dataCadastroInicio)
        andConditions.push({ data_criacao: { [Op.gte]: inicio } });
    } else if (filter.dataCadastroFim) {
        const fim = new Date(filter.dataCadastroFim)
        andConditions.push({ data_criacao: { [Op.lte]: fim } });
    }


    if (filter.horarioInicio && filter.horarioFim) {
        // const inicio = fromZonedTime(startOfDay(new Date(filter.horarioInicio)), timezone);
        // const fim = fromZonedTime(endOfDay(new Date(filter.horarioFim)), timezone);
        const inicio = new Date(filter.horarioInicio)
        const fim = new Date(filter.horarioFim + "T23:59:59")

        andConditions.push({ horario: { [Op.between]: [inicio, fim] } });
    } else if (filter.horarioInicio) {
        const inicio = new Date(filter.horarioInicio)
        andConditions.push({ horario: { [Op.gte]: inicio } });
    } else if (filter.horarioFim) {
        const fim = new Date(filter.horarioFim)
        andConditions.push({ horario: { [Op.lte]: fim } });
    }

    if (andConditions.length > 0) {
        whereConditions[Op.and] = andConditions;
    }

    const lista = await Consulta.findAll(
        {
            where: whereConditions,
            include: [{
                model: Cliente,
                as: "cliente",
                attributes: ["nome", "id"]
            },
            {
                model: Usuario,
                as: "profissional",
                attributes: ["nome", "id"]
            }],
            limit: filter.tamanhoPagina,
            offset: (filter.numeroPagina - 1) * filter.tamanhoPagina,
            order: [[Sequelize.literal(filter.modificador ? filter.modificador : "data_criacao"), filter.ordem ? filter.ordem : "DESC"]]
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
        listaConsultas: list || []
    }

    return item
}
