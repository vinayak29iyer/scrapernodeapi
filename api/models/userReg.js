import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const { Schema } = mongoose

const userRegSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true,required: true },
    password: { type: String, required: true },
    createdAt: {
      type: Date,
      default: Date.now,
      index: { expires: '30m' } // TTL index set to 30 minutes
    }
}, {
  timestamps: true
})

userRegSchema.pre('save', async function (next) {
    const password = this.password
    if(password){
      const salt = await bcrypt.genSalt(10)
      this.password = await bcrypt.hash(this.password, salt)
    }
    next()
    
});

const UserRegModel = mongoose.model('userReg', userRegSchema)

export { UserRegModel }