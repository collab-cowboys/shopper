const router = require('express').Router();
const Order = require('../db/models/order');
const User = require('../db/models/user');
const Transaction = require('../db/models/transaction');
const Product = require('../db/models/product');

//GET api/carts/:id

router.get('/:orderId', async (req, res, next) => {
  try {
    res.send(
      await Order.findByPk(req.params.orderId, {
        include: Transaction,
      })
    );
  } catch (error) {
    next(error);
  }
});

//POST /api/carts

router.post('/', async (req, res, next) => {
  try {
    const { newUser, transactions } = req.body;
    const newOrder = await Order.create();
    const { username, email, password } = newUser;
    await newOrder.assignNewUser(username, email, password);
    await newOrder.assignTransactions(transactions);
    res.status(201).send(newOrder);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
