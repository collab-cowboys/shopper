const router = require("express").Router();
const {
  models: { User },
} = require("../db");
module.exports = router;

const gateKeeper = async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    if (!user) {
      const guestErr = new Error("User must be logged in to access");
      guestErr.status = 401;
      return next(guestErr);
    } else if (!user.isAdmin) {
      const userErr = new Error("User must have admin privileges");
      userErr.status = 403;
      return next(userErr);
    }
    return next();
  } catch (error) {
    next(error);
  }
};

router.get("/", gateKeeper, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});
