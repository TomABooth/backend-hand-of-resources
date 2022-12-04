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
  static async getById(id) {
    const { rows } = await pool.query('SELECT * from cameras where id = $1', [
      id,
    ]);
    if (!rows[0]) return null;
    return new Camera(rows[0]);
  }
  static async insert(camera) {
    const { rows } = await pool.query(
      `
    INSERT INTO cameras (brand, model, megapixels)
    VALUES ($1, $2, $3)
    RETURNING * `,
      [camera.brand, camera.model, camera.megapixels]
    );
    return new Camera(rows[0]);
  }
  static async updateById(id, newAttrs) {
    const camera = await Camera.getById(id);
    if (!camera) return null;
    const updatedData = { ...camera, ...newAttrs };

    const { rows } = await pool.query(
      `
        UPDATE cameras
        SET brand = $2, model = $3, megapixels = $4
        WHERE id = $1
        RETURNING *
        `,
      [id, updatedData.brand, updatedData.model, updatedData.megapixels]
    );

    return new Camera(rows[0]);
  }
  static async delete(id) {
    const { rows } = await pool.query(
      `
    DELETE from cameras
    WHERE id = $1
    RETURNING *
    `,
      [id]
    );
    if (!rows[0]) return null;
    return new Camera(rows[0]);
  }
}
module.exports = { Camera };
