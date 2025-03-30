import express from "express"
import { getAsync, createAsync, destroySession, getAllAsync } from "../Controllers/sessao_controller"

const sessaoRoute = express.Router()

sessaoRoute.get("/lista", getAllAsync)
sessaoRoute.get("/:id", getAsync)
sessaoRoute.post("/", createAsync)
sessaoRoute.delete("/:id", destroySession)

export default sessaoRoute