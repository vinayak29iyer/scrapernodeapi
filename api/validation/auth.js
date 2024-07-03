import Joi from 'joi'
import { logger } from '../services'


export const validateAuth = async(req, res, next) => {
    const LoginSchema = Joi.object({
        username: Joi.string().min(3).max(10).required().messages({
          'any.required': `username is a required field and cannot be empty`,
          'string.base': `"username should be a type of 'text'`,
          'string.empty': `username cannot be an empty field`,
          'string.min': `username should have a minimum length of {#limit}`,
          'string.max': `username exceeds maximum length of {#limit}`,
        }),
        password: Joi.string().min(3).max(13).required().messages({
          'any.required': `password is a required field and cannot be empty`,
          'string.base': `password should be a type of 'text'`,
          'string.empty': `password cannot be an empty field`,
          'string.min': `password should have a minimum length of {#limit}`,
          'string.max': `password exceeds maximum length of {#limit}`,
        })
      });
      const { error } = LoginSchema.validate(req.body, { abortEarly: false });
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
        logger.error(`Validation Error!: ${errObj}`)
        return res.status(422).json(errObj)
      }
      next()
}