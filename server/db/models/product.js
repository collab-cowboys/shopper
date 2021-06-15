const Sequelize = require("sequelize");
const db = require("../db");
const axios = require("axios");

const Product = db.define("product", {
  // name, gender, age, skills, cost, imageUrl
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  gender: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  age: {
    type: Sequelize.INTEGER,
  },
  skills: {
    type: Sequelize.ARRAY,
    defaultValue: [],
  },
  cost: {
    type: Sequelize.INTEGER,
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      "https://static.vecteezy.com/system/resources/previews/001/196/554/large_2x/person-png.png",
  },
});

module.exports = Product;

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
