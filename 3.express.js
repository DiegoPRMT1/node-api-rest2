const express = require('express')
const app = express()
const dittoJson = require('./ditto.js')

// vamos añadir esta linea por seguridad
app.disable('x-powered-by')
const PORT = process.env.PORT ?? 3000

// un middleware es una funcion que comprueba antes de ejecutar el resto del codigo
// app.use((req, res, next) => {
//   console.log('Esto es un middleware')
//   if (req.method !== 'POST') return next()
//   if (req.headers['content-type'] !== 'application/json') return next()
//   // Solo llega aqui los que o son POST o tienen un application/json
//   let body = ''

//   req.on('data', chunk => {
//     body += chunk.toString()
//   })
//   req.on('end', chunk => {
//     const data = JSON.parse(body)
//     data.timestamp = Date.now()
//     // mutamos la request y metemos la informacion en el req.body
//     req.body = data
//     next()
//   })
// })

// Lo de arriba es como se hace express por debajo el middleware
// ----------------------------------------------------------------

// Y esta es la manera de express que se usa en los proyectos
app.use(express.json())
// a diferencia de el routing normal aqui tenemos una api que le pasamos el get y
// indicamos el endpooint de nuesto proyecto
app.get('/', (req, res) => {
  res.send('<h1>Inicio</h1>')
})

app.get('/pokemon/ditto', (req, res) => {
  return res.json(dittoJson)
})

app.post('/pokemon', (req, res) => {
  // let body = '' // definimos body para meter los chunks
  // // un chunck es un buffer que recibe binarios
  // req.on('data', chunk => {
  //   // transformar los binarios en string
  //   body += chunk.toString()
  // })
  // req.on('end', chunk => {
  //   const data = JSON.parse(body)
  //   data.timestamp = Date.now()
  //   res.status(201).json(data)
  // })

  // esto lo tratamos en el middleware de arriba
  res.status(201).json(req.body)
})

app.use((req, res) => {
  res.status(400).send('<h1>404</h1>')
})
// si nos fijamos en el archivo de routing es lo mismo que el server.listen
app.listen(PORT, () => {
  console.log('tamos escuchando')
  console.log(`servidor escuchando en el puerto http://localhost:${PORT}`)
})
