const Post = require('./posts-model')

const validateId = async (req, res, next) => {
  const {id} = req.params

  const post = await Post.findById(id)
  if (!post) {
    res.status(404).json({message: 'does not exist'})
  } else {
    req.post = post
    next()
  }
}

const validateEntries = (req, res, next) => {
  const {title, contents} = req.body

  const validateTitle = !title || typeof title !== 'string'
  const validateContents = !contents || typeof contents !== 'string'

  if (validateTitle || validateContents) {
    next({
      status: 400,
      message: 'Please provide title and contents for the post',
    })
  } else {
    req.post = {title: title.trim(), contents: contents.trim()}
    next()
  }
}

module.exports = {
  validateId,
  validateEntries,
}
