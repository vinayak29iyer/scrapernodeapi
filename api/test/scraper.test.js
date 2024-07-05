import { getWebsiteMetadata } from '../services/index'
import { scraperTestUrl } from './stubs'

//JEST GLOBAL TIMEOUT 60 SECONDS
jest.setTimeout(1000*60)

test('scraper success response', async() => {
    const testData = await getWebsiteMetadata(scraperTestUrl)
    expect(testData?.status).toBe(true)
})