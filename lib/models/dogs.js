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

  static async insert(dog) {
    const { rows } = await pool.query(
      `
    INSERT INTO dogs (name, age, breed)
    VALUES ($1, $2, $3)
    RETURNING * `,
      [dog.name, dog.age, dog.breed]
    );
    return new Dog(rows[0]);
  }

  static async updateById(id, newAttrs) {
    const dog = await Dog.getById(id);
    if (!dog) return null;
    const updatedData = { ...dog, ...newAttrs };

    const { rows } = await pool.query(
      `
        UPDATE dogs
        SET name = $2, age = $3, breed = $4
        WHERE id = $1
        RETURNING *
        `,
      [id, updatedData.name, updatedData.age, updatedData.breed]
    );

    return new Dog(rows[0]);
  }
  static async delete(id) {
    const { rows } = await pool.query(
      `
    DELETE from dogs
    WHERE id = $1
    RETURNING *
    `,
      [id]
    );
    if (!rows[0]) return null;
    return new Dog(rows[0]);
  }
}

module.exports = { Dog };
