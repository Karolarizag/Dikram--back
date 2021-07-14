const router = require('express').Router()
const {
  createMarketPlace,
  getAllMarketPlaces,
  getMarketPlaceById,
  updateMarketPlace,
  deleteMarketPlace
} = require('../controllers/marketplace.controller')

const { checkAuth, authSeller, authAdmin } = require('../../utils/index')

router  
  .post('/', checkAuth, authSeller, createMarketPlace)
  .get('/', getAllMarketPlaces)
  .get('/:marketplaceId', getMarketPlaceById)
  .put('/:marketplaceId', checkAuth, authSeller, updateMarketPlace)
  .delete('/:marketplaceId', checkAuth, authSeller, deleteMarketPlace)

  exports.marketplaceRouter = router