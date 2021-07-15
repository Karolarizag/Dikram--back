const { userModel } = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { checkAuth } = require('../../utils/index')

// LOGIN USERS FUNCTION

exports.login = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email })

    if (!user) return res.status(401).json({ error: 'Wrong user not exists' });
    
    bcrypt.compare(req.body.password, user.password, (err, result) => {

      if (!result) return res.status(401).json({ error: 'Wrong email or password', err })

      const userData = {
        username: user.username,
        email: user.email,
        id: user._id,
        role: user.role
      }
      const token = jwt.sign(
        userData,
        process.env.SECRET,
        { expiresIn: '48h' }
      )

      res.status(200).json({ token: token, ...userData })
    })

  } catch (err) {
    res.status(500).json({ error: 'Error' })
  }
}

// SIGNUP USERS FUNCTION

exports.signUp = async (req, res) => {
  const hashedPwd = bcrypt.hashSync(req.body.password, 10)

  try {
    const user = await userModel.create({
      username: req.body.username,
      password: hashedPwd,
      email: req.body.email,
      birthdate: req.body.birthdate,
      role: req.body.role
    })

    const userData = {
      username: user.username,
      id: user._id,
      email: user.email,
      role: user.role
    }
    const token = jwt.sign(
      userData,
      process.env.SECRET,
      { expiresIn: '48h' }
    )
    
    res.status(201).json({ token: token, ...userData })

  } catch (err) {
    res.status(400).json({ error: 'Error' })
  }
}

exports.whoami = (req, res) => {
  console.log(res.locals.user)
  res.status(200).json({user: res.locals.user})
}
