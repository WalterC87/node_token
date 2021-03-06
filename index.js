require('dotenv').load();

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var passport = require('passport');
var models = require('./models');

var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
	secret: process.env.JWT_SECRET,
	userProperty: 'payload'
})

var controllers = require('../../app/controllers/user');

require('./config/passport');

// var routesApi = require('./api/routes/index');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

router.post('/auth/signup', controllers.emailSignUp);
router.post('/auth/login', controllers.emailLogin);
router.get('/private', auth , controllers.authPrivate);

app.use(passport.initialize());

models.sequelize.sync();

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});