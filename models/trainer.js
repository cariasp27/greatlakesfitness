module.exports = function (sequelize, Sequelize) {

	var Trainer = sequelize.define('trainer', {
		username: { type: Sequelize.TEXT },
		firstname: { type: Sequelize.TEXT },
		lastname: { type: Sequelize.TEXT },
		password: { type: Sequelize.STRING, allowNull: false },
		zipcode: { type: Sequelize.BIGINT(11) },
		isTrainer: { type: Sequelize.BOOLEAN }
	});

	return Trainer;

}