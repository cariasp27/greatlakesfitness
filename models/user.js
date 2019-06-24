
module.exports = function (sequelize, Sequelize) {

	var User = sequelize.define('user', {
		username: { type: Sequelize.TEXT },
		password: { type: Sequelize.STRING, allowNull: false },

	});
	
	// User.associate = function (models) {

	// 	User.hasMany(models.req, {
	// 		foreignKey: {
	// 			allowNull: false
	// 		}
	// 	})
	// }

	return User;

}