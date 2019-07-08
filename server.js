// PACKAGES
const express  = require('express')
const passport = require('passport')
const morgan   = require('morgan')
const session  = require('express-session')
const models   = require('./models')
const app      = express()
const PORT     = process.env.PORT || 8080;
const cors = require('cors')

// MIDDLEWARE
app.use(cors());
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// SESSIONS
app.use(
  session({
    secret: 'rigudydee',
    resave: true,
    saveUninitialized: true
  })
)

// PASSPORT
app.use(passport.initialize())
app.use(passport.session())

// ROUTES
require('./routes/auth')(app, passport);

// PASSPORT & SEQUELIZE
require('./config/passport/passport.js')(passport, models);
// SYNC OPTIONS
var syncOptions = { force: true };
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}
// LAUNCH SERVER
models.sequelize.sync(syncOptions).then(function () {
  app.listen(PORT, function () {
    console.log("==> 🌎 Port: %s. Visit http://localhost:%s/",
      PORT,
      PORT
    );
  });
});