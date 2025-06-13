import express from "express"
import {createAsync, destroyAsync, getAllAsync, getAsync, getPagination, updateAsync} from "../Controllers/consulta_controller"

const consultaroute = express.Router()

consultaroute.post("/", createAsync)
consultaroute.put("/", updateAsync)
consultaroute.get("/all", getAllAsync)
consultaroute.post("/pagination", getPagination)
consultaroute.get("/:id", getAsync)
consultaroute.delete("/:id", destroyAsync)

export default consultaroute