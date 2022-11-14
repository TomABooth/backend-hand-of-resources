const pool = require('../utils/pool');

class Dog {
  id;
  name;
  age;
  breed;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.age = row.age;
    this.breed = row.breed;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * from dogs');
    return rows.map((dogRow) => new Dog(dogRow));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * from dogs where id = $1', [id]);
    if (!rows[0]) return null;
    return new Dog(rows[0]);
  }
}
module.exports = { Dog };
