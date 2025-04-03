import Sessao from "../db/models/sessao";
import { sessaoForm } from "../types/sessao";


export async function checarSessao (id : number) {
    const check = await Sessao.findByPk(id)

    if(!check) throw new Error("Sessão não encontrada")

    return check
}

export async function criarSessao (data : sessaoForm) {
    if (!data.usuario_id || !data.usuario_id) {
        throw new Error("dados obrigatórios")
    }

    const response = await Sessao.create({...data, data_criacao : Date.now()})

    if (!response) throw new Error("Erro na criação da sessão")

    return response.id
}

export async function extiguirSessao (id : number) {
    const session = await checarSessao(id)

    const response = await Sessao.destroy({where : {id : session.id}})

    if (!response) throw new Error("Erro na deleção")

    return session.id
}

export async function listarSessoes () {
    const lista = await Sessao.findAll()
    return lista
}
