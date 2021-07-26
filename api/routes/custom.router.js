const router = require('express').Router()

const { 
  createTexture,
  getAllTextures,
  deleteTexture,
  createPattern,
  getAllPatterns,
  deletePattern,
} = require('../controllers/custom.controller')

const { checkAuth, authSeller, authAdmin } = require('../../utils/index')

router 
  .post('/texture', checkAuth, authAdmin, createTexture)
  .post('/pattern', checkAuth, authAdmin, createPattern)
  .get('/texture', checkAuth, getAllTextures)
  .get('/pattern', checkAuth, getAllPatterns)
  .delete('/texture/:textureId', checkAuth, authAdmin, deleteTexture)
  .delete('/pattern/:patternId', checkAuth, authAdmin, deletePattern)

  exports.customRouter = router
