import { criarUsuario, destroy, getById, update } from "../implementations/usuario_implementations";

export async function createAsync (req : any, res : any) {
    try {
        const func = await criarUsuario(req.body)
        return res.status(200).json({success : true, dados : func})
    } catch (error : any) {
        return res.status(500).json({sucess : false, dados : error.message})
    }
}

export async function getAsync (req : any, res : any) {
    try {
        const func = await getById(req.params.id)
        return res.status(200).json({success : true, dados : func})
    } catch (error : any) {
        return res.status(500).json({success : false, dados : error.message})
    }
}

export async function updateAsync (req : any, res : any) {
    try {
        const func = await update(req.body)
        return res.status(200).json({success : true, dados : func})
    } catch (error : any) {
        return res.status(500).json({success : false, dados : error.message})
    }
}

export async function destroyAsync (req : any, res : any) {
    try {
        const func = await destroy(req.params.id)
        return res.status(200).json({success : true, dados : func})
    } catch (error : any) {
        return res.status(500).json({success : false, dados : error.message})
    }
}

export async function testAsync (req : any, res : any) {
    try {
        return res.status(200).json({success : true, dados : "Deu certo"})
    } catch (error : any) {
        return res.status(500).json({sucess : false, dados : error.message})
    }
}