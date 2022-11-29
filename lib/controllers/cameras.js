const { Router } = require('express');
const { Camera } = require('../models/cameras');

module.exports = Router().get('/', async (req, res) => {
  const cameras = await Camera.getAll();
  res.json(cameras);
});
