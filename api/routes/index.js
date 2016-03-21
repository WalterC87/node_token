var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
	secret: process.env.JWT_SECRET,
	userProperty: 'payload'
})

var controllers = require('../../app/controllers/user');

router.post('/auth/signup', controllers.emailSignUp);
router.post('/auth/login', controllers.emailLogin);
router.get('/private', auth , controllers.authPrivate);

module.exports = router;