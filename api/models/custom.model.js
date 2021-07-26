const mongoose = require('mongoose')

const textureSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    require: true
  }, 
  image: {
    type: String,
    require: true
  }, 
})

const patternSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    require: true
  }, 
  image: {
    type: String,
    require: true
  }, 
})


exports.textureModel = mongoose.model('texture', textureSchema)
exports.patternModel = mongoose.model('pattern', patternSchema)