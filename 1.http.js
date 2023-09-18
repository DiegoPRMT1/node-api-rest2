const http = require('node:http')

const desiredPort = process.env.PORT ?? 3000
// Req Request o peticion, Res o Response es la respuesta del servidor
const processRequest = (req, res) => {
  // res porque tu al servidor le pides la respuesta y te devuelve los headers de la pagina
  res.setHeader('Content-Type', 'text/html; charset=utf-8') // Meta tags
  // Si la url es la base devuelve un code 200 y te enseña el texto de end
  // req porque le estás pidiendo la peticion de acceder a /
  if (req.url === '/') {
    res.statusCode = 200
    res.end('Iniciooooo')
    // Si la url es contacto devuelve un code 200 y te enseña el texto de end
  } else if (req.url === '/contacto') {
    res.statusCode = 200
    res.end('Contacto')
  } else {
    res.end('404')
  }
}

const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
  console.log(`servidor escuchando en el puerto http://localhost:${desiredPort}`)
})
