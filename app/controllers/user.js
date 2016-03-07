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
		// token: Math.random().toString(32).substring(2)
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
			//console.log(service.createToken(user));
			//res.send({token: service.createToken(user)});			
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
			sendJSONresponse(res, 200, {"data": user, "token": _token});
		}else{
			sendJSONresponse(res, 401, info);
		}
	})(req, res);

	/*models.registerUser.findOne({
		where: {
			loginUser: req.body.loginUser.toLowerCase()
		}
	}).then(function (user){
		if(!user){
			res.status(500);
			res.json({
				type: false,
				data: "error: " + user
			});
		}else{
			if(user.validPassword(req.body.password)){
				res.status(200);
				res.json({
					type: true,
					data: user
				});
				console.log(service.createToken(user));
			}else{
				res.json({
					type: false,
					data: "La contraseña no coincide para el usuario ingresado"
				})
			}
			// res.send({token: service.createToken(user)});
		}
	})*/
}

exports.authPrivate = function(req, res, next){
	res.send("Hello World");
}