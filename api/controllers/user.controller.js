const { userModel } = require('../models/user.model')
const { productModel } = require('../models/product.model')

exports.getUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.userId)
    res.status(200).json(user)
  } catch (err) {
    res.status(404).json(err)
  }
}

exports.updateUser = async (req, res) => {
  try {
    const user = await userModel.findOneAndUpdate({ _id: res.locals.user._id }, req.body, { new: true })
    res.status(200).json(user)
  } catch (err) {
    res.status(404).json(err)
  }
}

exports.deleteUser = async (req, res) => {
  try {
    await userModel.deleteOne({ _id: res.locals.user._id })
    res.status(200).json('Tu cuenta ha sido eliminada correctamente')
  } catch (err) {
    res.status(500).json(err)
  }
}

exports.addToCart = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.userId)
    user.cart.push({
      product: req.body.product,
      marketplace: req.body.marketplace,
      custom: req.body.custom,
      size: req.body.size,
      color: req.body.color,
      quantity: req.body.quantity,
      price: req.body.price
    })
    await user.save()

    res.status(200).json({ msg: 'Añadido correctamente' })
  } catch (err) {
    res.status(500).json({ msg: 'fallo al añadir al carrito', err })
  }
}

exports.getCart = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.userId)
    const products = []
    user.cart.forEach((v) => {
      const product = productModel.find({ _id: v.product }).populate('product')
      products.push(product)
    })
    const allProducts = (await Promise.all(products)).flat()
    // Erase .flat() if wants to return an Array with Arrays of each cart filled with products instead a single Array with all products of every cart.
    res.status(200).json({allProducts, cart: user.cart})
  } catch (err) {
    res.status(500).json(err)
  }
}

exports.deleteFromCart = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.userId)
    const cart = user.cart.id(req.params.cartId)
    await user.cart.remove(cart)
    await user.save()
    res.status(200).json({ msg: 'Carrito eliminado', user })
  } catch (err) {
    res.status(500).json({ msg: 'fallo al eleminar del carrito', err })
  }
}
