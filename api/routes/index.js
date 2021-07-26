const router = require('express').Router()

const { authRouter } = require('./auth.router.js')
const { userRouter } = require('./user.router.js')
const { productRouter } = require('./product.router')
const { marketplaceRouter } = require('./marketplace.router')
const { postRouter } = require('./post.router')
const { saleRouter } = require('./sale.router')
const { customRouter } = require('./custom.router')

router
  .use('/auth', authRouter)
  .use('/users', userRouter)
  .use('/products', productRouter)
  .use('/marketplace', marketplaceRouter)
  .use('/post', postRouter)
  .use('/sales', saleRouter)
  .use('/custom', customRouter)

exports.router = router