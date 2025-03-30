import { login, logout } from "../implementations/auth_implementations"

export async function authAsync (req : any, res : any) {
    try {
        const func = await login(req.body, res)
        return res.status(200).json({success : true, dados : func})
    } catch (error : any) {
        return res.status(500).json({sucess : false, dados : error.message})
    }
}

export async function logoutAsync (req : any, res : any) {
    try {
        const func = await logout(req, req.body, res)
        return res.status(200).json({success : true, dados : func})
    } catch (error : any) {
        return res.status(500).json({sucess : false, dados : error.message})
    }
}

