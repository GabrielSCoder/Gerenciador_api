import Perfil_Acesso from "../db/models/perfil_acesso";
import Perfil_Acesso_Item from "../db/models/perfil_acesso_item";
import Usuario from "../db/models/usuario";
import { perfilAcessoForm } from "../types/perfil_acesso";
import jwt from "jsonwebtoken"

function validar(data: perfilAcessoForm) {
    if (!data.descricao || !data.nome)
        throw new Error("Dados obrigatórios")
}

function validarEdição(data: perfilAcessoForm & { id: number }) {
    if (!data.id || !data.descricao || !data.nome)
        throw new Error("Dados obrigatórios")
}

export async function criar(data: perfilAcessoForm) {
    validar(data)

    const persist = await Perfil_Acesso.create({ ...data, data_criacao: Date.now() })

    if (!persist) throw new Error("Erro na criação")

    return persist.id
}

export async function editar(data: any) {
    validarEdição(data)
    const resp = await getById(data.id)

    const update = await Perfil_Acesso.update({
        nome: data.nome,
        descricao: data.descricao,
        data_modificacao: Date.now(),
        usuario_modificacao: 1
    }, {
        where: { id: data.id }
    })

    if (!update) throw new Error("Erro na edição")

    return resp.id
}

export async function deletar(id: number) {
    await getById(id)

    const resp = await Perfil_Acesso.destroy({ where: { id: id } })

    if (!resp) throw new Error("Erro na deleção")

    return true
}

async function getById(id: number) {
    const item = await Perfil_Acesso.findByPk(id)

    if (!item) throw new Error("Não encontrado")

    return item
}

export async function getItem(id: number) {
    const item = await Perfil_Acesso.findByPk(id)

    if (!item) throw new Error("Não encontrado")

    return item
}

export async function getAllUsersByPerfil(id: number) {
    await getById(id)

    const list = await Usuario.findAll({
        where: {
            perfil_acesso_id: id
        }
    })

    return list
}

export async function getAll() {

    const list = await Perfil_Acesso.findAll()

    return list
}

export async function getallPermissions(id: number) {
    const list = await Perfil_Acesso_Item.findAll({ where: { perfil_acesso_id: id } })
    return list
}

export async function verificarPermissao(controller: string, acao: string, token: string) {

    try {
        
        let tkn

        if (typeof token == "undefined") {
            throw new Error("token invalido")
        }
        
        tkn = token.split(" ")[1]

        console.log(tkn)
        const decode = jwt.verify(tkn, process.env.ACCESS_KEY as string)
        if (typeof decode == "object" && "perfil" in decode) {
            const check = await Perfil_Acesso_Item.findAll({ where: { controller: controller, acao: acao.toUpperCase(), perfil_acesso_id: decode.perfil } })
          
            if (check.length == 0) {
          
                throw new Error("Ação não permitida com perfil atual")
            }

            return decode

        } else {
            throw new Error("Token carece de informação")
        }

    } catch (error: any) {
        throw new Error(error.message || "Token invalido")
    }

}