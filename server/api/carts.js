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
    const { userId, transactions } = req.body;
    const newOrder = await Order.create();
    const userToAttach = await User.findByPk(userId);
    newOrder.setUser(userToAttach);
    Object.keys(transactions).forEach(async (transactionKey) => {
      const { product, quantity, totalPrice } = transactions[transactionKey];
      const fetchedProduct = await Product.findByPk(product.id);
      await newOrder.addProduct(fetchedProduct, {
        through: { quantity: quantity, totalPrice: totalPrice },
      });
    });
    res.status(201).send(newOrder);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
