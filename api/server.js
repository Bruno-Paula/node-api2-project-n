const express = require('express')
const morgan = require('morgan')
const app = express()
const PostRouter = require('./posts/posts-router')

app.use(express.json())
app.use(morgan('tiny'))
app.use('/api/posts', PostRouter)
app.use((req, res) => {
  res.status(404).json({error: 'Not Found'})
})

module.exports = app
