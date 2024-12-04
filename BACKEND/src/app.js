import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import routes from "./routes/index.routes.js"

const app = express()
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// Routes
app.use('/api', routes);


// http://localhost:8000/api/users/register

export { app }