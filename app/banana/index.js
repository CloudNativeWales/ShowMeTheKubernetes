const express = require('express')
const app = express()
app.disable('view cache')
app.get('/*', (req, res) => res.send(`<html style="background-color:#ffe135 ">
  <head>
    <title>v1.0.0</title>
  </head>
  <body style="display:flex;align-items:center;justify-content:center;color:#000000;font-family:sans-serif;font-size:6rem;margin:0;letter-spacing:-0.1em">
    <h1>Banana</h1>
  </body>
</html>`))
app.listen(3000, () => {
  console.log(`Banana listening on port 3000!`)
})