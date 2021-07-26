const mongoose = require('mongoose')

const customSchema = new mongoose.Schema({
  basecolor: [String],
  texture: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'texture'
  }],
  pattern: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'patters'
  }],
})

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
  customForm: customSchema,
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
exports.customModel = mongoose.model('custom', customSchema)
