import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import mongoose from 'mongoose'
import './user-schema.js'
import "./env-config.js"

const PORT_SERVER = process.env.PORT_SERVER
const DB_CONNECTION = process.env.DB_CONNECTION

const app = express()

app.use(express.json())
app.use(morgan("combined"))

app.use(cors(
    {
        origin: '*',
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }
))












try {
    mongoose.connect(DB_CONNECTION)
    .then(() => {
    console.log("Connection to DB succesfull 👍")
    try {
        app.listen(PORT_SERVER, () => console.log("Server running on PORT"+ " " + PORT_SERVER + " 👍"))    
    } catch (err) { 
        console.log(err.message +" | "+ "Server not able to run on"+ " " + PORT_SERVER + "👎")
    }
})} catch (err) {
    console.log(err.message + "Not able to connect to DB")
}








