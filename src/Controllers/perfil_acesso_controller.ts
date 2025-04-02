import { criar, getItem, deletar, editar, getAll, getallPermissions } from "../implementations/perfil_acesso_implementations"

export async function createAsync (req : any, res : any) {
    try {
        const func = await criar(req.body)
        return res.status(200).json({success : true, dados : func})
    } catch (error : any) {
        return res.status(500).json({sucess : false, dados : error.message})
    }
}

export async function updateAsync (req : any, res : any) {
    try {
        const func = await editar(req.body)
        return res.status(200).json({success : true, dados : func})
    } catch (error : any) {
        return res.status(500).json({sucess : false, dados : error.message})
    }
}

export async function getAsync (req : any, res : any) {
    try {
        const func = await getItem(req.params.id)
        return res.status(200).json({success : true, dados : func})
    } catch (error : any) {
        return res.status(500).json({sucess : false, dados : error.message})
    }
}

export async function getAsyncAll (req : any, res : any) {
    try {
        const func = await getAll()
        return res.status(200).json({success : true, dados : func})
    } catch (error : any) {
        return res.status(500).json({sucess : false, dados : error.message})
    }
}


export async function getPermissionsAsync (req : any, res : any) {
    try {
        const func = await getallPermissions(req.params.id)
        return res.status(200).json({success : true, dados : func})
    } catch (error : any) {
        return res.status(500).json({sucess : false, dados : error.message})
    }
}

export async function deleteAsync (req : any, res : any) {
    try {
        const func = await deletar(req.body)
        return res.status(200).json({success : true, dados : func})
    } catch (error : any) {
        return res.status(500).json({sucess : false, dados : error.message})
    }
}