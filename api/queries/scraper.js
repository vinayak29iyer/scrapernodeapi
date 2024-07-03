import { WebsiteScrapperModel } from '../models/index'

export const findScrapperDataById = async(websiteName) => {
    return WebsiteScrapperModel.findOne({
        websiteName
    })
}
export const saveScrapperData = async(params) => {
    try {
       return WebsiteScrapperModel.create(params)
    } catch(error) {
        throw new Error(error.message || 'Error in Saving data')
    }
}
export const findAllScrapperByUrl = async(url) => {
    //.sort({_id: -1}) , even if we have repeatative data, this will always get the latest record
    return WebsiteScrapperModel.findOne({ websiteName: url }).sort({_id: -1})
}
