var models = require('../../models');
var service = require('./service');

exports.emailSignUp = function(req, res, next){
	models.User.create({
		loginUser: req.body.loginUser.toLowerCase(),
		password: req.body.password,
		token: Math.random().toString(32).substring(2);
	}).then(function (user){
		if(!user){
			res.status(500);
			res.json({
				type: false,
				data: "error: " + user
			});
		}else{
			res.status(200);
			res.json({
				type: true,
				data: user
			});
			res.send({token: service.createToken(user)});
		}
	});
}

exports.emailLogin = function(req, res, next){
	models.User.findOne({
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
			res.status(200);
			res.json({
				type: true,
				data: user
			});
			res.send({token: service.createToken(user)});
		}
	})
}