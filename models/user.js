module.exports = function(sequelize, DataTypes){
	var User = sequelize.define('user', {
		loginUser: {
			type: DataTypes.STRING,
			allowNull: false
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		},
		token: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: null
		}
	},{
		freezeTableName: true,
		tableName: 'user'
	})

	return User;
}