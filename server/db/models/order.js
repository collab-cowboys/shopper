const Sequelize = require("sequelize");
const db = require("../db");
const axios = require("axios");

const Order = db.define("order", {
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
});
module.exports = Order;
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
