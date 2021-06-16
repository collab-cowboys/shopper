const router = require("express").Router();
const Product = require("../db/models/product");

router.get("/", async (req, res, next) => {
  try {
    res.send(await Product.findAll());
  } catch (error) {
    next(error);
  }
});

module.exports = router;
