const router = require('express').Router()

const { 
  createPost
} = require('../controllers/post.controller')

const { checkAuth, authSeller, authAdmin } = require('../../utils/index')

router
  .post('/',checkAuth,  createPost)

exports.postRouter = router