const { productModel } = require('../models/product.model')
const { saleModel } = require('../models/sale.model')
const { userModel } = require('../models/user.model')

exports.createSale = async (req, res) => {
  console.log(req.body)
  try {
    const sale = await saleModel.create(req.body)

    const user = await userModel.findById(res.locals.user.id)
    console.log('paso el segundo await')
    user.history.push(sale.id)
    await user.save()

    const marketplace = await userModel.findById(res.locals.user.cart.marketplace)
    console.log('paso el tercer await')

    marketplace.push(sale.id)
    await marketplace.save()

    res.status(200).json(sale)

  } catch (err) {
    res.status(500).json(err)
  }
}

exports.getAllSales = async (req, res) => {
  try {
    const sale = await saleModel.find(req.query)
    res.status(200).json(sale)

  } catch (err) {
    res.status(500).json(err)
  }
}

exports.getSaleById = async (req, res) => {
  try {
    const sale = await saleModel.findById(req.params.saleId)
    res.status(200).json(sale)

  } catch (err) {
    res.status(500).json(err)
  }
}

exports.updateSale = async (req, res) => {
  try {
    const sale = await saleModel.findByIdAndDelete(req.params.saleId, req.body, { new: true, useFindAndModify: false })
    res.status(200).json(sale)
  } catch (err) {
    res.status(500).json(err)
  }
}

exports.deleteSale = async (req, res) => {
  try {
    const sale = await saleModel.findByIdAndDelete(req.params.saleId)


    if (res.locals.user.id === sale.buyer) {
      const user = await userModel.findById(res.locals.user.id)
      user.history.remove(sale.id)
      await user.save()

      const marketplace = await userModel.findById(res.locals.user.cart.marketplace)
      marketplace.remove(sale.id)
      await marketplace.save()

    } else {
      const user = await userModel.findById(sale.buyer)
      user.history.remove(sale.id)
      await user.save()

      const marketplace = await userModel.findById(res.locals.user.marketplace)
      marketplace.remove(sale.id)
      await marketplace.save()
    }


    res.status(200).json(sale)

  } catch {
    res.status(500).json(err)
  }
}