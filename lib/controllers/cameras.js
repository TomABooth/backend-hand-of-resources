const { Router } = require('express');
const { Camera } = require('../models/cameras');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const camera = await Camera.getById(req.params.id);
      if (!camera) next();
      res.json(camera);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res) => {
    const cameras = await Camera.getAll();
    res.json(cameras);
  });
