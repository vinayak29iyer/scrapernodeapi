import moment from 'moment-timezone'
import { genJwt } from '../services'

const {LOGIN_USERNAME, LOGIN_PASSWORD, REACT_APP_LOGIN_EXPIRY_MINUTES} = process.env

export const verLoginAndGenToken = async(bodyData = {}) => {
    console.log('Login Called!')
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
            tokenExpTime: moment().add(parseInt(REACT_APP_LOGIN_EXPIRY_MINUTES), 'minutes').format('YYYY-MM-DD HH:mm:ss')
        }
    }
}