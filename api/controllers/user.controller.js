const { userModel, cartModel } = require('../models/user.model')

exports.getUser = async (req, res) => {
  try { 
    const user = await userModel.findById(req.params.userId)
    res.status(200).json(user)
  } catch (err) {
    err => res.status(404).json(err)
  }
}

exports.updateUser = async (req, res) => {
  try {
    const user = await userModel.findOneAndUpdate({ _id: res.locals.user._id }, req.body, { new: true })
    res.status(200).json({ msg: 'Usuario actualizado', user })
  } catch (err) {
    err => res.status(404).json(err)
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const user = await userModel.deleteOne({ _id: res.locals.user._id })
    res.status(200).json(`Tu cuenta ha sido eliminada correctamente`)
  } catch (err) {
    res.status(500).json(err)
  }
}

exports.addToCart = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.userId)
    await user.cart.push({
      product: req.body.product,
      marketplace: req.body.marketplace,
      size: req.body.size,
      color: req.body.color,
      quantity: req.body.quantity,
      price: req.body.price
    })
    await user.save()
    
    res.status(200).json({ msg: `Añadido correctamente` })
  } catch (err) {
    res.status(500).json({ msg:'fallo al añadir al carrito',err })
  }
}

exports.deleteFromCart = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.userId)
    const cart = user.cart.id(req.params.cartId)
    await user.cart.remove(cart)
    await user.save()
    res.status(200).json(`carrito eliminado`)
  } catch (err) {
    res.status(500).json({ msg:'fallo al añadir al carrito',err })
  }
}