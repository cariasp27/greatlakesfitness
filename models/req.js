module.exports = function (sequelize, Sequelize) {

	var Request = sequelize.define('request', {
        time: {type: Sequelize.TEXT},
        date: {type: Sequelize.DATEONLY},
        accepted: {type: Sequelize.BOOLEAN},
        });
        
        Request.associate = function(models) {
                // We're saying that a Post should belong to an Author
                // A Post can't be created without an Author due to the foreign key constraint
                Request.belongsTo(models.user, {
                  foreignKey: {
                    allowNull: false
                  }
                });
                Request.belongsTo(models.trainer, {
                foreignKey: {
                  allowNull: false
                }
        });
        }
        return Request;
}


