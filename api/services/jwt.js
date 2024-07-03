import jwt from 'jsonwebtoken'

const { JWT_SECRET, JWT_EXPIRY_MINS } = process.env
export const genJwt = (payload) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRY_MINS }); 
}

export const verifyJwt = (token) => {
    return jwt.verify(token, JWT_SECRET);
}