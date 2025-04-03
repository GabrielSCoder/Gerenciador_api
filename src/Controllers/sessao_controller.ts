import { verificarPermissao } from "../implementations/perfil_acesso_implementations"
import { checarSessao, criarSessao, extiguirSessao, listarSessoes } from "../implementations/sessao_implementations"

export async function createAsync(req: any, res: any) {
    try {
        await verificarPermissao("sessao", "criar", req.headers.authorization)
        const func = await criarSessao(req.body)
        return res.status(200).json({ success: true, dados: func })
    } catch (error: any) {
        return res.status(500).json({ sucess: false, dados: error.message })
    }
}

export async function getAsync(req: any, res: any) {
    try {
        await verificarPermissao("sessao", "listar", req.headers.authorization)
        const func = await checarSessao(req.params.id)
        return res.status(200).json({ success: true, dados: func })
    } catch (error: any) {
        return res.status(500).json({ success: false, dados: error.message })
    }
}

export async function getAllAsync(req: any, res: any) {
    try {
        const func = await listarSessoes()
        return res.status(200).json({ success: true, dados: func })
    } catch (error: any) {
        return res.status(500).json({ success: false, dados: error.message })
    }
}

export async function destroySession(req: any, res: any) {
    try {
        const func = await extiguirSessao(req.params.id)
        return res.status(200).json({ success: true, dados: func })
    } catch (error: any) {
        return res.status(500).json({ success: false, dados: error.message })
    }
}