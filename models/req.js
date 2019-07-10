module.exports = function (sequelize, Sequelize) {

  var Request = sequelize.define('request', {
    time: { type: Sequelize.TEXT },
    date: { type: Sequelize.TEXT },
    accepted: { type: Sequelize.BOOLEAN },
  });
  // REQUESTS HAVE TWO FOREIGN KEYS
  Request.associate = function (models) {
    // ONE FOR THE ASSOCIATED USER
    Request.belongsTo(models.user, {
      foreignKey: {
        allowNull: false
      }
    });
    // ONE FOR THE ASSOCIATED TRAINER
    Request.belongsTo(models.trainer, {
      foreignKey: {
        allowNull: false
      }
    });
  }
  return Request;
}


