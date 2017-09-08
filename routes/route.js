var mongoClinet = require("../db/dbHelper.js");


exports.login = function(req, res) {

    req.session.newuser = req.body.username;
    var result = mongoClinet.login(req, res, req.body.username, req.body.password);

};

exports.register = function(req, res) {

    var result = mongoClinet.register(req.body.username, req.body.password);
    req.session.newuser = req.body.username;

    if (result) {

        res.render('stories.handlebars', { username: req.session.newuser });
    } else {
        res.render('signup.handlebars', { err: "Invalid user credentials!" })
    }

};

exports.create = function(req, res) {
    var result = mongoClinet.savestory(req, res);
};

exports.sroties = function(req, res) {
    if (req.session.newuser) {
        mongoClinet.stories(req, res);
    } else {

        res.render('login.handlebars', {});
    }

};