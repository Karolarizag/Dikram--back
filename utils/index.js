const { userModel } = require('../api/models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


exports.checkAuth = (req, res, next) => {
  jwt.verify(req.headers.token, process.env.SECRET, (err, token) => {
    if (err) {
      console.log(err)
      res.status(403).json({ error: 'Token not valid' })
    } else {
      userModel
        .findOne({ email: token.email })
        .then(user => {
          if (user) {
            res.locals.user = user
            next()
          } else {
            res.status(400).json({ err: 'User not found' })
          }
        })
        .catch(err => {
          console.log(err)
          res.status(500).json({ err: 'Issue in DB' })
        })
    }
  })
}

exports.authSeller = roles => {
  return (req, res, next) => {
    if (user.role === 'seller') { next() }
    res.status(403).send('Access denied')
  }
}
exports.authAdmin = roles => {
  return (req, res, next) => {
    if (user.role === 'admin') { next() }
    res.status(403).send('Access denied')
  }
}

