import express from "express"
import { createAsync, getAsync, getPagination, getAllSelect, getAllAsync } from "../Controllers/cliente_controller"

const clienteRoute = express.Router()

clienteRoute.post("/", createAsync)
clienteRoute.get("/all", getAllAsync)
clienteRoute.get("/select", getAllSelect)
clienteRoute.get("/:id", getAsync)
clienteRoute.post("/pagination", getPagination)

export default clienteRoute