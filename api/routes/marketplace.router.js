const router = require('express').Router()
const {
  createMarketPlace,
  getAllMarketPlaces,
  getMarketPlaceById,
  updateMarketPlace,
  deleteMarketPlace,
  getProductsByMarketplace,
  getPostsByMarketplace
} = require('../controllers/marketplace.controller')

const { checkAuth, authSeller, authAdmin } = require('../../utils/index')

router  
  .post('/', checkAuth, authSeller, createMarketPlace)
  .get('/', getAllMarketPlaces)
  .get('/:marketplaceId', getMarketPlaceById)
  .get('/:marketplaceId/products', getProductsByMarketplace)
  .get('/:marketplaceId/posts', getPostsByMarketplace)
  .put('/:marketplaceId', checkAuth, authSeller, updateMarketPlace)
  .delete('/:marketplaceId', checkAuth, authSeller, deleteMarketPlace)

  exports.marketplaceRouter = router 