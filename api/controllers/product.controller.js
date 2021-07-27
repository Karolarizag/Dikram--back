const { productModel } = require('../models/product.model')
const { marketPlaceModel } = require('../models/marketplace.model')

exports.createProduct = async (req, res) => {
  try {
    const product = await productModel.create(req.body)
    product.marketplace = res.locals.user.marketplace
    await product.save()

    const marketPlace = await marketPlaceModel.findById(res.locals.user.marketplace)
    marketPlace.products.push(product.id)
    await marketPlace.save()
    
    res.status(200).json(product)

  } catch (err) {
    res.status(500).json({ msg: 'Ha ocurrido un error al crear el producto', err })
  }
}


exports.getAllProduct = async (req, res) => {
  try {
    const product = await productModel.find(req.query)
    res.status(200).json(product)

  } catch (err) {
    res.status(500).json(err)
  }
}

exports.getProductById = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.productId)
    res.status(200).json(product)

  } catch (err) {
    res.status(500).json(err)
  }
}

exports.updateProduct = async (req, res) => {
  try {
    const product = await productModel.findByIdAndUpdate(req.params.productId, req.body, { new: true, useFindAndModify: false })
    res.status(200).json({ msg: 'Producto actualizado', product })
  } catch (err) {
    res.status(500).json(err)
  }
}

exports.deleteProduct = async (req, res) => {
  try {
    const product = await productModel.findByIdAndDelete(req.params.productId)
    const marketPlace = await marketPlaceModel.findById(res.locals.user.marketplace)

    marketPlace.products.remove(req.params.productId)
    await marketPlace.save()
    
    res.status(200).json({ msg: 'Producto eliminado', product })

  } catch (err) {
    res.status(500).json(err)
  }
}

exports.getCustomForm = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.productId)
      .populate('customForm.texture')
      .populate('customForm.pattern')
    res.status(200).json(product)
  } catch (err) {
    res.status(500).json(err)
  }
}