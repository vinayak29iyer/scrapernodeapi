// import axios from 'axios'
import puppeteer from 'puppeteer'
import {travHtmlAndGetData} from './fetchScrapperApiHelper'

export const getWebsiteMetadata = async(url) => {
  console.log('url>>>>>> ',url)
    try {
      const htmlData = async() => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);
        const html = await page.content(); 
        await browser.close();
        return html
    }
     /*  const { data: htmlData = '' } = await axios.get(url) || {}
      if(!htmlData){
        throw new Error('Invalid url!')
      } */
      return {
        status: true,
        data: travHtmlAndGetData(await htmlData())
      }
    } catch (error) {
      console.log('ERROR IN getWebsiteMetadata')
      return {
        status: false,
        message: (error.message || 'Invalid Url!')
      }
    }
  }
