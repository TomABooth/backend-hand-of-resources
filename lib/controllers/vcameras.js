const { Router } = require('express');
const { Vcamera } = require('../models/vcameras');

module.exports = Router().get('/', async (req, res) => {
  const vcameras = await Vcamera.getAll();
  res.json(vcameras);
});
