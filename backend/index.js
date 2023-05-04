import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import {cookieConfig} from './authorization/jwt.js'
import { createToken } from './authorization/jwt.js'
import {validationResult} from 'express-validator'
import userCompanyData from './schema/userCompaniesSchema.js'
import userApplicantData from './schema/userApplicantSchema.js'
import "./env-config.js"
import {validateUserEmail,validateUserPassword,encryptPassword} from './middleware/authMiddleware.js'

const PORT_SERVER = process.env.PORT_SERVER
const DB_CONNECTION = process.env.DB_CONNECTION

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(morgan("combined"))

app.use(cors(
    {
        origin: true,
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials:true
    }
))


//company registration
app.post('/api/v1/new-company',
    validateUserEmail,
    validateUserPassword,
    encryptPassword,
    async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const {userEmail,userPassword} = req.body
    try {
        const user = await userCompanyData.create({userEmail,userPassword})
        res.status(200).json(user)
    } catch (err) {
        res.status(501).json({message:err.message})
    }
})

//company login
app.post('/api/v1/company-login' , 
    encryptPassword,
    async (req,res) => {
    const {userEmail,userPassword} = req.body
    const user = await userCompanyData.findOne({userEmail,userPassword})
    if(user === null) res.status(401).json({message:"User not found"})
    else{
        const token = createToken(user)
        res.cookie('token',token,cookieConfig)
        res.end()
    }
})


//applicant registration
app.post('/api/v1/new-applicant',
    validateUserEmail,
    validateUserPassword,
    encryptPassword,
    async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    console.log(req.body)
    const {userEmail,userPassword} = req.body
    try {
        const user = await userApplicantData.create({userEmail,userPassword})
        res.status(200).json(user)
    } catch (err) {
        res.status(501).json({message:err.message})
    }
})









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








