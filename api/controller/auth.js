import moment from 'moment-timezone'
import bcrypt from 'bcryptjs'
import { genJwt } from '../services'
import { findOneUsrByParams } from '../queries'

const {LOGIN_USERNAME, LOGIN_PASSWORD, JWT_EXPIRY_MINS} = process.env

export const verLoginAndGenToken = async(bodyData = {}) => {
    const { password, username } = bodyData
    const successObj = {
      status: true,
      statusCode: 200,
      message: 'Login Success!',
      data: {
          redirectUrl: '/dashboard',
          token: genJwt({ timeStamp: moment().format('x') }), //generate random timeStamp token
          tokenExpTime: moment().add(parseInt(JWT_EXPIRY_MINS), 'minutes').format('YYYY-MM-DD HH:mm:ss')
      }
  }
    //check LOGIN_USERNAME & LOGIN_PASSWORD from ENV first
    if((LOGIN_USERNAME === username) && (LOGIN_PASSWORD === password)){
      return successObj
    }
    const errObj = {
      status: false,
      statusCode: 401,
      message: 'Invalid User Credentials!'
    }
    const userData = await findOneUsrByParams({ email: username })
    if(!userData){
      return errObj
    }
    const isMatch = await bcrypt.compare(password, userData.password); 
    if (!isMatch) {
      return errObj
    }
    return successObj
}