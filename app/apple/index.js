const express = require('express')
const app = express()
app.disable('view cache')
app.get('/*', (req, res) => res.send(`<html style="background-color:#8db600 ">
  <head>
    <title>v1.0.0</title>
  </head>
  <body style="display:flex;align-items:center;justify-content:center;color:#FFFFFF;font-family:sans-serif;font-size:6rem;margin:0;letter-spacing:-0.1em">
    <h1>Apple</h1>
  </body>
</html>`))
app.listen(3000, () => {
  console.log(`Apple listening on port 3000!`)
})