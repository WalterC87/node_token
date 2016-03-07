module.exports = function(sequelize, DataTypes){
	var registerUser = sequelize.define('registerUser', {
		loginUser: {
			type: DataTypes.STRING,
			allowNull: false
		},
		salt: {
			type: DataTypes.STRING,
			allowNull: false
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
		freezeTableName: true,
		tableName: 'registeruser'
	})

	return registerUser;
}