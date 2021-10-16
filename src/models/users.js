const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  lastname: {
    type: String
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String
  }
}, {
  versionKey: false,
  timestamps: true
})

// middleware
UserSchema.pre('save', function (next) {
  const hashedPassword = bcrypt.hashSync(this.password, 10)

  this.password = hashedPassword
  next()
})

const UserModel = mongoose.model('Users', UserSchema)

module.exports = UserModel
