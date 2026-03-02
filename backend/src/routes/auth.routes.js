const express = require('express');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/env');

const router = express.Router();

router.post('/login', (req, res) => {
  const { email, role = 'user' } = req.body;
  if (!email) return res.status(400).json({ error: 'email required' });
  const token = jwt.sign({ sub: email, role }, jwtSecret, { expiresIn: '8h' });
  return res.json({ token });
});

module.exports = router;
