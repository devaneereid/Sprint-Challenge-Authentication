const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../api/secrets.js');

const Users = require('./auth-model.js');

// POST - Register User
router.post('/register', (req, res) => {
  // implement registration
    let user = req.body;

      const rounds = process.env.HASH_ROUNDS || 8;
      const hash = bcrypt.hashSync(user.password, rounds);
      user.password = hash;

    Users.add(user)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(error => {
        res.status(500).json({ errorMessage: error.message });
      });
});

// POST - Login User
router.post('/login', (req, res) => {
  // implement login
  let { username, password } = req.body;

    Users.findBy({ username })
      .then(([user]) => {
          if (user && bcrypt.compareSync(password, user.password)) {
            const token = generateToken(user);

            res.status(200).json({ message: 'Welcome! You are logged in.', token });
          } else {
            res.status(401).json({ message: 'Please enter your login credentials' });
          }
      })
      .catch(error => {
        res.status(500).json({ errorMessage: error.Message });
      });
});

// TOKEN
function generateToken(user) {
    const payload = {
      userId: user.id,
      username: user.username,
    };

    const secret = secrets.jwtSecret;
    const options = {
      expiresIn: '1d'
    };

    return jwt.sign(payload, secret, options);
};

module.exports = router;
