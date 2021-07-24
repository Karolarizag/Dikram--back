const mongoose = require('mongoose')


const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  rate: Number,
  description: String,
  date: {
    type: Date,
    default: Date.now()
  },
  reports: [String]
})

const productSchema = new mongoose.Schema({
  name: String,
  image: Array,
  description: String,
  price: Number,
  marketplace: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'marketplace'
  },
  comments: [commentSchema],
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
  reports: Array,
  sizes: Array,
  colors: Array,
  materials: Array,
  tags: Array
})



exports.productModel = mongoose.model('product', productSchema)
