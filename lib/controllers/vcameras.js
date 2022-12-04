const { Router } = require('express');
const { Vcamera } = require('../models/vcameras');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const vcamera = await Vcamera.getById(req.params.id);
      if (!vcamera) next();
      res.json(vcamera);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res) => {
    const vcameras = await Vcamera.getAll();
    res.json(vcameras);
  })
  .post('/', async (req, res, next) => {
    try {
      const vcamera = await Vcamera.insert(req.body);
      res.json(vcamera);
    } catch (e) {
      next(e);
    }
  });
