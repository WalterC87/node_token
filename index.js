var restify = require('restify');
var fs = require('fs');
var middleware = require('./middleware');
var models = require('./models');

var controllers = [],
    controllers_path = process.cwd() + '/app/controllers';

fs.readdirSync(controllers_path).forEach(function (file){
	if(file.indexOf('.js') != -1){
		controllers[file.split('.')[0]] = require(controllers_path + '/' + file);
	}
});

var server = restify.createServer();
server.use(restify.fullResponse());
server.use(restify.CORS());
server.user(restify.bodyParser());

server.post('/auth/signup', controllers.user.emailSignUp);
server.post('/auth/login', controllers.user.emailLogin);
server.get('/private', middleware.ensureAuthenticated , controllers.user.authPrivate);


var port = process.env.PORT || 3000;

server.listen(port, function (err){
	if(err){
		console.error(err);
	}else{
		console.log('%s listening at %s', server.name, server.url);
	}
})