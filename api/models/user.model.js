const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product'
  },
  marketplace: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'marketplace'
  },
  size: String,
  color: String,
  quantity: Number,
  price: Number
})

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
  cart: [cartSchema],
  history: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'sale'
  }],
  wishlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product'
  }],
  followed: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'marketplace'
  }],
  // address: adressSchema,
  notifications: [String],
  reports: [String],
  marketplace: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'marketplace'
  }
})

exports.userModel = mongoose.model('user', userSchema)
exports.cartModel = mongoose.model('cart', cartSchema)
