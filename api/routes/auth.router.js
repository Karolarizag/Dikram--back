const { login, signUp, whoami } = require('../controllers/auth.controller')
const router = require('express').Router()
const { checkAuth } = require('../../utils/index')

router
  .post('/signup', signUp)
  .post('/login', login)
  .get('/user', checkAuth, whoami)

exports.authRouter = router
