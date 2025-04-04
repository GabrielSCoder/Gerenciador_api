import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import mainRoute from "./routes/main_route"
import { corsConfig } from "./utils/serverConfig"


const app = express()
app.use(cors({...corsConfig}))
app.use(cookieParser())
app.use(express.json())

app.use(mainRoute)

app.listen(3003, () => console.log("escutando na porta 3003"))


