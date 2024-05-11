const express = require('express')
// const bodyParser = require('body-parser')

const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded())
// app.use(bodyParser())

app.use(express.static('public'))

app.get('/', (_req, res) => {
  res.sendFile("public/index.html")
})

app.post('/items', (req, res) => {
  let startNode = parseInt(req.body.startNode)
  let endNode = parseInt(req.body.endNode)

  let html = ""
  for (let index = startNode + 1; index <= endNode; index++) {
    html += `<li class="list-group-item" data-user-id="${index}">Item: ${index}</li>`
  }
  res.send(html)
})

app.post('/item/:index', (req, res) => {
  let index = req.params.index
  res.send(`<li id="item-${index}">Item: ${index}</li>`)
})

app.listen(port, () => {
  console.log(`Example app listening on post ${port}`)
})
