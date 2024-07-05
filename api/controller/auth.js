import moment from 'moment-timezone'
import { genJwt } from '../services'

const {LOGIN_USERNAME, LOGIN_PASSWORD, JWT_EXPIRY_MINS} = process.env

export const verLoginAndGenToken = async(bodyData = {}) => {
    const { password, username } = bodyData
    
    if((LOGIN_USERNAME !== username) || (LOGIN_PASSWORD !== password)){
      const errObj = {
        statusCode: 401,
        message: 'Invalid User Credentials!'
      }
      return {
        status: false,
        ...errObj
      }
    }
    return {
        status: true,
        statusCode: 200,
        message: 'Login Success!',
        data: {
            redirectUrl: '/dashboard',
            token: genJwt({ timeStamp: moment().format('x') }), //generate random timeStamp token
            tokenExpTime: moment().add(parseInt(JWT_EXPIRY_MINS), 'minutes').format('YYYY-MM-DD HH:mm:ss')
        }
    }
}