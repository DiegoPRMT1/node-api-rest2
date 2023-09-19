const express = require('express')

const PORT = process.env.PORT ?? 3000

const app = express()
app.disable('x-powered-by')

app.get('/', (req, res) => {
  res.json('Hola mundo')
})

app.listen(PORT, () => {
  console.log('tamos escuchando')
  console.log(`servidor escuchando en el puerto http://localhost:${PORT}`)
})
