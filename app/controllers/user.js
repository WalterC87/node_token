var models = require('../../models');
var service = require('../../service/service');
var crypto = require('crypto');

exports.emailSignUp = function(req, res, next){
	models.registerUser.create({
		loginUser: req.body.loginUser.toLowerCase(),
		salt: crypto.randomBytes(16).toString('hex'),		
		token: Math.random().toString(32).substring(2)
	}).then(function (user){
		if(!user){
			res.status(500);
			res.json({
				type: false,
				data: "error: " + user
			});
		}else{
			user.update({
				hash: crypto.pbkdf2Sync(req.body.password, user.salt, 1000, 64).toString('hex')
			}).then(function(){
				res.status(200);
				res.json({
					type: true,
					data: user
				});
			})
			console.log(service.createToken(user));
			//res.send({token: service.createToken(user)});			
		}
	});
}

function validatePasswordUser(password, user){
	var hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64).toString('hex');
	return user.hash == hash;
}

exports.emailLogin = function(req, res, next){
	models.registerUser.findOne({
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
			if(validatePasswordUser(req.body.password, user)){
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
	})
}

exports.authPrivate = function(req, res, next){
	res.send("Hello World");
}