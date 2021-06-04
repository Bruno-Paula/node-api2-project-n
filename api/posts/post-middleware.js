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

  const validateTitle = !title || typeof 'string' == title
  const validateContents = !contents || typeof 'string' == title

  if (validateTitle || validateContents) {
    res.status(400).json({message: 'Title or Content are missing or invalid'})
  } else {
    req.post = {title: title.trim(), contents: contents.trim()}
    next()
  }
}

module.exports = {
  validateId,
  validateEntries,
}
