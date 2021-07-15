const { postModel}= require('../models/post.model')

exports.createPost = async (req, res) => {
  try {
    const post = await postModel.create(req.body)
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
    const post = await postModel.findByIdAndDelete(req.params.pòstId)

  } catch (error) {
    res.status(500).json(error) 
  }
}