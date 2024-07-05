import axios from 'axios'
import {travHtmlAndGetData} from './fetchScrapperApiHelper'
import { logger } from '..'

export const getWebsiteMetadata = async(url) => {
    try {
      //User-Agent added to get all types of html pages
      const { data: htmlData = '' } = await axios.get(url,{
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0'
        }
      }) || {}
      if(!htmlData){
        throw new Error('Invalid url!')
      }
      return {
        status: true,
        data: travHtmlAndGetData(htmlData)
      }
    } catch (error) {
      console.log('ERROR IN getWebsiteMetadata')
      logger.error(`ERROR IN getWebsiteMetadata: ${error}`)
      return {
        status: false,
        message: (error.message || 'Invalid Url!')
      }
    }
  }
