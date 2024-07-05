import axios from 'axios'
import {travHtmlAndGetData} from './fetchScrapperApiHelper'

export const getWebsiteMetadata = async(url) => {
  console.log('url>>>>>> ',url)
    try {
      const { data: htmlData = '' } = await axios.get(url) || {}
      if(!htmlData){
        throw new Error('Invalid url!')
      }
      console.log('HTML DATA FOUND')
      return {
        status: true,
        data: travHtmlAndGetData(htmlData)
      }
    } catch (error) {
      console.log('ERROR IN getWebsiteMetadata')
      return {
        status: false,
        message: (error.message || 'Invalid Url!')
      }
    }
  }
