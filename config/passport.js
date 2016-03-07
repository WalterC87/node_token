var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var models = require('../models');

passport.use(new LocalStrategy({
		usernameField: 'loginUser'
	},
	function (username, password, done){
		models.registerUser.findOne({
			loginUser: username
		}).then(function (err, user){
			if(err) { return done(err);}
			if(!user){
				return done(null, false, {
					message: 'El usuario proporcionado no existe'	
				})
			}
			if(!user.validPassword(password)){
				return done(null, false, {
					message: 'Contraseña Incorrecta'
				})
			}
			return done(null, user);
		});
	}
));