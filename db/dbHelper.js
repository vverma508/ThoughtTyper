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

exports.login = function(res, username, password) {

    var TTUsers = database.collection("TTUsers");

    TTUsers.find({ "username": username }).toArray(function(err, items) {
        {

            if (items[0].username == username) {

                var result = bcrypt.compareSync(password, items[0].password);
                if (result) {

                    res.send("Login successfull!");
                } else {
                    res.render('login.handlebars', { err: "Invalid user credentials!" })
                }

            } else {
                res.render('login.handlebars', { err: "Invalid user credentials!" })
            }
        }
    });

}