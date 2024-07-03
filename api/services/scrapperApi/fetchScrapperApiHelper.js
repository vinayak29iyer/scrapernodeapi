import cheerio from 'cheerio'

export const travHtmlAndGetData = (html) => {
    const trimData = (htmlToTrim) => {
        return (htmlToTrim ? htmlToTrim.trim(): '')
    }
    const $ = cheerio.load(html)
    if($('body').length <= 0){
        throw new Error('Invalid Html!')
    }
    const metaDescription = $('meta[name="description"]').attr('content')
    const metaKeywords = $('meta[name="keywords"]').attr('content')
    const pageTitle = $('title').text()
    const productImage = $('#landingImage').attr('src')
    const productTitle = $('#productTitle').text()
    return { metaDescription: trimData(metaDescription), metaKeywords: trimData(metaKeywords), pageTitle: trimData(pageTitle), productImage: trimData(productImage), productTitle: trimData(productTitle) }
}