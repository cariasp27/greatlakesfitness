const axios = require('axios');
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
//////////////////// trainer sign up//////////////////////////////////////////
app.post('/trainersignup',
    function (req, res, next) {
        console.log(req.body)
    console.log("\n /////////////////////////////////////////////////////////////////////")
    next()
},
passport.authenticate('local-trainer-signup'),
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
        res.send({msg: '\n No User Found \n'}
        )
    }
})
// front end sends GET request with user input here
app.get('/search/:zipcode', (req,res) => {
    let zip = req.params.zipcode;
    // make GET request from the back end to avoid CORS (currently radius is set to 10mi but could allow user input)
    axios.get("https://www.zipcodeapi.com/rest/zUWic7V6ReO5UzHQKieekQU1hYlkpKa87kl8LaQk3AcxADnW5e8WuXshGZaOWgbT/radius.json/" + zip +"/10/miles?minimal").then(response => {
    // log the resulting array of zipcodes 
    console.log(response.data.zip_codes);
    })
});

app.post('/user/logout', (req, res) => {
    if (req.user) {
        req.logout()
        res.send({ msg: ' \n logging out ... \n' })
    } else {
        res.send({ msg: '\n no user to log out \n' })
    }
})
}