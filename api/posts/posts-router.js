const express = require('express')
const router = express.Router()
const Post = require('./posts-model')
const {validateId, validateEntries} = require('./post-middleware')

router.get('/', async (req, res) => {
  try {
    const getPost = await Post.find()
    res.status(200).json(getPost)
  } catch (error) {}
})

router.get('/:id', validateId, (req, res) => {
  res.send(req.post)
})

router.post('/', validateEntries, async (req, res) => {
  try {
    const data = await Post.insert(req.post)
    res.status(201).json({
      id: data.id,
      title: req.post.title,
      contents: req.post.contents,
    })
  } catch (error) {
    next({
      status: 500,
      message: 'There was an error while saving the post to the database',
    })
  }
})

router.put('/:id', validateId, validateEntries, async (req, res, next) => {
  const {id} = req.params
  try {
    const data = await Post.update(id, req.post)
    res.status(200).json({
      id: Number(id),
      ...req.post,
    })
  } catch (error) {
    next({status: 500, message: 'The post information could not be modified'})
  }
})
router.delete('/:id', validateId, async (req, res, next) => {
  const {id} = req.params
  try {
    const data = await Post.remove(id)
    res.status(200).json(req.post)
  } catch (error) {
    next({status: 500, message: 'The post could not be removed'})
  }
})

router.get('/:id/comments', validateId, async (req, res, next) => {
  const {id} = req.params
  try {
    const data = await Post.findPostComments(id)
    res.status(200).json(data)
  } catch (error) {
    next({
      status: 500,
      message: 'The comments information could not be retrieved',
    })
  }
})

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({message: err.message})
})

module.exports = router
