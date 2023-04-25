import { createHmac } from 'crypto'


export const encryptPassword = (req,_,next) => {
    const hmac = createHmac('sha512', req.body.userPassword)
    req.body.userPassword = hmac.digest('hex')
    next()
}