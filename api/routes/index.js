const router = require('express').Router()

const { authRouter } = require('./auth.router.js')
const { userRouter } = require('./user.router.js')
const { productRouter } = require('./product.router')

router
  .use('/auth', authRouter)
  .use('/users', userRouter)
  .use('/products', productRouter)

exports.router = router