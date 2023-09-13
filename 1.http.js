const http = require('node:http')

const desiredPort = process.env.PORT ?? 3000

const server = http.createServer((req, res) => {
  console.log('request recibida', req.url)
  res.end('Hola mundo')
})

server.listen(desiredPort, () => {
  console.log(`servidor escuchando en el puerto http://localhost:${desiredPort}`)
})
