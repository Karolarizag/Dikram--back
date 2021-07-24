const mongoose = require('mongoose')

const saleSchema = new mongoose.Schema({
  name: String,
  surname: String,
  phone: Number,
  country: String,
  city: String,
  adress: String,
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  cart: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'cart'
  }],
  payment: Object,
  price: Number,
  date: {
    type: Date,
    default: Date.now()
  }
})

exports.saleModel = mongoose.model('sale', saleSchema)