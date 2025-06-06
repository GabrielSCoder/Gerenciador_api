import jwt from "jsonwebtoken"
import { generateTokens } from "../implementations/auth_implementations"
import Sessao from "../db/models/sessao"


export async function authCheck(req: any, res: any, next: any) {

    const accessToken = req.headers.authorization as string
    const refreshToken = req.cookies.rfssid as string
    const hmac = req.headers.hmac as string

    // if (!refreshToken || !hmac || !accessToken || accessToken && !accessToken.includes("Bearer") || !refreshToken) {
    //     return res.status(401).json({ success: false, message: "requisição inválida (cabeçalho incompleto)" })
    // }

    // if (process.env.HMAC as string != hmac) {
    //     return res.status(401).json({ success: false, message: "requisição inválida (hmac não confere)" })
    // }

    if (!accessToken) {
        return res.status(401).json({ success: false, message: "requisição inválida (cabeçalho incompleto)" })
    }

    let token 

    if (accessToken.split(' ')[1]) {
        token = accessToken.split(' ')[1]
    } else {
        return res.status(500).json({ success: false, message: "Formato de token inválido" })
    }

    try {
        const decode = jwt.verify(token, process.env.ACCESS_KEY as string)

        if (decode)
            next()

    } catch (error: any) {

        try {

            const decode = jwt.verify(refreshToken, process.env.REFRESH_KEY as string)

            if (typeof decode == "object" && "id" in decode) {
                const findSession = await Sessao.findOne({ where: { usuario_id: decode.id } })
                if (findSession && findSession.hmac == hmac || findSession && refreshToken == findSession.token) {
                    const { accessToken } = generateTokens(decode.id, decode.perfil)
                    return res.status(202).json({ success: false, token: accessToken })
                } else if (!findSession) {
                    return res.status(401).json({ success: false, message: "Sessão não encontrada" })
                } else if (findSession.hmac != hmac || findSession && refreshToken != findSession.token) {
                    await Sessao.destroy({ where: { usuario_id: decode.id } })
                    return res.status(401).json({ success: false, message: "Sessão excluida (dados divergentes)" })
                }
            } else {
                return res.status(401).json({ success: false, message: "Token expirado, refaça login" })
            }

        } catch (error: any) {
            try {
                await Sessao.update({data_extincao : Date.now()}, { where: { token: refreshToken } })
                return res.status(401).json({ success: false, message: "Sessão expirada, refaça login" })
            } catch (error : any) {
                return res.status(401).json({ success: false, message: error.message })
            }

        }
    }
}