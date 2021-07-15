const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  likes: Number,
  description: String,
  date: {
    type: Date,
    default: Date.now()
  },
  reports: [String]
})


const postSchema = new mongoose.Schema({
  imagen: [String],
  description: String,
  comments: [commentSchema],
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product'
  }],
  tags: [String],
  likes: Number,
  date: {
    type: Date,
    default: Date.now()
  },
  reports: [String]
})


exports.postModel = mongoose.model('post', postSchema)