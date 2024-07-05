/**
 *  Description - Initialise all routes with base path and global error handler
 */
import debug from 'debug'
import WebsiteScraperRouter from './websitescraper'
import AuthRouter from './auth'
import { ResponseBody } from '../lib/index' 

import { logger } from '../services'


const log = debug('app')

const { BASE_ROUTE_API, LOGIN_USERNAME,LOGIN_PASSWORD } = process.env
let Routes = [
  {
    path: `${BASE_ROUTE_API}/websitescraper`,
    router: WebsiteScraperRouter
  },{
    path: `${BASE_ROUTE_API}/auth`,
    router: AuthRouter
  }
]

Routes.init = (app) => {
  if (!app || !app.use) {
    log('[Error] Route Initialization Failed: app / app.use is undefined')
    return process.exit(1)
  }
  // Version Check API
  app.get('/version', (request, response, next) => {
    return response.json({
      message: 'OK',
      data: { version: process.env.APP_VERSION }
    })
  })


  // Health Check API
  app.get('/health-check', (request, response, next) => {
    return response.json({ message: 'OK' })
  })

  app.get(`/logout`,async (req, res, next) => {
    console.log('****LOGOUTCALLED***')
    try{
      req.session.destroy()
      
    }catch(error){
      console.log('ERR in req.session.destroy()> ',error)
      logger.error(`LOGOUT ERROR: ${error.message}`)
    }
    return res.status(200).json({
      status: true,
      message: 'Logout Success!'
    })
  })
  
  Routes.forEach((route) => app.use(`${route.path}`, route.router))
  app.use('*', (request, response, next) => {
    const errMsg = ['Cannot', request.method, request.originalUrl].join(' ')
    const error = new ResponseBody(404, errMsg)
    return response.status(404).send(error)
  })

  app.use((error, request, response, next) => {
    if (!error) {
      return
    }
    log(error)
    // logger.error(error)

    return response.status(response.statusCode).send(error)
  })
}

export { Routes }
