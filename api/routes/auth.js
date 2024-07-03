import express from 'express'
import { verLoginAndGenToken } from '../controller/index'
import { validateAuth } from '../validation/auth'
import { logger } from '../services'


const AuthRouter = express.Router()

  //Login Auth
  AuthRouter.post(
    `/login`, validateAuth, async (req, res, next) => {
      try{

       const loginRes = await verLoginAndGenToken(req.body)

       return res.status(loginRes.statusCode).json(loginRes)

      }catch(error){
        console.log('Err fetch-metadata> ', error)
        const errObj = {
          statusCode: 400,
          status: false,
          data: '',
          message: error.message || 'Oops Something Went Wrong, Please Try Again Later!'
         }
        logger.error(`Fetch-metaData Error: ${errObj}`)
        return res.status(400).json(errObj)
      }
  })

  export default AuthRouter