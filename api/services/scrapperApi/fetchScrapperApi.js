// import axios from 'axios'
import puppeteer from 'puppeteer'
import {travHtmlAndGetData} from './fetchScrapperApiHelper'

export const getWebsiteMetadata = async() => {
  const url = 'https://www.amazon.in/HOUSE-VIPA-Self-Adhesive-Accessories-Utilisation/dp/B0CQVPSLZF/?_encoding=UTF8&pd_rd_w=cYaLb&content-id=amzn1.sym.ae41e9d9-d36f-45e2-a491-1ba1306e9cb3&pf_rd_p=ae41e9d9-d36f-45e2-a491-1ba1306e9cb3&pf_rd_r=78T4JW8EDNWH2C6710RF&pd_rd_wg=lgjlT&pd_rd_r=7c07a693-8111-4a01-8f4a-28eb67c165f0&ref_=pd_hp_d_btf_sah_gw_pc_en_&th=1'
    try {
      const htmlData = async() => {
        
        const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox']});
        const page = await browser.newPage();
        // Set a custom User-Agent
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
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
