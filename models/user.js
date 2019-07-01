module.exports = function (sequelize, Sequelize) {

	var User = sequelize.define('user', {
		username: { type: Sequelize.TEXT },
		password: { type: Sequelize.STRING, allowNull: false },

	});

	return User;

}