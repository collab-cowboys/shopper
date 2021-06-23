const router = require('express').Router();
const {
  models: { User },
} = require('../db');
module.exports = router;

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });
    res.send({
      token: await User.authenticate(req.body),
      userId: user.id,
    });
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    //destructure necessary info from request to prevent injection attacks
    const { username, email, password } = req.body;
    const user = await User.create({ username, email, password });
    res.send({ token: await user.generateToken(), userId: user.id });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.get('/me', async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});
