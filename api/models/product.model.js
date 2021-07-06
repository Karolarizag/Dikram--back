const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: String,
  image: Array,
  description: String,
  price: Number,
  marketplace: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'marketplace'
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'comments'
  }],
  quantity: Number,
  rate: {
    type: Number,
    default: 0
  },
  customizable: Boolean,
  // customForm: [customSchema],
  date: {
    type: Date,
    default: Date.now()
  },
  reports: Array
})

exports.productModel = mongoose.model('product', productSchema)
