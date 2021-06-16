//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User') // should this be lowercase u?
const Product = require('./models/product')

//associations could go here!

module.exports = {
  db,
  models: {
    User,
    Product
  },
}
