import express from 'express'
import expressSanitized from 'express-sanitize-escape'
import expressip from 'express-ip'
import cors from 'cors'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import { Routes } from './api/routes'
import moment from 'moment-timezone'
import rateLimit from 'express-rate-limit'
import MongoStoreRateLimit from 'rate-limit-mongo'
import { connectMongo, connectionuri } from './api/config/index'
import path from 'path'
import fileUpload from 'express-fileupload'
import { logger } from './api/services'

const { APP_RATE_LIMIT_GET, APP_RATE_LIMIT_POST } = process.env

const GET_RATE_LIMITER = rateLimit({
  store: new MongoStoreRateLimit({
    uri: connectionuri,
    collectionName: 'rateLimits',
    expireTimeMs: 60 * 1000, // 1 minute
  }),
  windowMs: 60 * 1000, // 1 minute
  max: Number(APP_RATE_LIMIT_GET), // Limit each IP to 2 requests per minute
  keyGenerator: function (req) {
    return req.ip; // Use IP address as the key
  },
  handler: function (req, res, next) {
    logger.error(`Rate limit exceeded for IP: ${req.ip}`);

    // 3. Send a custom response
    return res.status(429).json({
      error: 'Too many requests. Please try again later.',
    });
  },
  // message: 'Too many requests, please try again later.',
  standardHeaders: true, 
  legacyHeaders: false,
})

const POST_RATE_LIMITER = rateLimit({
  store: new MongoStoreRateLimit({
    uri: connectionuri,
    collectionName: 'rateLimits',
    expireTimeMs: 60 * 1000, // 1 minute
  }),
  windowMs: 60 * 1000, // 1 minute
  max: Number(APP_RATE_LIMIT_POST), // Limit each IP to 5 requests per minute
  keyGenerator: function (req) {
    return req.ip; // Use IP address as the key
  },
  handler: function (req, res, next) {
    logger.error(`Rate limit exceeded for IP: ${req.ip}`);

    // 3. Send a custom response
    return res.status(429).json({
      error: 'Too many requests. Please try again later.'
    });
  },
  // message: 'Too many requests, please try again later.',
  standardHeaders: true, 
  legacyHeaders: false,
})
moment.tz.setDefault('Asia/Kolkata')

const app = express()

// Middleware Initializations
app.disable('etag')
// helmet will be enabled only if HTTPS is true or else UI script CDNS and min.js wont work
// if(HTTPS_FLAG === 'Y'){
  app.use(helmet())
// }

app.use((req, res, next) => {
  res.setHeader('X-XSS-Protection', '1; mode=block')
  next()
})

app.use(cors())

app.use((req, res, next) => {
  if (req.method === 'GET' || req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE' || req.method === 'OPTIONS') {
    next()
  } else {
    return res.status(401).json({ status: 'Method not allowded' })
  }
})

app.use(express.static(path.join(__dirname, 'public')))
app.use(expressip().getIpInfoMiddleware)
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))
app.set("views", path.join(__dirname, "views"));
app.engine("html", require("ejs").renderFile)
// view engine not req since we app consists only API
// app.set("view engine", "html")

// fileUpload middleware
app.use(fileUpload())

app.use(expressSanitized.middleware())

app.use((req, res, next) => {
  req.currentTime = moment().tz('Asia/Kolkata'); // 'Asia/Kolkata' is the timezone for IST
  next();
})
app.get('*', GET_RATE_LIMITER, function (req, res, next) {
  next()
})
app.post('*', POST_RATE_LIMITER, function (req, res, next) {
  next()
})
// Connect Mongo & SessionMiddleware with MongoStore init here 
connectMongo()

//Initialize Routes
Routes.init(app)



export { app }