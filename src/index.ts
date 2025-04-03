import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import mainRoute from "./routes/main_route"


const app = express()
app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.use(mainRoute)

app.listen(3003, () => console.log("escutando na porta 3003"))


