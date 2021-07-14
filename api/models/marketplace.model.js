const mongoose = require('mongoose')

const marketPlaceSchema = new mongoose.Schema ({
  name: {
    type: String,
    unique: true
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  carousel: [String],
  profileImage: String,
  bannerImage: String,
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'post'
  }],
  categories: [String],
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }],
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product'
  }],
  rate: Number,
  sales: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'sale'
  }],
  ubication: String,
  shipping: Boolean,
  textures: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'texture'
  }],
  patterns: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'patters'
  }],
  reports: [String]
})

exports.marketPlaceModel = mongoose.model('marketplace', marketPlaceSchema)