import express from "express"
import { createAsync, destroyAsync, getAsync, updateAsync, testAsync, getAllAsync, getAllSelect, getPagination } from "../Controllers/usuario_controller"
import { authCheck } from "../middlewares/authMiddleware"

const usuarioRoute = express.Router()

usuarioRoute.get("/meet", testAsync)
usuarioRoute.post("/", authCheck, createAsync)
usuarioRoute.get("/pagination", getPagination)
usuarioRoute.get("/all", getAllAsync)
usuarioRoute.get("/select", getAllSelect)
usuarioRoute.get("/:id", authCheck, getAsync)
usuarioRoute.put("/", updateAsync)
usuarioRoute.delete("/:id", destroyAsync)

export default usuarioRoute