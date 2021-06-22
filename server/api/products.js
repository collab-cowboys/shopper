const router = require("express").Router();
const Product = require("../db/models/product");
const { adminKeeper } = require("./gatekeeper");

// GET /api/products

router.get("/", async (req, res, next) => {
  try {
    res.send(
      await Product.findAll({
        order: [["id", "ASC"]],
      })
    );
  } catch (error) {
    next(error);
  }
});

// GET /api/products/:id

router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", adminKeeper, async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    await product.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

//POST /api/products/
router.post("/", adminKeeper, async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).send(newProduct);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
