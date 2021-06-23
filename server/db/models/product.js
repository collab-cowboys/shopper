const Sequelize = require('sequelize');
const db = require('../db');
const axios = require('axios');

const Product = db.define('product', {
  // name, gender, age, skills, cost, imageUrl
  name: {
    type: Sequelize.STRING,
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
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: [],
  },
  cost: {
    type: Sequelize.INTEGER,
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      "https://robohash.org/name.png",
  },
  inStock: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    validate: {
      min: 0,
    },
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
