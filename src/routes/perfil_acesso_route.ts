import express from "express"
import { createAsync, deleteAsync, getAsync, getAsyncAll, updateAsync, getPermissionsAsync, createADM } from "../Controllers/perfil_acesso_controller"

const perfil_acessoRoute = express.Router()

perfil_acessoRoute.get("/all", getAsyncAll)
perfil_acessoRoute.get("/adm", createADM)
perfil_acessoRoute.get("/permissions/:id", getPermissionsAsync)
perfil_acessoRoute.put("/", updateAsync)
perfil_acessoRoute.get("/:id", getAsync)
perfil_acessoRoute.post("/", createAsync)
perfil_acessoRoute.delete("/:id", deleteAsync)

export default perfil_acessoRoute