require('dotenv').config()
const app = require('./src/app')

// conexión con la base de datos
require('./src/db/mongo')

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server corriendo en el puerto ${port}`)
})
