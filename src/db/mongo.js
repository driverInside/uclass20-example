const mongoose = require('mongoose')

const url = process.env.MONGO_DB_URL

mongoose.connect(url, () => {
  console.log('----------------------')
  console.log('Base de datos conectada con éxito')
  console.log('----------------------')
})
