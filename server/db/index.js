//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/user');
const Product = require('./models/product');
const Order = require('./models/order');
const Transaction = require('./models/transaction');

//associations could go here!
Order.belongsTo(User);
User.hasMany(Order);

Product.belongsToMany(Order, { through: 'transactions' });
Order.belongsToMany(Product, { through: 'transactions' });

module.exports = {
  db,
  models: {
    User,
    Product,
    Order,
    Transaction,
  },
};
