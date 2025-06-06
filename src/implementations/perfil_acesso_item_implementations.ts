import Perfil_Acesso from "../db/models/perfil_acesso";
import Perfil_Acesso_Item from "../db/models/perfil_acesso_item";
import { perfilAcessoItemForm } from "../types/perfil_acesso";
import { permissoes } from "../utils/permissoes";


async function validar(data: perfilAcessoItemForm) {
    if (!data.controller || !data.acao || !data.perfil_acesso_id)
        throw new Error("Dados obrigatórios")

    const check = await Perfil_Acesso.findByPk(data.perfil_acesso_id)

    if (!check) throw new Error("Perfil não encontrado")
}

async function validarEdição(data: perfilAcessoItemForm & { id: number }) {
    if (!data.controller || !data.acao || !data.perfil_acesso_id)
        throw new Error("Dados obrigatórios")

    const check = await Perfil_Acesso.findByPk(data.perfil_acesso_id)

    if (!check) throw new Error("Perfil não encontrado")
}


export async function criar(data: perfilAcessoItemForm) {
    await validar(data)

    const persist = await Perfil_Acesso_Item.create({ ...data, data_criacao: Date.now() })

    if (!persist) throw new Error("Erro na criação")

    return persist.id
}

export async function editar(data: any) {
    await validarEdição(data)
    const resp = await getById(data.id)

    const update = await Perfil_Acesso_Item.update({
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

    const resp = await Perfil_Acesso_Item.destroy({ where: { id: id } })

    if (!resp) throw new Error("Erro na deleção")

    return true
}

async function getById(id: number) {
    const item = await Perfil_Acesso_Item.findByPk(id)

    if (!item) throw new Error("Não encontrado")

    return item
}

export async function getItem(id : number) {
    const item = await Perfil_Acesso_Item.findByPk(id)

    if (!item) throw new Error("Não encontrado")

    return item
}

export async function getAll () {

    const list = await Perfil_Acesso_Item.findAll()

    return list
}

export async function criarPermissoesParaAdmin() {

    const perfilAcessoId = 1

    const promises = permissoes.controllers.flatMap(controller =>
        permissoes.permissoes.map(acao =>
            criar({ controller, acao, perfil_acesso_id: perfilAcessoId })
                .then(() => console.log(`Criado: ${controller} - ${acao}`))
                .catch(err => console.error(`Erro: ${controller} - ${acao}`, err))
        )
    )

    await Promise.all(promises)

    return true
}