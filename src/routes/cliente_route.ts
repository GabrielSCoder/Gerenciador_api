import express from "express"
import { createAsync, getAsync, getPagination } from "../Controllers/cliente_controller"

const clienteRoute = express.Router()

clienteRoute.post("/", createAsync)
clienteRoute.get("/:id", getAsync)
clienteRoute.post("/pagination", getPagination)

export default clienteRoute