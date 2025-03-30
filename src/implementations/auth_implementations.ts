import Sessao from "../db/models/sessao";
import Usuario from "../db/models/usuario";
import { loginForm } from "../types/auth";
import jwt from "jsonwebtoken"

export async function login(data: loginForm, res: any) {
    if (!data.email || !data.senha || typeof data.email != "string" || typeof data.senha != "string") {
        throw new Error("Dados obrigatorios")
    }

    const usuario = await Usuario.findOne({ where: { email: data.email } })

    if (!usuario) throw new Error("Email não encontrado")

    if (usuario && usuario.check(data.senha)) {

        const { accessToken, refreshToken } = generateTokens(usuario.id)

        res.cookie("rfssid", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        const createSessao = await Sessao.create({ usuario_id: usuario.id, hmac: process.env.HMAC, data_criacao: Date.now(), token: refreshToken })

        if (!createSessao) throw new Error("Erro na criação de sessão")

        return accessToken
    } else {
        throw new Error("Email e/ou senha incorretas")
    }
}

export async function logout(req: any, data: loginForm, res: any) {

    const refreshToken = req.cookies.rfssid

    if (!data.email || !data.senha || typeof data.email != "string" || typeof data.senha != "string" || !refreshToken) {
        throw new Error("Dados obrigatorios")
    }

    const usuario = await Usuario.findOne({ where: { email: data.email } })

    if (!usuario) throw new Error("Email não encontrado")

    const sessao = await Sessao.destroy({ where: { usuario_id: usuario.id, token: refreshToken as string } })

    if (!sessao) throw new Error("Sessão não encontrada")

    res.cookie("rfssid", "", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
        maxAge: -1,
        expires: -1
    });

    return usuario.id
}

export function generateTokens(userId: number) {
    console.log("-----------", userId)
    const accessToken = jwt.sign({ id: userId }, process.env.ACCESS_KEY as string, { expiresIn: "15s" })
    const refreshToken = jwt.sign({ id: userId, criado: Date.now() }, process.env.REFRESH_KEY as string, { expiresIn: "2min" })

    return { accessToken, refreshToken }
}

