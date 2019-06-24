module.exports = function (sequelize, Sequelize) {

	var Trainer = sequelize.define('trainer', {
		username: { type: Sequelize.TEXT },
        password: { type: Sequelize.STRING, allowNull: false },
        istrainer: {type: Sequelize.BOOLEAN},
        zipcode: { type: Sequelize.INTEGER}
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