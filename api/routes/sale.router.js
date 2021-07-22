const router = require('express').Router()

const {
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale
} = require('../controllers/sale.controller')

const { checkAuth, authSeller, authAdmin } = require('../../utils/index')

router
  .post('/', checkAuth, createSale)
  .get('/', checkAuth, authAdmin, getAllSales)
  .get('/:saleId', checkAuth, getSaleById)
  .put('/saleId', checkAuth, updateSale)
  .delete('/:saleId', checkAuth, deleteSale)

exports.saleRouter = router