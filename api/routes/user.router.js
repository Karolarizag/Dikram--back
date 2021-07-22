const router = require('express').Router()
const { 
  updateUser,
  deleteUser,
  getUser,
  updatePassword
} = require('../controllers/user.controller')

const { checkAuth, authSeller, authAdmin } = require('../../utils/index')

router
  .get('/:userId', checkAuth, getUser)
  .put('/account', checkAuth, updateUser)
  .put('/account/password', checkAuth, updatePassword)
  .delete('/account', checkAuth, deleteUser)

exports.userRouter = router