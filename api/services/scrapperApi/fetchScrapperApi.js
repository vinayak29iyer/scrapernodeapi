import axios from 'axios'
import {travHtmlAndGetData} from './fetchScrapperApiHelper'

export const getWebsiteMetadata = async(url) => {
  console.log('url>>>>>> ',url)
    try {
      const { data: htmlData = '' } = await axios.get(url) || {}
      console.log('htmlData RECVD from AXIOS>> ',htmlData)
      if(!htmlData){
        throw new Error('Invalid url!')
      }
      return {
        status: true,
        data: travHtmlAndGetData(htmlData)
      }
    } catch (error) {
      return {
        status: false,
        message: (error.message || 'Invalid Url!')
      }
    }
  }
