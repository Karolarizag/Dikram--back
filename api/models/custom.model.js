const mongoose = require('mongoose')

const textureSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  }, 
  image: {
    type: String,
  }, 
})

const patternSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  }, 
  image: {
    type: String
  }, 
})


exports.textureModel = mongoose.model('texture', textureSchema)
exports.patternModel = mongoose.model('pattern', patternSchema)