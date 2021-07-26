const { userModel } = require('../models/user.model')
const { textureModel, patternModel } = require('../models/custom.model')

exports.createTexture = async (req, res) => {
  try {
    const texture  = await textureModel.create(req.body)
    res.status(200).json({ msg: 'Textura creada con éxito', texture })
  } catch (err) {
    res.status(500).json({ msg: 'Ha ocurrido un error creando una textura', err })
  }
}

exports.getAllTextures = async (req, res) => {
  try {
    const textures = await textureModel.find()
    res.status(200).json(textures)
  }  catch (err) {
    res.status(500).json({ msg: 'Ha ocurrido un error buscando una textura', err })
  }
}

exports.deleteTexture = async (req, res) => {
  try {
    const texture = await textureModel.findByIdAndDelete(req.params.textureId)
    res.status(200).json({ msg: 'Textura eliminada correctamente', texture })
  }   catch (err) {
    res.status(500).json({ msg: 'Ha ocurrido un error eliminando una textura', err })
  }
}

exports.createPattern = async (req, res) => {
  try {
    const pattern = await patternModel.create(req.body)
    res.status(200).json({ msg: 'pattern creada con éxito'. pattern })
  } catch (err) {
    res.status(500).json({ msg: 'Ha ocurrido un error creando una pattern', err })
  }
}

exports.getAllPatterns = async (req, res) => {
  try {
    const patterns = await patternModel.find()
    res.status(200).json(patterns)
  }  catch (err) {
    res.status(500).json({ msg: 'Ha ocurrido un error buscando una pattern', err })
  }
}

exports.deletePattern = async (req, res) => {
  try {
    const pattern = await patternModel.findByIdAndDelete(req.params.patternId)
    res.status(200).json({ msg: 'pattern eliminada correctamente', pattern })
  }   catch (err) {
    res.status(500).json({ msg: 'Ha ocurrido un error eliminando una pattern', err })
  }
}