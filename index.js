var express = require('express');
var router = require('./routes/route.js');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/', function(req, res) {

    res.render('login.handlebars', {});
})
app.get('/signup', function(req, res) {

    res.render('signup.handlebars', {});
})

app.post('/login', router.login);
app.post('/register', router.register);

var port = process.env.PORT || 3000
app.listen(port, function() {
    console.log("Server is running at:" + port)
})