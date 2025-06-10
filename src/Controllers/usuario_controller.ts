import { verificarPermissao } from "../implementations/perfil_acesso_implementations";
import { criarUsuario, destroy, getallUsers, getById, update, getUserSelect, getUsersByFilter, createAdminUser } from "../implementations/usuario_implementations";

export async function createAsync (req : any, res : any) {
    try {
        await verificarPermissao("usuario", "criar", req.headers.authorization)
        const func = await criarUsuario(req.body)
        return res.status(200).json({success : true, dados : func})
    } catch (error : any) {
        return res.status(500).json({sucess : false, dados : error.message})
    }
}

export async function getAsync (req : any, res : any) {
    try {
        await verificarPermissao("usuario", "listar", req.headers.authorization)
        const func = await getById(req.params.id)
        return res.status(200).json({success : true, dados : func})
    } catch (error : any) {
        return res.status(500).json({success : false, dados : error.message})
    }
}

export async function getAllAsync (req : any, res : any) {
    try {
        // await verificarPermissao("usuario", "listar", req.headers.authorization)
        const func = await getallUsers()
        return res.status(200).json({success : true, dados : func})
    } catch (error : any) {
        return res.status(500).json({success : false, dados : error.message})
    }
}

export async function getPagination (req : any, res : any) {
    try {
        await verificarPermissao("usuario", "listar", req.headers.authorization)
        const func = await getUsersByFilter(req.body)
        return res.status(200).json({success : true, dados : func})
    } catch (error : any) {
        return res.status(500).json({sucess : false, dados : error.message})
    }
}


export async function getAllSelect (req : any, res : any) {
    try {
        // await verificarPermissao("usuario", "listar", req.headers.authorization)
        const func = await getUserSelect(req.body)
        return res.status(200).json({success : true, dados : func})
    } catch (error : any) {
        return res.status(500).json({success : false, dados : error.message})
    }
}

export async function updateAsync (req : any, res : any) {
    try {
        // await verificarPermissao("usuario", "editar", req.headers.authorization)
        const func = await update(req.body)
        return res.status(200).json({success : true, dados : func})
    } catch (error : any) {
        return res.status(500).json({success : false, dados : error.message})
    }
}

export async function destroyAsync (req : any, res : any) {
    try {
        await verificarPermissao("usuario", "deletar", req.headers.authorization)
        const func = await destroy(req.params.id)
        return res.status(200).json({success : true, dados : func})
    } catch (error : any) {
        return res.status(500).json({success : false, dados : error.message})
    }
}

export async function testAsync (req : any, res : any) {
    try {
        await createAdminUser()
        return res.status(200).json({success : true, dados : "Deu certo"})
    } catch (error : any) {
        return res.status(500).json({sucess : false, dados : error.message})
    }
}