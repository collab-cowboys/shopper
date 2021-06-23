const Sequelize = require("sequelize");
const db = require("../db");
const axios = require("axios");

const Transaction = db.define("transaction", {
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

Transaction.findByOrderIdAndProductId = async function (orderId, productId) {
  const transactionData = await this.findAll({
    where: {
      orderId: orderId,
      productId: productId,
    },
  });
  const foundTransaction = transactionData[0].dataValues;
  return foundTransaction;
};
