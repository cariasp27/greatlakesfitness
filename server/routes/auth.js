const express = require('express')
const router = express.Router()
const db = require('../models/user')
var passport = require('passport');

router.post('/', (req, res) => {
    console.log('user signup');

    const { username, password } = req.body;
    // ADD VALIDATION
    db.findOne({where: { username: username }}), (err, user) => {
        if (err) {
            console.log('db.js post error: ', err)
        } else if (user) {
            return done(null, false, { message: 'That username is already taken' });
        }
        else {          
            let data =
            {
              username: username,
              password: password,
            };
            // create a new user in the database
            db.create(data).then(function (newUser, created) {
              if (!newUser) {
                return done(null, false);
              }
              if (newUser) {
                return done(null, newUser);
              }
            })
        }
    }
})

router.post(
    '/login',
    function (req, res, next) {
        console.log('routes/user.js, login, req.body: ');
        console.log(req.body)
        next()
    },

    // Right here is where i would do a second authentication using the trainer strategy
    // Reasearch this more in depth
    passport.authenticate('local-signin'),
    (req, res) => {
        console.log('logged in', req.user);
        var userInfo = {
            username: req.user.username
        };
        res.send(userInfo);
    }
)

router.get('/', (req, res, next) => {
    console.log('===== user!!======')
    console.log(req.user)
    if (req.user) {
        res.json({ user: req.user })
    } else {
        res.json({ user: null })
    }
})

router.post('/logout', (req, res) => {
    if (req.user) {
        req.logout()
        res.send({ msg: 'logging out' })
    } else {
        res.send({ msg: 'no user to log out' })
    }
})

module.exports = router