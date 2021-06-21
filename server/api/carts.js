const router = require("express").Router();
const Transaction = require("../db/models/transaction");


router.get("/", async (req, res, next) => {
  try {
    res.send(await Transaction.findAll());
  } catch (error) {
    next(error);
  }
});
//GET api/carts/:id

router.get("/:orderId", async (req, res, next) => {
  try {
    console.log("req.params", req.params)
    res.send(await Transaction.findByPk(req.params.orderId));
  } catch (error) {
    next(error);
  }
});

//post a Cart

router.post("/", async (req, res, next) => {
  try {
    res.status(201).send(await Transaction.create(req.body));
  } catch (error) {
    next(err);
  }
});

module.exports = router;
