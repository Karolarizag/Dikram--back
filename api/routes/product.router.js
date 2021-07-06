const router = require('express').Router()
const {
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getAllProduct
} = require('../controllers/product.controller')

const { checkAuth, authSeller, authAdmin } = require('../../utils/index')

router
  .post('/', checkAuth, authSeller, createProduct)
  .get('/',checkAuth, getAllProduct)
  .get('/:productId', checkAuth, authSeller, getProductById)
  .put('/:productId', checkAuth, authSeller, updateProduct)
  .delete('/:productId', checkAuth, authSeller, deleteProduct)

exports.productRouter = router