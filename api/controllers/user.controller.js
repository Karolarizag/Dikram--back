const { userModel } = require('../models/user.model')

exports.getUser = (req, res) => {
  userModel
    .findById(req.params.userId)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(404).json(err))
}

exports.updateUser = (req, res) => {
  userModel
    .findOneAndUpdate({ _id: res.locals.user._id }, req.body, {new: true})
    .then(user => res.status(200).json({ msg: 'Usuario actualizado', user }))
    .catch(err => res.status(304).json(err))
}

exports.deleteUser = (req, res) => {
  userModel
    .deleteOne({ _id: res.locals.user._id})
    .then(user => res.status(200).json(`${user.username} ha sido eliminado. Nuestra base de datos ha sido actualizada`))
    .catch(err => res.status(500).json(err))
}
