const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcrypt')


const userSchema = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  games:{type:Number,default:0},
  wins:{type:Number,default:0},
  loses:{type:Number,default:0},
  vocabularies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vocabulary' }]
});

userSchema.statics.signup = async function(email, password) {

  if (!email || !password) {
    throw Error('All fields must be filled')
  }
  if (!validator.isEmail(email)) {
    throw Error('Email not valid')
  }
  

  const exists = await this.findOne({ email })

  if (exists) {
    throw Error('Email already in use')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ email, password: hash })

  return user
}

userSchema.statics.login = async function(email, password) {

  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  const user = await this.findOne({ email })
  if (!user) {
    throw Error('Incorrect email')
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Incorrect password')
  }

  return user
}

module.exports = mongoose.model('User', userSchema)