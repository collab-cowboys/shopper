const router = require("express").Router();
const Order = require("../db/models/order");
const User = require("../db/models/user");
const Transaction = require("../db/models/transaction");
const Product = require("../db/models/product");

//GET api/carts/user/:userId

router.get("/user/:userId", async (req, res, next) => {
  try {
    res.send(await Order.locateActiveOrder(req.params.userId));
  } catch (error) {
    next(error);
  }
});

// GET api/carts/products?orderId=number

router.get("/products", async (req, res, next) => {
  try {
    const orderId = parseInt(req.query.orderId, 10);
    const order = await Order.findByPk(orderId);

    res.send(await order.getProducts());
  } catch (error) {
    next(error);
  }
});

//POST /api/carts

router.post("/", async (req, res, next) => {
  try {
    const { userId } = req.body;
    const newOrder = await Order.create();
    const user = await User.findByPk(userId);
    await newOrder.setUser(user);
    res.status(201).send(newOrder);
  } catch (error) {
    next(error);
  }
});

//POST /api/carts/user/:userId

router.post("/user/:userId", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const order = await Order.locateActiveOrder(userId);
    const { product, quantity } = req.body;
    const fetchedProduct = await Product.findByPk(product.id);
    await order.addProduct(fetchedProduct, {
      through: {
        quantity: quantity,
        totalPrice: quantity * product.cost,
      },
    });

    res.status(201).send(order);
  } catch (error) {
    next(error);
  }
});

//PUT /api/carts/:id

router.put("/:orderId", async (req, res, next) => {
  try {
    const { product, quantity } = req.body;
    if (req.query.close === "true") {
      const order = await Order.findByPk(req.params.orderId);
      await order.closeOrder();
      return res.sendStatus(201);
    } else {
      const transaction = await Transaction.findByOrderIdAndProductId(
        req.params.orderId,
        product.id
      );
      if (transaction) {
        const priceAdjust = quantity * product.cost;
        const tPrice = transaction.quantity * product.cost
        await transaction.update({
          quantity: transaction.quantity + quantity,
          totalPrice: tPrice + priceAdjust,
        });
        res.send(transaction).status(201);
      }
    }
  } catch (err) {
    next(err);
  }
});

//DELETE /api/carts/:id?productId=${id}

router.delete("/:orderId", async (req, res, next) => {
  try {
    const transaction = await Transaction.findByOrderIdAndProductId(
      req.params.orderId,
      req.query.productId
    );
    if (transaction) {
      await transaction.destroy();
      res.sendStatus(204);
      return;
    }
    throw "No Transaction with such paramaters!!!";
  } catch (err) {
    next(err);
  }
});

module.exports = router;
