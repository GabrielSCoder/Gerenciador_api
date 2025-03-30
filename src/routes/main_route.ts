import authRoute from "./auth_route";
import usuarioRoute from "./usuario_route";
import sessaoRoute from "./sessao_route";
import express from "express"

const mainRoute = express.Router()

mainRoute.use("/auth", authRoute)
mainRoute.use("/usuario", usuarioRoute)
mainRoute.use("/sessao", sessaoRoute)

export default mainRoute