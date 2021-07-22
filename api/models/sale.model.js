const mongoose = require('mongoose')

const saleSchema = new mongoose.Schema ({
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
  products: [Object],
  payment: Object,
  price: mongoose.Schema.Types.Decimal128,
  date: {
    type: Date,
    default: Date.now()
  }
})

exports.saleModel = mongoose.model('sale', saleSchema)