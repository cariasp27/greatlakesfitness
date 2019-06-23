var bCrypt = require('bcrypt-nodejs');
module.exports = function (passport, user) {

  var User = user;
  var LocalStrategy = require('passport-local').Strategy;

  // used to serialize user
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function (id, done) {
    User.findOne({ where: { id: id } }).then(function (user) {
      if (user) {
        done(null, user.get());
      }
      else {
        done(user.errors, null);
      }
    });
  });
  // LOCAL SIGNUP
  passport.use('local-signup', new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true
    },
    function (req, username, password, done) {
      // encrypts password
      var generateHash = function (password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
      };
      // checks database to see if the username is already taken
      User.findOne({ where: { username: username } }).then(function (user) {
        // if username is taken..
        if (user) {
          return done(null, false, { message: 'That username is already taken' });
        }
        // if the username is available, encrypt password and create sequelize object for new user
        else {
          var userPassword = generateHash(password);
          var data =
          {
            username: username,
            password: userPassword,
          };
          // create a new user in the database
          User.create(data).then(function (newUser, created) {
            if (!newUser) {
              return done(null, false);
            }
            if (newUser) {
              return done(null, newUser);
            }
          });
        }
      });
    }
  ));
  //LOCAL SIGNIN
  passport.use('local-signin', new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true
    },
    function (req, username, password, done) {
      var User = user;
      // checks the database for matching passwords
      var isValidPassword = function (userpass, password) {
        return bCrypt.compareSync(password, userpass);
      }
      // search database for existing user
      User.findOne({ where: { username: username } }).then(function (user) {
        if (!user) {
          return done(null, false, { message: 'username does not exist' });
        }
        if (!isValidPassword(user.password, password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        var userinfo = user.get();
        console.log(userinfo);
        return done(null, userinfo);
      
      }).catch(function (err) {
        console.log("Error:", err);
        return done(null, false, { message: 'Something went wrong with your Signin' });
      });
    }
  ));
}

