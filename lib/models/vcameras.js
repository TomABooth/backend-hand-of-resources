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
  static async insert(vcamera) {
    const { rows } = await pool.query(
      `
    INSERT INTO vcameras (brand, model, resolution)
    VALUES ($1, $2, $3)
    RETURNING * `,
      [vcamera.brand, vcamera.model, vcamera.resolution]
    );
    return new Vcamera(rows[0]);
  }
  static async updateById(id, newAttrs) {
    const vcamera = await Vcamera.getById(id);
    if (!vcamera) return null;
    const updatedData = { ...vcamera, ...newAttrs };

    const { rows } = await pool.query(
      `
        UPDATE vcameras
        SET brand = $2, model = $3, resolution = $4
        WHERE id = $1
        RETURNING *
        `,
      [id, updatedData.brand, updatedData.model, updatedData.resolution]
    );

    return new Vcamera(rows[0]);
  }
  static async delete(id) {
    const { rows } = await pool.query(
      `
    DELETE from vcameras
    WHERE id = $1
    RETURNING *
    `,
      [id]
    );
    if (!rows[0]) return null;
    return new Vcamera(rows[0]);
  }
}
module.exports = { Vcamera };
