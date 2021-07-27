const router = require('express').Router()
const {
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getAllProduct,
  getCustomForm
} = require('../controllers/product.controller')

const { checkAuth, authSeller } = require('../../utils/index')

router
  .post('/', checkAuth, authSeller, createProduct)
  .get('/', getAllProduct)
  .get('/:productId', getProductById)
  .get('/:productId/customForm', getCustomForm)
  .put('/:productId', checkAuth, authSeller, updateProduct)
  .delete('/:productId', checkAuth, authSeller, deleteProduct)

exports.productRouter = router