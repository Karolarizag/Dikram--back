const { productModel } = require('../models/product.model')

exports.createProduct = (req, res) => {
  productModel
    .create(req.body)
    .then(product => {
      res.status(200).json(product)
    })
    .catch(err => res.status(500).json({ msg: 'An error ocurred trying to create a product', err }))
}