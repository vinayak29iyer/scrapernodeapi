import express from 'express'
import { findAllUserAggData, saveUserRegData } from '../controller/index'
import { protectedAuthRoute, validateUserRegReq } from '../validation/index'
import { logger } from '../services'


const UsersRouter = express.Router()

  //Fetch metadata
  UsersRouter.post(
    `/register`, protectedAuthRoute, validateUserRegReq, async (req, res, next) => {
      try{
       const {name = '', email = '', password = '' } = req.body || {}
       const resData = await saveUserRegData({
        name, email, password
       })
       return res.status(200).json({
        statusCode: 200,
        status: true,
        data: resData,
        message: 'success'
       })
      }catch(error){
        console.log('Err USERREG> ', error)
        const errObj = {
          statusCode: 400,
          status: false,
          data: '',
          message: error.message || 'Oops Something Went Wrong, Please Try Again Later!'
         }
         if(errObj.message.toString().includes('duplicate')){
          errObj.message = 'Email already exists!'
          errObj.emailDuplicateFound = true
         }
        logger.error(`USERREG Error: ${errObj}`)
        return res.status(400).json(errObj)
      }
  })


  UsersRouter.get(
    `/fetch-users`, protectedAuthRoute, async (req, res, next) => {
      try{
        const { page = 1, limit = 10 } = req.query;
        const { totalCount, data: usersData } = await findAllUserAggData({
        page, limit
       })
       return res.status(200).json({
        statusCode: 200,
        status: true,
        data: {
          users: usersData,
          totalPages: Math.ceil(totalCount / limit),
          currentPage: page
        },
        message: 'success'
       })
      }catch(error){
        console.log('Err fetch-users> ', error)
        const errObj = {
          statusCode: 400,
          status: false,
          data: '',
          message: error.message || 'Oops Something Went Wrong, Please Try Again Later!'
         }
        logger.error(`fetch-users Error: ${errObj}`)
        return res.status(400).json(errObj)
      }
  })

  export default UsersRouter