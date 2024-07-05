import mongoose from 'mongoose'
const { Schema } = mongoose

const websiteScraperSchema = new Schema({
    websiteName: { type: String, required: true, index: true },
    metaData: { type: Object, required: true },
    createdAt: {
      type: Date,
      default: Date.now,
      index: { expires: '5m' } // TTL index set to 5 minutes
    }
}, {
  timestamps: true
})

websiteScraperSchema.pre('findOneAndUpdate', function (next) {
    var currentDate = new Date();
    next()
    
});

const WebsiteScraperModel = mongoose.model('websiteScraper', websiteScraperSchema)

export { WebsiteScraperModel }