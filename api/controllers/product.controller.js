const { productModel } = require('../models/product.model')

exports.createProduct = (req, res) => {
  productModel
    .create(req.body)
    .then(product => {
      res.status(200).json(product)
    })
    .catch(err => res.status(500).json({ msg: 'An error ocurred trying to create a product', err }))
}

exports.getAllProduct = (req, res) => {
  productModel
    .find(req.query)
    .then(product => res.status(200).json(product))
    .catch(err => res.status(500).json(err))
}

exports.getProductById = (req, res) => {
  productModel
    .findById(req.params.productId)
    .then(product => res.status(200).json(product))
    .catch(err => res.status(500).json(err))
}

exports.updateProduct = (req, res) => {
  productModel
    .findByIdAndUpdate(req.params.productId, req.body, {new: true, useFindAndModify: false})
    .then(product => res.status(200).json({msg: 'Producto actualizado', product }))
    .catch(err => res.status(500).json(err))
}

exports.deleteProduct = (req, res) => {
  productModel
  .findByIdAndDelete(req.params.productId)
  .then(product => res.status(200).json({msg: 'Producto eliminado', product }))
  .catch(err => res.status(500).json(err))
}

