const { marketPlaceModel } = require('../models/marketplace.model')

exports.createMarketPlace = async (req, res) => {
  try {
    const marketPlace = await marketPlaceModel.create(req.body)
    res.locals.user.marketplace = marketPlace.id
    await res.locals.user.save()

    marketPlace.seller = res.locals.user.id
    await marketPlace.save()

    res.json(marketPlace)
  } catch(err) {  
    res.json(err)
  }
}

exports.getAllMarketPlaces = (req, res) => {
  marketPlaceModel
    .find(req.query)
    .then(marketPlace => res.status(200).json(marketPlace))
    .catch(err => res.status(500).json(err))
}

exports.getMarketPlaceById = (req, res) => {
  marketPlaceModel
    .findById(req.params.marketplaceId)
    .then(marketPlace => res.status(200).json(marketPlace))
    .catch(err => res.status(500).json(err))
}

exports.updateMarketPlace = (req, res) => {
  marketPlaceModel
    .findByIdAndUpdate(req.params.marketplaceId, req.body, {new: true, useFindAndModify: false})
    .then(marketPlace => res.status(200).json({msg: 'Marketplace actualizado', marketPlace }))
    .catch(err => res.status(500).json(err))
}

exports.deleteMarketPlace = (req, res) => {
  marketPlaceModel
  .findByIdAndDelete(req.params.marketplaceId)
  .then(marketPlace => res.status(200).json({msg: 'Marketplace eliminado', marketPlace }))
  .catch(err => res.status(500).json(err))
}