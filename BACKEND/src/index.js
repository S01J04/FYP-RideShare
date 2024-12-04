// require('dotenv').config({path: './env'})
import dotenv from "dotenv"
dotenv.config({
    path: './.env'
})
import connectDB from "./db/index.js";
import {app} from './app.js'
import http from "http"
import  {setupSocketHandlers}  from "./utils/socket.js";

const server = http.createServer(app);

setupSocketHandlers (server);

connectDB()
.then(() => {
    server.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})

