const { login, signUp } = require('../controllers/auth.controller')
const router = require('express').Router()

router
  .post('/signup', signUp)
  .post('/login', login)

exports.authRouter = router
