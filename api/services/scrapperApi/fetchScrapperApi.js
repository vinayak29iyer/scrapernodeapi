import axios from 'axios'
import {travHtmlAndGetData} from './fetchScrapperApiHelper'

export const getWebsiteMetadata = async(url) => {
  console.log('url>>>>>> ',url)
    try {
      const { data: htmlData = '' } = await axios.get(url,{
        // timeout: 40000, // Timeout in milliseconds (5 seconds)
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0'
        }
      }) || {}
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
