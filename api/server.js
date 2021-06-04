const express = require('express')
const app = express()
const PostRouter = require('./posts/posts-router')

app.use(express.json())
app.use('/api/posts', PostRouter)
app.use((req, res) => {
  res.status(404).json({error: 'Not Found'})
})

module.exports = app
