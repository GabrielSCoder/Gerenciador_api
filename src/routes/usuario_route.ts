import express from "express"
import { createAsync, destroyAsync, getAsync, updateAsync, testAsync, getAllAsync } from "../Controllers/usuario_controller"
import { authCheck } from "../middlewares/authMiddleware"

const usuarioRoute = express.Router()

usuarioRoute.get("/meet", authCheck, testAsync)
usuarioRoute.post("/", createAsync)
usuarioRoute.get("/all", getAllAsync)
usuarioRoute.get("/:id", getAsync)
usuarioRoute.put("/", updateAsync)
usuarioRoute.delete("/:id", destroyAsync)

export default usuarioRoute