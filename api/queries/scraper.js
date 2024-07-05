import { WebsiteScraperModel } from '../models/index'

export const findScraperDataById = async(websiteName) => {
    return WebsiteScraperModel.findOne({
        websiteName
    })
}
export const saveScraperData = async(params) => {
    try {
       return WebsiteScraperModel.create(params)
    } catch(error) {
        throw new Error(error.message || 'Error in Saving data')
    }
}
export const findAllScraperByUrl = async(url) => {
    //.sort({_id: -1}) , even if we have repeatative data, this will always get the latest record
    return WebsiteScraperModel.findOne({ websiteName: url }).sort({_id: -1})
}
