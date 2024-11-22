'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, { foreignKey: 'user_id' })
      Order.hasMany(models.OrderProduct, { foreignKey: 'order_id', as: 'orderProducts' });

    }
  }
  Order.init({
    status: {
      type: DataTypes.ENUM('PENDENTE', 'PAGO', 'CANCELADO'),
      allowNull: false,
      defaultValue: 'PENDENTE',
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};