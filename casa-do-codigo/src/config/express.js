require("marko/node-require.js").install();
require("marko/express");

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const methodOverride = require('method-override')

app.use("/estatico", express.static("./src/app/public"))

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method
      delete req.body._method
      return method
    }
}))

const routes = require("../app/routes/routes.js")
routes(app)

app.use((request, response, next) => {
  return response.status(404).marko(require("../app/views/base/errors/404.marko"))
})

app.use((erro, request, response, next) => {
  return response.status(500).marko(require("../app/views/base/errors/500.marko"))
})

module.exports = app;