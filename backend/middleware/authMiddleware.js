import { createHmac } from 'crypto'
import {check} from 'express-validator'
import jwt from "jsonwebtoken";

// password encryption
export const encryptPassword = (req,_,next) => {
    const hmac = createHmac('sha512', req.body.userPassword)
    req.body.userPassword = hmac.digest('hex')
    next()
}

//e-mail validation
export const validateUserEmail = check('userEmail')
    .isEmail()
    .withMessage('Invalid email address')

//password -validation
export const validateUserPassword = check('userPassword')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:<,.>]).+$/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character')


//verify JWT
export const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies["token"]
    const userClaims = jwt.verify(token, process.env.JWT_SECRET)
    req.userClaims = userClaims
    next()

  } catch(error) {
    res.status(401).end()
  }
}