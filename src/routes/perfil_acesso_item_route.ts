import express from "express"
import { createAsync, deleteAsync, getAsyncAll, updateAsync } from "../Controllers/perfil_acesso_item_controller"

const perfil_acesso_itemRoute = express.Router()

perfil_acesso_itemRoute.get("/all", getAsyncAll)
perfil_acesso_itemRoute.put("/", updateAsync)
perfil_acesso_itemRoute.post("/", createAsync)
perfil_acesso_itemRoute.delete("/:id", deleteAsync)

export default perfil_acesso_itemRoute