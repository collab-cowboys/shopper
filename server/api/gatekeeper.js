const {
  models: { User },
} = require("../db");

const userKeeper = async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    if (!user) {
      const guestErr = new Error("User must be logged in to access");
      guestErr.status = 401;
      return next(guestErr);
    }
    return next();
  } catch (error) {
    next(error);
  }
};

const adminKeeper = async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    console.log("user", user);
    if (!user.isAdmin) {
      const userErr = new Error("User must have admin privileges");
      userErr.status = 403;
      return next(userErr);
    }
    return next();
  } catch (error) {
    next(error);
  }
};
module.exports = { userKeeper, adminKeeper };
