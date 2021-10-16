const express = require('express')
const app = express()
const apiRouter = require('./api')

app.use(express.json())
app.use('/api/v1', apiRouter)

app.use('/', (req, res) => {
  res.send({ message: 'hola clase' })
})


module.exports = app

