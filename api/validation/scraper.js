import { verifyJwt } from '../services'
export const protectedScraperRoute = async(req, res, next) => {
    const token =  req.header('Authorization') ? req.header('Authorization').replace('Bearer ', ''): ''
    if (!token) {
        return res.status(401).json({
             status: false,
             statusCode: 401,
             message: 'Access token is missing or invalid' 
        });
    }
    try {
        verifyJwt(token)
    } catch (error) {
        console.log('TOKEN ERROR>> ',error)
        return res.status(401).json({
            status: false,
            statusCode: 401,
            message: 'Invalid token' 
        });
    }
    next();
}