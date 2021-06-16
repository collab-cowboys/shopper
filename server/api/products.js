const router = require("express").Router();
const Product = require("../db/models/product");

// GET /api/products

router.get("/", async (req, res, next) => {
  try {
    res.send(await Product.findAll());
  } catch (error) {
    next(error);
  }
});

// GET /api/products/:id

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.json(product);
  } catch (error) {
    next(error);
  }
})

module.exports = router;
