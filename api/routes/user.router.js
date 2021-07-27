const router = require('express').Router()
const {
  updateUser,
  deleteUser,
  getUser,
  addToCart,
  getCart,
  deleteFromCart
} = require('../controllers/user.controller')

const { checkAuth } = require('../../utils/index')

router
  .get('/:userId', checkAuth, getUser)
  .get('/:userId/cart', checkAuth, getCart)
  .put('/account', checkAuth, updateUser)
  .put('/:userId/cart', checkAuth, addToCart)
  .delete('/account', checkAuth, deleteUser)
  .delete('/:userId/cart/:cartId', checkAuth, deleteFromCart)

exports.userRouter = router
