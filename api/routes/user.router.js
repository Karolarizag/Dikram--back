const router = require('express').Router()
const { 
  updateUser,
  deleteUser,
  getUser
} = require('../controllers/user.controller')

const { checkAuth, authSeller, authAdmin } = require('../../utils/index')

router
  .get('/:userId', checkAuth, getUser)
  .put('/account', checkAuth, updateUser)
  .delete('/account', checkAuth, deleteUser)

exports.userRouter = router