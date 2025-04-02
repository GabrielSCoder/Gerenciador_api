import authRoute from "./auth_route";
import usuarioRoute from "./usuario_route";
import sessaoRoute from "./sessao_route";
import express from "express"
import perfil_acessoRoute from "./perfil_acesso_route";
import perfil_acesso_itemRoute from "./perfil_acesso_item_route";

const mainRoute = express.Router()

mainRoute.use("/auth", authRoute)
mainRoute.use("/usuario", usuarioRoute)
mainRoute.use("/sessao", sessaoRoute)
mainRoute.use("/perfil_acesso", perfil_acessoRoute)
mainRoute.use("/perfil_acesso_item", perfil_acesso_itemRoute)

export default mainRoute