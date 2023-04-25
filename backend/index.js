import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import mongoose from 'mongoose'
import {userCompanyData, userApplicantData} from './schema/userCompaniesSchema.js'
import "./env-config.js"
import {validateUserEmail,validateUserPassword,encryptPassword} from './middleware/authMiddleware.js'
import {validationResult} from 'express-validator'

const PORT_SERVER = process.env.PORT_SERVER
const DB_CONNECTION = process.env.DB_CONNECTION

const app = express()

app.use(express.json())
app.use(morgan("combined"))

app.use(cors(
    {
        origin: '*',
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials:true
    }
))



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



app.post('/api/v1/new-applicant',
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








