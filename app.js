
var express = require('express'),
  app = express(),
  setupPassport = require('./app/setupPassport'),
  flash = require('connect-flash'),
  appRouter = require('./app/routers/appRouter.js')(express),
  session = require('express-session'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  jsonParser = bodyParser.json()

require('dotenv').config()

var port = process.env.PORT || 8000

app.use(cookieParser())
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }))
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});



app.use(flash())
app.use(function(req, res, next) {
  res.locals.errorMessage = req.flash('error')
  next()
});

app.use(jsonParser)

app.use(bodyParser.urlencoded({
  extended: true
}))

setupPassport(app)
app.use('/', appRouter)

// start app
app.listen(port, () => {

  console.log('Server started on port ' + port);
})

module.exports.getApp = app
