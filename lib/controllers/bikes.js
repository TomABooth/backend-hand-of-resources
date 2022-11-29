const { Router } = require('express');
const { Bike } = require('../models/bikes');

module.exports = Router().get('/', async (req, res) => {
  const bikes = await Bike.getAll();
  res.json(bikes);
});
