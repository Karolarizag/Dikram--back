const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: {
    unique: [true, 'Este usuario ya existe, intenta con otro'],
    required: [true, 'Por favor ingrese un nombre de usuario'],
    type: String
  },
  email: {
    unique: [true, 'Este email ya existe, intenta con otro'],
    required: [true, 'Por favor ingrese un email válido'],
    type: String
  },
  password: {
    required: true,
    type: String
  },
  role: {
    type: String,
    enum: ['admin', 'seller', 'user'],
    default: 'user'
  },
  birthdate: Date,
  phone: String, 
  // cart: cartSchema,
  history: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'sale'
  }],
  wishList: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product'
  }],
  followed: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'marketPlace'
  }],
  // address: adressSchema,
  notifications: [String],
  reports: [String]
})

exports.userModel = mongoose.model('user', userSchema)