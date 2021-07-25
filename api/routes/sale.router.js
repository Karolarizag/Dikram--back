const router = require('express').Router()

const {
  createSale,
  getAllSales,
  getSaleById,
  updateSale
} = require('../controllers/sale.controller')

const { checkAuth, authAdmin } = require('../../utils/index')

router
  .post('/', checkAuth, createSale)
  .get('/', checkAuth, authAdmin, getAllSales)
  .get('/:saleId', checkAuth, getSaleById)
  .put('/:saleId', checkAuth, updateSale)

exports.saleRouter = router
