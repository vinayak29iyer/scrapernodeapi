import axios from 'axios'
import {travHtmlAndGetData} from './fetchScrapperApiHelper'

export const getWebsiteMetadata = async(url) => {
    try {
      const { data: htmlData = '' } = await axios.get(url) || {}
      if(!htmlData){
        throw new Error('Invalid url!')
      }
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
