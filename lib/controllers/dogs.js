const { Router } = require('express');
const { Dog } = require('../models/dogs');

module.exports = Router().get('/', async (req, res) => {
  const dogs = await Dog.getAll();
  res.json(dogs);
});
