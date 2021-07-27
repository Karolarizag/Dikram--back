const { marketPlaceModel } = require('../models/marketplace.model')
const { productModel } = require('../models/product.model')
const { postModel } = require('../models/post.model')

// MARKETPLACE CRUD

exports.createMarketPlace = async (req, res) => {
  try {
    const marketPlace = await marketPlaceModel.create(req.body)
    res.locals.user.marketplace = marketPlace.id
    await res.locals.user.save()

    marketPlace.seller = res.locals.user.id
    await marketPlace.save()

    res.json(marketPlace)
  } catch (err) {
    res.json(err)
  }
}

exports.getAllMarketPlaces = async (req, res) => {
  try {
    const marketPlace = await marketPlaceModel.find(req.query)
    res.status(200).json(marketPlace)
  } catch (err) {
    res.status(500).json(err)
  }
}

exports.getMarketPlaceById = async (req, res) => {
  try {
    const marketPlace = await marketPlaceModel.findById(req.params.marketplaceId)
    res.status(200).json(marketPlace)
  } catch (err) {
    res.status(500).json(err)
  }
}

exports.updateMarketPlace = async (req, res) => {
  try {
    const marketPlace = await marketPlaceModel.findByIdAndUpdate(req.params.marketplaceId, req.body, { new: true, useFindAndModify: false })
    res.status(200).json({ msg: 'Marketplace actualizado', marketPlace })
  } catch (err) {
    res.status(500).json(err)
  }
}

exports.deleteMarketPlace = async (req, res) => {
  try {
    const marketPlace = await marketPlaceModel.findByIdAndDelete(req.params.marketplaceId)
    res.locals.user.marketplace = undefined
    await res.locals.user.save()

    res.status(200).json({ msg: 'Marketplace eliminado', marketPlace })
  } catch (err) {
    res.status(500).json(err)
  }
}

exports.getProductsByMarketplace = async (req, res) => {
  try {
    const products = await productModel.find({ marketplace: req.params.marketplaceId })
    res.status(200).json(products)
  } catch (err) {
    res.status(200).json({ msg: 'Error trying to get this products', err })
  }
}

exports.getPostsByMarketplace = async (req, res) => {
  try {
    const post = await postModel.find({ marketplace: req.params.marketplaceId }).populate('products')

    res.status(200).json(post)
  } catch (err) {
    res.status(200).json({ msg: 'Error trying to get this post', err })
  }
}
