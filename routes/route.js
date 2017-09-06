var mongoClinet = require("../db/dbHelper.js");

exports.login = function(req, res) {


    var result = mongoClinet.login(res, req.body.username, req.body.password);
    console.log(result + "in route")

};

exports.register = function(req, res) {

    var result = mongoClinet.register(req.body.username, req.body.password);

    if (result) {

        res.send("sign up  successfull!");
    } else {
        res.render('signup.handlebars', { err: "Invalid user credentials!" })
    }

};