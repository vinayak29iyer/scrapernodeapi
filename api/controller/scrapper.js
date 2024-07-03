import { getWebsiteMetadata, verifyJwt } from '../services/index'
import { saveScrapperData, findScrapperDataById} from '../queries/scraper'



export const findScrapperData = async(params) => {
        const { url = '' } = params
        const findCacheData = await findScrapperDataById(url.trim())
        if(findCacheData){
            return {
                data: findCacheData.metaData,
                cache: true
            }
        }
        const { data: htmlData = '', status = false, message = ''} = await getWebsiteMetadata(url)
        if(!htmlData){
            throw new Error(message.includes('ENOTFOUND') ? 'Invalid Url!': message)
        }
        //save scrappedData to mongoCache
        await saveScrapperData({
            websiteName: url.trim(),
            metaData: htmlData
        })
        return {
            data: htmlData,
            cache: false
        }
}