'use strict';
module.exports = (sequelize, DataTypes) => {
  var Product = sequelize.define('Product', {
    id: DataTypes.INTEGER,
    productName: DataTypes.STRING,
    brand: DataTypes.STRING,
    price: DataTypes.NUMBER,
    productOptions: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Product;
};