module.exports = function (sequelize, Sequelize) {

	var Trainer = sequelize.define('trainer', {
		username: { type: Sequelize.TEXT },
		password: { type: Sequelize.STRING, allowNull: false },
		zipcode: { type: Sequelize.TEXT},
        isTrainer: {type: Sequelize.BOOLEAN}
	});

	// Trainer.associate = function (models) {

	// 	Trainer.hasMany(models.req, {
	// 		foreignKey: {
	// 			allowNull: false
	// 		}
	// 	})
	// }

	return Trainer;

}