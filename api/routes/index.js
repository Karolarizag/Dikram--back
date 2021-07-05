const router = require('express').Router()

const { authRouter } = require('./auth.router.js')
const { userRouter } = require('./user.router.js')

router
  .use('/auth', authRouter)
  .use('/users', userRouter)

exports.router = router