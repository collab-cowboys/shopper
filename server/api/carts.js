const router = require("express").Router();
const Transaction = require("../db/models/transaction");

//get api/carts

router.get("/", async (req, res, next) => {
  try {
    res.send(await Transaction.findAll());
  } catch (error) {
    next(error);
  }
});

module.exports = router;
