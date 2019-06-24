
module.exports = function (sequelize, Sequelize) {

	var Request = sequelize.define('request', {
        time: {type: Sequelize.TEXT},
        date: {type: Sequelize.DATEONLY},
        accepted: {type: Sequelize.BOOLEAN}
	});

	return Request;

}