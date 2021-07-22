const router = require('express').Router()

const { 
  createPost, 
  updatePost, 
  deletePost, 
  getAllPosts, 
  getPostById
} = require('../controllers/post.controller')

const { checkAuth, authSeller, authAdmin } = require('../../utils/index')

router
  .post('/',checkAuth, authSeller, createPost)
  .get('/', getAllPosts )
  .get('/:postId', getPostById )
  .put('/:postId', checkAuth, authSeller, updatePost)
  .delete('/:postId', checkAuth, authSeller, deletePost)

exports.postRouter = router