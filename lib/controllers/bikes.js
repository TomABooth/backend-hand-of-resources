const { Router } = require('express');
const { Bike } = require('../models/bikes');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const bike = await Bike.getById(req.params.id);
      if (!bike) next();
      res.json(bike);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res) => {
    const bikes = await Bike.getAll();
    res.json(bikes);
  })
  .post('/', async (req, res, next) => {
    try {
      const game = await Bike.insert(req.body);
      res.json(game);
    } catch (e) {
      next(e);
    }
  });
