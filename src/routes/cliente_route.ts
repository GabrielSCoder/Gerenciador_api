import express from "express"
import { createAsync, getAsync, getPagination, getAllSelect, getAllAsync, updateAsync, deleteAsync } from "../Controllers/cliente_controller"
import { authCheck } from "../middlewares/authMiddleware"

const clienteRoute = express.Router()

clienteRoute.post("/", createAsync)
clienteRoute.get("/all", getAllAsync)
clienteRoute.get("/select", getAllSelect)
clienteRoute.get("/:id", getAsync)
clienteRoute.put("/", updateAsync)
clienteRoute.post("/pagination", authCheck, getPagination)
clienteRoute.delete("/:id", deleteAsync)

export default clienteRoute