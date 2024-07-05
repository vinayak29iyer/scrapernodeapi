import Joi from 'joi'
import { verifyJwt } from '../services'
import { logger } from '../services'
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

export const validateScraperReq = (req, res, next) => {
    const ScraperSchema = Joi.object({
        url: Joi.string().uri().messages({
            'string.uri': 'Invalid URL'
        })
      });
      const { error } = ScraperSchema.validate(req.body, { abortEarly: false });
      let errObj
      if (error) {
        // Create a custom response for validation errors
        const errorMessages = error.details.map((item)=>{ return { key: item.path[0], message: item.message } })
        errObj = {
          status: false,
          statusCode: 422,
          message: 'Validation Error!',
          errors: errorMessages 
        }
        logger.error(`Validation Error Scraper API!: ${errObj}`)
        return res.status(422).json(errObj)
      }
      next()
}