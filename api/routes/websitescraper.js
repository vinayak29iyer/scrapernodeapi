import express from 'express'
import { findScrapperData } from '../controller/index'
import { protectedScraperRoute, validateScraperReq } from '../validation/scraper'
import { logger } from '../services'


const WebsiteScraperRouter = express.Router()

  //Fetch metadata
  WebsiteScraperRouter.post(
    `/fetch-metadata`, protectedScraperRoute, validateScraperReq, async (req, res, next) => {
      try{
       const { url = '' } = req.body || {}
      const { data, cache} = await findScrapperData({url})
       return res.status(200).json({
        statusCode: 200,
        status: true,
        data: {
          htmlData: data,
          cache
        },
        message: 'success'
       })
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

  export default WebsiteScraperRouter