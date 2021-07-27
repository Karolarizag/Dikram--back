const { saleModel } = require('../models/sale.model')
const { userModel } = require('../models/user.model')
const { marketPlaceModel } = require('../models/marketplace.model')

exports.createSale = async (req, res) => {
  try {
    const sale = await saleModel.create(req.body)
    const user = await userModel.findById(res.locals.user.id)
    user.history.push(sale.id)

    const marketplaceId = await user.cart[0].marketplace
    const marketplace = await marketPlaceModel.findById(marketplaceId)
    const seller = await userModel.findById(marketplace.seller)
    marketplace.sales.push(sale.id)
    
    user.cart.forEach(p => {
      seller.notifications.push({ msg: `¡Se han vendido ${p.quantity} productos de tu tienda!` })
    })

    await seller.save()
    await marketplace.save()

    user.cart = undefined
    await user.save()
    res.status(200).json(sale)
    // add { sale, user }
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
    const sale = await saleModel.findByIdAndUpdate(req.params.saleId, req.body, { new: true, useFindAndModify: false })
    res.status(200).json(sale)
  } catch (err) {
    res.status(500).json(err)
  }
}

// NOT NEEDED

/* exports.deleteSale = async (req, res) => {
  try {
    const sale = await saleModel.findByIdAndDelete(req.params.saleId)
    console.log(sale)
    if (res.locals.user.id === sale.buyer) {
      const user = await userModel.findById(res.locals.user.id)
      user.history.remove(sale.id)
      await user.save()

      const marketplace = await userModel.findById(res.locals.user.cart.marketplace)
      // this didn't find marketplace id
      marketplace.sales.remove(sale.id)
      await marketplace.save()
    } else {
      const user = await userModel.findById(sale.buyer)
      user.history.remove(sale.id)
      await user.save()

      const marketplace = await userModel.findById(res.locals.user.marketplace)
      marketplace.sales.remove(sale.id)
      await marketplace.save()
    }

    res.status(200).json(sale)
  } catch (err) {
    res.status(500).json(err)
  }
} */
