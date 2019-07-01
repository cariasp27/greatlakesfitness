const axios = require('axios');
module.exports = function (app, passport) {


    ////////////////////////////// USER SIGN UP ////////////////////////////////////////////////////////////////////////////////
    app.post('/signup',
        function (req, res, next) {
            console.log("Incoming Signup Request... \n")
            console.log(req.body);
            console.log('\n PASSPORT USER REGISTRATION \n');
            console.log("\n /////////////////////////////////////////////////////////////////////")
            next()
        },
        // use passport to create new user
        passport.authenticate('local-signup'),
        (req, res) => {
            var userInfo = {
                username: req.user.username
            };
            console.log("New User created... \n")
            res.send(userInfo);
        }
    );


    ////////////////////////////// TRAINER SIGNUP //////////////////////////////////////////////////////////////////////
    app.post('/trainersignup',
        function (req, res, next) {
            console.log("Incoming Signup Request... \n");
            console.log(req.body);
            console.log('\n PASSPORT TRAINER REGISTRATION \n');
            console.log("\n /////////////////////////////////////////////////////////////////////")
            next()
        },
        // use passport to create new trainer
        passport.authenticate('local-trainer-signup'),
        (req, res) => {
            var trainerInfo = {
                username: req.user.username
            };
            console.log("New Trainer created... \n")
            res.send(trainerInfo);
        }
    );


    ////////////////////////////// TRAINER/USER LOGIN ////////////////////////////////////////////////////////////
    app.post(
        '/login',
        function (req, res, next) {
            console.log("Incoming Login Request... \n");
            console.log(req.body)
            console.log('\n PASSPORT LOGIN AUTHENTICATION \n');
            next()
        },
        // use passport to check both tables for a user/trainer
        passport.authenticate('local-login'),
        (req, res) => {
            var userInfo = {
                username: req.user.username
            };
            console.log("\n Login Successful... \n")
            res.send(userInfo);
        }
    );


    ////////////////////////////// USER CHECK //////////////////////////////////////////////////////////////////////////////////////////
    app.get('/user', (req, res, next) => {
        if (req.user) {
            res.json({ user: req.user })
        } else {
            console.log("\n No User Found \n")
            res.send({ msg: '\n No User Found \n' }
            )
        }
    });


    ////////////////////////////// ZIPCODE API //////////////////////////////////////////////////////////////////////////////////////////
    // front end sends GET request with user input here
    app.get('/search/:zipcode', (req, res) => {
        let zip = req.params.zipcode;
        // make GET request from the back end to avoid CORS (currently radius is set to 10mi but could allow user input)
        axios.get("https://www.zipcodeapi.com/rest/zUWic7V6ReO5UzHQKieekQU1hYlkpKa87kl8LaQk3AcxADnW5e8WuXshGZaOWgbT/radius.json/" + zip + "/10/miles?minimal").then(response => {
            // log the resulting array of zipcodes 
            console.log(response.data.zip_codes);
        })
    });

    
    ////////////////////////////// LOGOUT//////////////////////////////////////////////////////////////////////////////////////////
    app.post('/user/logout', (req, res) => {
        if (req.user) {
            req.logout()
            res.send({ msg: ' \n logging out ... \n' })
        } else {
            res.send({ msg: '\n no user to log out \n' })
        }
    })
}