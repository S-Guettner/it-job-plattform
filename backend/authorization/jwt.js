import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

export const createToken = (user) => {
    const token = jwt.sign({ user: user._id }, JWT_SECRET, { expiresIn: '30min' })
    return token
}