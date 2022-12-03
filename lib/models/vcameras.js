const pool = require('../utils/pool');

class Vcamera {
  id;
  brand;
  model;
  resolution;

  constructor(row) {
    this.id = row.id;
    this.brand = row.brand;
    this.model = row.model;
    this.resolution = row.resolution;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * from vcameras');
    return rows.map((vcameraRow) => new Vcamera(vcameraRow));
  }
  static async getById(id) {
    const { rows } = await pool.query('SELECT * from vcameras where id = $1', [
      id,
    ]);
    if (!rows[0]) return null;
    return new Vcamera(rows[0]);
  }
}
module.exports = { Vcamera };
