const pool = require('../utils/pool');

class Camera {
  id;
  brand;
  model;
  megapixels;

  constructor(row) {
    this.id = row.id;
    this.brand = row.brand;
    this.model = row.model;
    this.megapixels = row.megapixels;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * from cameras');
    return rows.map((cameraRow) => new Camera(cameraRow));
  }
}
module.exports = { Camera };
