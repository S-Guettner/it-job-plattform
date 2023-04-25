import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import mongoose from 'mongoose'
import userData from './schema/user-schema.js'
import "./env-config.js"
import {encryptPassword} from './middleware/authMiddleware.js'
import {check, validationResult} from 'express-validator'

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



app.post('/api/v1/new-user',
    //checking if email from req is valid , if not res with "Invalid email address"
    check('userEmail')
    .isEmail()
    .withMessage('Invalid email address'),
    //checking if password from req is long enough , if not res with "Password must be at least 8 characters long"
    //checking if password is strong enough , if not res with err message
    check('userPassword')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:<,.>]).+$/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
    //if input is valid encryptPassword
    encryptPassword,
    async (req,res) => {
    //errors from validation
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
    }
    const {userEmail,userPassword} = req.body
    try {
        const user = await userData.create({userEmail,userPassword})
        res.status(200).json(user)
    } catch (err) {
        res.status(501).json({message:err.message})
    }
} )








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








