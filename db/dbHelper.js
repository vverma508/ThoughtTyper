var mongoCLient = require('mongodb').MongoClient;
var bcrypt = require('bcryptjs');
var SALT_NUMBER = 8;
//db connection URL
var dbUrl = "mongodb://vivek:Mind123@ds147872.mlab.com:47872/testdb508";
var database;
mongoCLient.connect(dbUrl, function(err, db) {

    if (err != null) {
        console.log("Error while connecting to DB. Error msg: " + err.message);
        db.close();

    } else {
        database = db;
        console.log("Database is online!");
    }

});

exports.register = function(username, password) {

    var TTUsers = database.collection("TTUsers");
    var saltCode = bcrypt.genSaltSync(SALT_NUMBER);
    var pwd = bcrypt.hashSync(password, saltCode);

    TTUsers.insertOne({ "username": username, "password": pwd });

    return true;
}

exports.login = function(req, res, username, password) {

    var TTUsers = database.collection("TTUsers");

    TTUsers.find({ "username": username }).toArray(function(err, items) {
        {

            if (items[0].username == username) {

                var result = bcrypt.compareSync(password, items[0].password);
                if (result) {
                    var TTSrories = database.collection("TTStroies");

                    TTSrories.find().sort({ createdon: -1 }).toArray(function(err, sitems) {
                        res.render('stories.handlebars', { username: req.session.newuser, stories: sitems });
                    });

                } else {
                    res.render('login.handlebars', { err: "Invalid user credentials!" })
                }

            } else {
                res.render('login.handlebars', { err: "Invalid user credentials!" })
            }
        }
    });

}

exports.savestory = function(req, res) {

    if (req.session.newuser) {

        var TTStories = database.collection("TTStroies");
        var d = new Date();
        TTStories.insertOne({ "Title": req.body.title, "story": req.body.content, "author": req.session.newuser, "createdon": d });
        var TTSrories = database.collection("TTStroies");

        TTSrories.find().sort({ createdon: -1 }).toArray(function(err, sitems) {
            res.render('stories.handlebars', { username: req.session.newuser, stories: sitems });
        });
    } else {
        res.render('login.handlebars', { err: "Login to continue!" })
    }

}