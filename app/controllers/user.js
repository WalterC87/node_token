var models = require('../../models');
var service = require('../../service/service');
var crypto = require('crypto');
var passport = require('passport');


var sendJSONresponse = function(res, status, content){
	res.status(status);
	res.json(content);
}

exports.emailSignUp = function(req, res, next){
	console.log(req.body);
	if(!req.body.loginUser || !req.body.password){
		sendJSONresponse(res, 400, {"message": "Todos los campos son requeridos"});
		return;
	}
	models.registerUser.create({
		loginUser: req.body.loginUser,
		salt: crypto.randomBytes(16).toString('hex')
	}).then(function (user){
		if(!user){
			sendJSONresponse(res, 500, {"type": false, "message": "error: " + user});
		}else{
			var _token = service.createToken(user);
			//user.setPassword(req.body.password);
			user.update({
			 	hash: crypto.pbkdf2Sync(req.body.password, user.salt, 1000, 64).toString('hex')
			}).then(function(){
				sendJSONresponse(res, 200, {"token": _token});
			})			
		}
	});
}

exports.emailLogin = function(req, res, next){
	if(!req.body.loginUser || !req.body.password){
		sendJSONresponse(res, 400, {"message": "Todos los campos son requeridos"});
		return;
	}
	passport.authenticate('local', function(err, user, info){
		var _token;
		if(err){
			sendJSONresponse(res,404,err);
			return;
		}
		if(user){
			_token = service.createToken(user);
			sendJSONresponse(res, 200, {"token": _token});
		}else{
			sendJSONresponse(res, 401, info);
		}
	})(req, res);
}

exports.authPrivate = function(req, res, next){
	sendJSONresponse(res, 200, {"message": "Hello World! you are Authenticated, congrats!!"})
}