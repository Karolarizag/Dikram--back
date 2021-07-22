const router = require('express').Router()
const { 
  updateUser,
  deleteUser,
  getUser,
  addToCart,
  deleteFromCart
} = require('../controllers/user.controller')

const { checkAuth, authSeller, authAdmin } = require('../../utils/index')

router
  .put('/:userId/cart', checkAuth, addToCart)
  .delete('/:userId/cart/:cartId', checkAuth, deleteFromCart)
  .get('/:userId', checkAuth, getUser)
  .put('/account', checkAuth, updateUser)
  .delete('/account', checkAuth, deleteUser)

exports.userRouter = router