require('dotenv').load();
var restify = require('restify');
var fs = require('fs');
var passport = require('passport');
var jwt = require('restify-jwt');
var auth = jwt({
	secret: process.env.JWT_SECRET,
	requestProperty: 'payload'
})
var models = require('./models');
var controllers = {},
	controllers_path = process.cwd() + '/app/controllers';

fs.readdirSync(controllers_path).forEach(function (file){
	if(file.indexOf('.js') != -1){
		controllers[file.split('.')[0]] = require(controllers_path + '/' + file)
	}
})
require('./config/passport');

var server = restify.createServer();
server.use(restify.fullResponse());

/*restify.CORS.ALLOW_HEADERS.push('accept');
restify.CORS.ALLOW_HEADERS.push('sid');
restify.CORS.ALLOW_HEADERS.push('lang');
restify.CORS.ALLOW_HEADERS.push('origin');
restify.CORS.ALLOW_HEADERS.push('withcredentials');
restify.CORS.ALLOW_HEADERS.push('x-requested-with');*/
//server.use(restify.CORS());
server.use(
	function crossOrigin(req, res, next){
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "X-Requested-With");
		return next();
	}
)
server.use(restify.urlEncodedBodyParser({ mapParams : false }));
server.use(passport.initialize());
server.use(function (err, req, res, next){
	if(err.name === 'UnauthorizedError'){
		res.status(401);
		res.json({
			"message": err.name + ": " + err.message
		})
	}
})

server.post('/auth/signup', controllers.user.emailSignUp);
server.post('/auth/login', controllers.user.emailLogin);
server.get('/private', auth , controllers.user.authPrivate);

models.sequelize.sync();

var port = process.env.PORT || 3000;

server.listen(port, function (err){
	if(err){
		console.error(err);
	}else{
		console.log('%s listening at %s', server.name, server.url);
	}
})