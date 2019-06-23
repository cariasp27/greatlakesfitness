module.exports = function (app,passport){
//////////////////// sign up //////////////////////////////////////////
app.post('/signup',
    function (req, res, next) {
    console.log("\n /////////////////////////////////////////////////////////////////////")
    next()
},
passport.authenticate('local-signup'),
(req, res) => {
    var userInfo = {
        username: req.user.username
    };
    res.send(userInfo);
}
    );


app.post(
    '/login',
    function (req, res, next) {
        console.log("\n/////////////////////////////////////////////////////////////////////")
        console.log('\n PASSPORT LOGIN AUTHENTICATION \n');
        next()
    },

    // Right here is where i would do a second authentication using the trainer strategy
    // Reasearch this more in depth
    passport.authenticate('local-login'),
    (req, res) => {
        var userInfo = {
            username: req.user.username
        };
        res.send(userInfo);
    }
)

app.get('/user', (req, res, next) => {
    if (req.user) {
        res.json({ user: req.user })
    } else {
        console.log("\n No User Found \n")
        res.send({msg: 'THERE WAS NO USER TO GET'}
        )
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