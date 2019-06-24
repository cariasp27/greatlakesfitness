
module.exports = function (sequelize, Sequelize) {

	var Request = sequelize.define('request', {
        time: {type: Sequelize.TEXT},
        date: {type: Sequelize.DATEONLY},
        accepted: {type: Sequelize.BOOLEAN},
        t_id: { type: Sequelize.INTEGER,
                references: {
                model: Trainer,
                key: 'id'
        }
},
        c_id: { type: Sequelize.INTEGER,
                references: {
                model: Trainer,
                key: 'id'
        }
},
	});

	return Request;

}