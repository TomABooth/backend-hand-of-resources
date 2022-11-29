const pool = require('../utils/pool');

class Bike {
  id;
  brand;
  model;
  style;

  constructor(row) {
    this.id = row.id;
    this.brand = row.brand;
    this.model = row.model;
    this.style = row.style;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * from bikes');
    return rows.map((bikeRow) => new Bike(bikeRow));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * from bikes where id = $1', [
      id,
    ]);
    if (!rows[0]) return null;
    return new Bike(rows[0]);
  }
}
module.exports = { Bike };
