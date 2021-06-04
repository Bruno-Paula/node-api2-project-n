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
    res.json(error)
  }
})

module.exports = router
