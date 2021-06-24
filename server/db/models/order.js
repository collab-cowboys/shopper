const Sequelize = require('sequelize');
const db = require('../db');
const axios = require('axios');
const User = require('./user');
const Product = require('./product');

const Order = db.define('order', {
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
});
module.exports = Order;
/**
 * instanceMethods
 */
Order.prototype.assignNewUser = async function (username, email, password) {
  const urlPath = process.env.URL_PATH || 'http://localhost:8080';
  const { data } = await axios.post(urlPath + '/auth/signup', {
    username,
    email,
    password,
  });
  const { token } = data;
  const newUser = await User.findByToken(token);
  await this.setUser(newUser);
};

Order.prototype.assignTransactions = async function (transactionsObj) {
  Object.keys(transactionsObj).forEach(async (transactionKey) => {
    const { product, quantity, totalPrice } = transactionsObj[transactionKey];
    const fetchedProduct = await Product.findByPk(product.id);
    await this.addProduct(fetchedProduct, {
      through: { quantity: quantity, totalPrice: totalPrice },
    });
  });
};

Order.prototype.closeOrder = function () {
  return this.update({isActive: false})
}

/**
 * classMethods
 */

Order.locateActiveOrder =  async function (userId) {
  const orderData = await this.findOne({
    where : {
      isActive : true,
      userId : userId
    }
  })
  const activeOrder = orderData
    ? orderData
    : null;
  return activeOrder;
}

