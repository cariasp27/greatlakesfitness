const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const session = require('express-session')
const models = require('./models') 
const passport = require('./config/passport/passport.js');
const app = express()
const PORT = 8080
// Route requires
const user = require('./routes/user')

// MIDDLEWARE
app.use(morgan('dev'))
app.use(
	bodyParser.urlencoded({
		extended: false
	})
)
// Parse application body as JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
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
app.use(passport.session()) // calls the deserializeUser

require('./config/passport/passport.js')(passport, models.user);

var syncOptions = { force: false };
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}



// Routes
app.use('/user', user)

models.sequelize.sync(syncOptions).then(function () {
    app.listen(PORT, function () {
      console.log("==> 🌎 Port: %s. Visit http://localhost:%s/",
        PORT,
        PORT
      );
    });
  });