const express  = require('express')
const passport = require('passport')
const morgan   = require('morgan')
const session  = require('express-session')
const models   = require('./models')
const app      = express()
const PORT     = 8080

// MIDDLEWARE
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Sessions
app.use(
  session({
    secret: 'rigudydee',
    resave: true,
    saveUninitialized: true
  })
)
// Passport
app.use(passport.initialize())
app.use(passport.session())
// Routes
require('./routes/auth')(app, passport);
// Passport & Sequelize
require('./config/passport/passport.js')(passport, models.user);

var syncOptions = { force: false };
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

models.sequelize.sync(syncOptions).then(function () {
  app.listen(PORT, function () {
    console.log("==> 🌎 Port: %s. Visit http://localhost:%s/",
      PORT,
      PORT
    );
  });
});