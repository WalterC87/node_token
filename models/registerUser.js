var crypto = require('crypto');

module.exports = function(sequelize, DataTypes){
	var registerUser = sequelize.define('registerUser', {
		loginUser: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false
		},
		salt: {
			type: DataTypes.STRING,
			allowNull: true
		},
		hash: {
			type: DataTypes.STRING,
			allowNull: true
		},
		token: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: null
		}
	},{
		instanceMethods: {
			setPassword: function(password){
				var _salt = crypto.randomBytes(16).toString('hex');
				var _hash = crypto.pbkdf2Sync(password, _salt, 1000, 64).toString('hex');
				setDataValue('salt', _salt);
				setDataValue('hash', _hash);
			},
			validPassword: function(password){
				var userHash = getDataValue('hash');
				var userSalt = getDataValue('salt');
				var _hash = crypto.pbkdf2Sync(password, userSalt, 1000, 64).toString('hex');

				return userHash == _hash;
			}
		},
		freezeTableName: true,
		tableName: 'registeruser'
	})

	return registerUser;
}