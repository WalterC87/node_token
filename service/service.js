var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('../config/config.json');

exports.createToken = function(user){
	var payload = {
		sub: user.id,
		iat: moment().unix(),
		exp: moment().add(1,"days").unix(),
	};

	return jwt.encode(payload, process.env.JWT_SECRET);
}

