const { postModel } = require('../models/post.model')
const { marketPlaceModel } = require('../models/marketplace.model')
const { productModel } = require('../models/product.model')


exports.getAllPosts = async (req, res) => {
  try {
    const post = await postModel.find(req.query)
    res.status(200).json(post)
  } catch (error) {
    res.status(500).json(error)
  }
}

exports.getPostById = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.postId)
    res.status(200).json(post)
  } catch (error) {
    res.status(500).json(error)
  }
}

exports.createPost = async (req, res) => {
  try {
    const marketPlace = await marketPlaceModel.findById(res.locals.user.marketplace)
    const post = await postModel.create(req.body)
    marketPlace.posts.push(post.id)
    await marketPlace.save()

    post.marketplace = res.locals.user.marketplace
    await post.save()

    res.status(200).json({ msg: 'Post creado correctamente', post })
  } catch (error) {
    res.status(500).json(error)
  }
}

exports.updatePost = async (req, res) => {
  try {
    const post = await postModel.findByIdAndUpdate(req.params.postId, req.body, { new: true, useFindAndModify: false })
    res.status(200).json({ msg: 'Post actualizado correctamente', post })
  } catch (error) {
    res.status(500).json(error)
  }
}
exports.deletePost = async (req, res) => {
  try {
    const post = await postModel.findByIdAndDelete(req.params.postId)
    const marketPlace = await marketPlaceModel.findById(res.locals.user.marketplace)
    marketPlace.posts.remove(req.params.postId)

    await marketPlace.save()

    res.status(200).json({ msg: 'Producto eliminado', post })
  } catch (error) {
    res.status(500).json(error)
  }
}

