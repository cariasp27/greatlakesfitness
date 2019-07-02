const axios = require('axios');
const db = require('../models')
var Sequelize = require("sequelize");
var Op = Sequelize.Op;
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
                username: req.user.username,
                isTrainer: req.user.isTrainer
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

    app.get('/requests/:id', (req, res) => {
    let userid = req.params.id;
    let reqs = []
    db.request.findAll({where: {id: userid}})
    .then(function (result) {
        for(i=0; i<result.length; i++){
            reqs.push(result[i])
        }
        console.log("/requests/id = "+reqs)
        res.send({reqs})
    })
    })

    ////////////////////////////// ZIPCODE API //////////////////////////////////////////////////////////////////////////////////////////
    // front end sends GET request with user input here
    app.get('/search/:zipcode', (req, res) => {
        // user input & empty trainer array to send back
        let zip = req.params.zipcode;
        let trainers = [];
        // make GET request from the back end to avoid CORS (currently radius is set to 10mi but could allow user input)
        axios.get("https://www.zipcodeapi.com/rest/zUWic7V6ReO5UzHQKieekQU1hYlkpKa87kl8LaQk3AcxADnW5e8WuXshGZaOWgbT/radius.json/" + zip + "/10/miles?minimal").then(response => {
            // log the resulting array of zipcodes & assign to variable
            console.log(response.data.zip_codes);
            const zipcodes = response.data.zip_codes;
            // find all trainers where zipcode matches one in array
            db.trainer.findAll({ where: { zipcode: { [Op.in]: zipcodes} } })
                .then(function (result) {
                for(i=0; i<result.length; i++){
                    trainers.push(result[i])
                }
                // send the trainer array to the front end
                res.send({trainers})
            });
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