const http = require('node:http')

const dittoJson = require('./ditto.js')

const processRequest = (req, res) => {
  const { method, url } = req

  switch (method) {
    case 'GET':
      switch (url) {
        case '/pokemon/ditto':
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          return res.end(JSON.stringify(dittoJson))
        default:
          res.statusCode = 400
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          return res.end('<h1>404</h1>')
      }
    case 'POST':
      switch (url) {
        case '/pokemon': {
          let body = '' // definimos body para meter los chunks
          // un chunck es un buffer que recibe binarios
          req.on('data', chunk => {
            // transformar los binarios en string
            body += chunk.toString()
          })
          // De esta manera nodeJS se asegura de que han llegado todos los chunks
          req.on('end', chunk => {
            // LLamar a una base de datos para guardar la info
            // creamos una constante para meter el body parseado
            const data = JSON.parse(body)
            res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' })
            // pasamos a string el data
            res.end(JSON.stringify(data))
          })
          break
        }
        case '/otro': {
          let body = ''
          break
        }
        default:
          res.statusCode = 400
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          return res.end('<h1>404</h1>')
      }
  }
}

const server = http.createServer(processRequest)

server.listen(3000, () => {
  console.log('tamos escuchando')
})
