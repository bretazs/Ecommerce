'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Category, { foreignKey: 'category_id', as: 'category' });
      Product.hasMany(models.OrderProduct, { foreignKey: 'product_id', as: 'orderProducts' });
    }
  }
  Product.init({
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    preco: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    imagemUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantidadeEstoque: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};