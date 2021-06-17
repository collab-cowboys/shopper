const Sequelize = require("sequelize");
const db = require("../db");
const axios = require("axios");

const Transaction = db.define("transaction", {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
  totalPrice: {
    type: Sequelize.INTEGER,
    allowNull: false,
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
// no class methods for now, but we will add them here if we need any
/**
 * hooks
 */
// no class methods for now, but we will add them here if we need any
