var express = require('express');
var router = require('./routes/route.js');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var session = require('express-session');
var app = express();


app.use(session({ secret: 'vivek', resave: true, saveUninitialized: false }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


app.get('/', function(req, res) {
    if (req.session.newuser) {
        res.render('stories.handlebars', { username: req.session.newuser });
    } else {

        res.render('login.handlebars', {});
    }
})

app.get('/logout', function(req, res) {
    req.session.destroy();
    res.render('login.handlebars', {});

})

app.get('/signup', function(req, res) {

    res.render('signup.handlebars', {});
})

app.post('/createstory', router.create)

app.post('/login', router.login);
app.post('/register', router.register);

var port = process.env.PORT || 3000
app.listen(port, function() {
    console.log("Server is running at:" + port)
})