import { getWebsiteMetadata } from '../services/index'
import { scrapperTestUrl } from './stubs'

//JEST GLOBAL TIMEOUT 60 SECONDS
jest.setTimeout(1000*60)

test('scrapper success response', async() => {
    const testData = await getWebsiteMetadata(scrapperTestUrl)
    expect(testData?.status).toBe(true)
})