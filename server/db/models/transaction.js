const Sequelize = require('sequelize');
const db = require('../db');
const axios = require('axios');
const Product = require('./product');

const Transaction = db.define('transaction', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    validate: {
      min: 0,
    },
  },
  totalPrice: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
});
module.exports = Transaction;

/**
 * instanceMethods
 */
// no instance methods for now, but we will add them here if we need any
/**

 * classMethods
 */

Transaction.findByOrderId = async function (orderId) {
  const transactionData = await this.findAll({
    where: {
      orderId: orderId,
    },
  });
  return transactionData;
};

Transaction.findByOrderIdAndProductId = async function (orderId, productId) {
  const transactionData = await this.findOne({
    where: {
      orderId: orderId,
      productId: productId,
    },
  });
  return transactionData;
};
