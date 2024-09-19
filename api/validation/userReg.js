import Joi from 'joi'
import { logger } from '../services'

export const validateUserRegReq = (req, res, next) => {
    const ScraperSchema = Joi.object({
        name: Joi.string().trim().required().messages({
            'string.empty': 'Full name is required',
            'any.required': 'Full name is required',
        }),
        email: Joi.string().trim().email().required().messages({
            'string.empty': 'Email is required',
            'string.email': 'Please enter a valid email address',
            'any.required': 'Email is required',
        }),
        password: Joi.string().trim().required().messages({
            'string.empty': 'Password is required',
            'any.required': 'Password is required',
        }),
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
        logger.error(`Validation Error USERREG API!: ${errObj}`)
        return res.status(422).json(errObj)
      }
      next()
}