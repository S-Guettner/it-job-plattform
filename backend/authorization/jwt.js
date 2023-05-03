import jwt from 'jsonwebtoken'
import '../env-config.js'

const JWT_SECRET = process.env.JWT_SECRET

export const cookieConfig = {
    httpOnly: true,
    secure: true,
    sameSite: 'none'
}

export const createToken = (user) => {
    const token = jwt.sign({ user: user._id }, JWT_SECRET, { expiresIn: '30min' })
    return token
}