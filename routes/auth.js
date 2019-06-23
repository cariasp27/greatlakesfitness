const db       = require('../models/index')
module.exports = function (app,passport){
//////////////////////////////////////////////////////////////
app.post('/user',
    function (req, res, next) {
    console.log("\n \n \n/////////////////////////////////////////////////////////////////////")
    console.log('routes/auth.js, signup, req.body: ');
    console.log(req.body)
    next()
},
passport.authenticate('local-signup'),
(req, res) => {
    console.log('submitting the following user for signup', req.user);
    var userInfo = {
        username: req.user.username
    };
    res.send(userInfo);
}
    );


app.post(
    '/user/login',
    function (req, res, next) {
        console.log("\n \n \n/////////////////////////////////////////////////////////////////////")
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

app.get('/user', (req, res, next) => {
    if (req.user) {
        console.log(req.user)
        res.json({ user: req.user })
    } else {
        console.log("\n No User Found \n")
    }
})

app.post('/user/logout', (req, res) => {
    if (req.user) {
        req.logout()
        res.send({ msg: 'logging out' })
    } else {
        res.send({ msg: 'no user to log out' })
    }
})
}