import express from "express"
import { authAsync, logoutAsync } from "../Controllers/auth_controller"

const authRoute = express.Router()

authRoute.post("/login", authAsync)
authRoute.post("/logout", logoutAsync)

export default authRoute