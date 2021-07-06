const router = require('express').Router()
const { createProduct } = require('../controllers/product.controller')

const { checkAuth, authSeller, authAdmin } = require('../../utils/index')

router 
  .post('/',checkAuth, authSeller, createProduct)

exports.productRouter = router