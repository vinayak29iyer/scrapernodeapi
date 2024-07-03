require('dotenv').config()
/**
 * @desc List of ALL REQUIRED ENVS HERE, if anything is missing then Error will be thrown
 */
const applicationEnvVars = ['PORT','ENV','APP_VERSION','BASE_ROUTE_API','BASE_ROUTE_HTML', 'MONGO_CONNECTION_URI', 'MONGO_DBNAME','MONGO_HOSTS','MONGO_PORT','S3BUCKET', 'AWS_DEFAULT_REGION','LOGIN_USERNAME','LOGIN_PASSWORD','APP_RATE_LIMIT_GET','APP_RATE_LIMIT_POST', 'JWT_SECRET', 'JWT_EXPIRY_MINS']

let unusedEnvVars = applicationEnvVars.filter((i) => !process.env[i])

if (unusedEnvVars.length) throw new Error('\nRequired ENV variables are not set: [' + unusedEnvVars.join(', ') + ']\n')

const { app } = require('./app.js')

app.listen(process.env.PORT, (err)=>{
    if(err){ 
        console.log('ERROR IN LISTENTING TO PORT> ', err)
        throw err
    }
    console.log('PORT WORKING ',process.env.PORT)
})

export default app