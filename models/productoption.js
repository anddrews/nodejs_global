'use strict';
module.exports = (sequelize, DataTypes) => {
  var ProductOption = sequelize.define('ProductOption', {
    id: DataTypes.INTEGER,
    color: DataTypes.STRING,
    productSize: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return ProductOption;
};