const Sequelize = require("sequelize");
const db = require("../db");
const axios = require("axios");

const Cart = db.define("cart", {
  items: {
    type: Sequelize.ARRAY,
    defaultValue: [],
  },
});
module.exports = Cart;
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
