var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var models = require('../models');
var crypto = require('crypto');

function validPassword(password, user){	
	var hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64).toString('hex');
	return user.hash == hash;
}

passport.use(new LocalStrategy({
		usernameField: 'loginUser'
	},
	function (username, password, done){
		models.registerUser.findOne({
			where:{
				loginUser: username
			}			
		}).then(function (user, err){			
			if(err) { return done(err);}
			if(!user){
				return done(null, false, {
					message: 'El usuario proporcionado no existe'	
				})
			}			
			if(!validPassword(password,user)){
				return done(null, false, {
					message: 'Contraseña Incorrecta'
				})
			}
			return done(null, user);
		});
	}
));