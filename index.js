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
  console.log({ startNode, endNode })

  let html = ""
  for (let index = startNode + 1; index <= endNode; index++) {
    html += `<li id="item-${index}">Item: ${index}</li>`
  }
  res.send(html)

  // res.send(`<li id="item-${index}">Item: ${index}</li>`)
  // res.send(`
  //   <li id="item-1">Item: 1</li>
  //   <li id="item-2">Item: 2</li>
  //   <li id="item-3">Item: 3</li>
  //   <li id="item-4">Item: 4</li>
  //   <li id="item-5">Item: 5</li>
  //   <li id="item-6">Item: 6</li>
  //   <li id="item-7">Item: 7</li>
  //   <li id="item-8">Item: 8</li>
  //   <li id="item-9">Item: 9</li>
  //   <li id="item-10">Item: 10</li>
  //   <li id="item-11">Item: 11</li>
  //   <li id="item-12">Item: 12</li>
  //   <li id="item-13">Item: 13</li>
  //   <li id="item-14">Item: 14</li>
  //   <li id="item-15">Item: 15</li>
  //   <li id="item-16">Item: 16</li>
  //   <li id="item-17">Item: 17</li>
  //   <li id="item-18">Item: 18</li>
  //   <li id="item-19">Item: 19</li>
  //   <li id="item-20">Item: 20</li>`)
})

app.post('/item/:index', (req, res) => {
  let index = req.params.index
  res.send(`<li id="item-${index}">Item: ${index}</li>`)
})

app.listen(port, () => {
  console.log(`Example app listening on post ${port}`)
})
