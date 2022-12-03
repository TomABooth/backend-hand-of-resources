const pool = require('../utils/pool');

class Vcamera {
  id;
  brand;
  model;
  megapixels;

  constructor(row) {
    this.id = row.id;
    this.brand = row.brand;
    this.model = row.model;
    this.resolution = row.resolution;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * from video cameras');
    return rows.map((vcameraRow) => new Vcamera(vcameraRow));
  }
}
module.exports = { Vcamera };
