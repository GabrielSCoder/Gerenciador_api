import Usuario from "../db/models/usuario";
import { usuarioFormulario, usuarioFormularioResponse } from "../types/usuario";

async function validar (data : usuarioFormulario) {
    if (!data.email || !data.nome || !data.senha ) 
        throw new Error("Dados obrigatórios")
}

async function validarUpdate (data : usuarioFormularioResponse) {
    console.log(data)
    if (!data.id || !data.email || !data.nome || !data.senha ) 
        throw new Error("Dados obrigatórios")
}


async function convert (data : any) {

    const usuario = {
        id : data.id,
        nome : data.nome,
        email : data.email,
        data_criacao : data.data_criacao
    }

    return usuario
}

export async function criarUsuario (data : usuarioFormulario) {
    await validar(data)

    const response = await Usuario.create({...data, data_criacao : Date.now()})

    if (!response) throw new Error("Erro na criação")

    return response.id
}

export async function getById (id : number) {
    const response = await Usuario.findByPk(id)

    if (!response) throw new Error("Não encontrado")

    return await convert(response)
}

async function getItem (id : number) {
    const response = await Usuario.findByPk(id)

    if (!response) throw new Error("Não encontrado")

    return response
}

export async function update (data : usuarioFormularioResponse) {

    await validarUpdate(data)

    const update = await Usuario.update({
        ...data,
        data_modificacao : Date.now()
    }, {
        where : {id : data.id}
    })

    if (!update) throw new Error("Erro na atualização")

    return update
}

export async function destroy (id : number) {
    const response = await getItem(id)

    const del = Usuario.destroy({where : {id : response.id}})

    if (!del) throw new Error("Erro na deleção")

    return response.id
}

