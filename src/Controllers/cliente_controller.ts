import { criarCliente, destroy, getallClients, getById, update, getClientsByFilter } from "../implementations/cliente_implementations"
import { verificarPermissao } from "../implementations/perfil_acesso_implementations"

export async function createAsync (req : any, res : any) {
    try {
        const token = await verificarPermissao("cliente", "criar", req.headers.authorization)
        const func = await criarCliente(req.body, token.id)
        return res.status(200).json({success : true, dados : func})
    } catch (error : any) {
        return res.status(500).json({sucess : false, dados : error.message})
    }
}

export async function updateAsync (req : any, res : any) {
    try {
        const token = await verificarPermissao("cliente", "criar", req.headers.authorization)
        const func = await update(req.body, token.id)
        return res.status(200).json({success : true, dados : func})
    } catch (error : any) {
        return res.status(500).json({sucess : false, dados : error.message})
    }
}

export async function getPagination (req : any, res : any) {
    try {
        // const token = await verificarPermissao("cliente", "criar", req.headers.authorization)
        const func = await getClientsByFilter(req.body)
        return res.status(200).json({success : true, dados : func})
    } catch (error : any) {
        return res.status(500).json({sucess : false, dados : error.message})
    }
}

export async function getAsync (req : any, res : any) {
    try {
        await verificarPermissao("cliente", "listar", req.headers.authorization)
        const func = await getById(req.params.id)
        return res.status(200).json({success : true, dados : func})
    } catch (error : any) {
        return res.status(500).json({success : false, dados : error.message})
    }
}

export async function getAllAsync (req : any, res : any) {
    try {
        await verificarPermissao("cliente", "listar", req.headers.authorization)
        const func = await getallClients()
        return res.status(200).json({success : true, dados : func})
    } catch (error : any) {
        return res.status(500).json({success : false, dados : error.message})
    }
}


export async function deleteAsync (req : any, res : any) {
    try {
        await verificarPermissao("cliente", "listar", req.headers.authorization)
        const func = await destroy(req.params.id)
        return res.status(200).json({success : true, dados : func})
    } catch (error : any) {
        return res.status(500).json({success : false, dados : error.message})
    }
}
