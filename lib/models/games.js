const pool = require('../utils/pool');

class Game {
  id;
  name;
  console;
  genre;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.console = row.console;
    this.genre = row.genre;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * from games');
    return rows.map((gameRow) => new Game(gameRow));
  }
  static async getById(id) {
    const { rows } = await pool.query('SELECT * from games where id = $1', [
      id,
    ]);
    if (!rows[0]) return null;
    return new Game(rows[0]);
  }

  static async insert(game) {
    const { rows } = await pool.query(
      `
    INSERT INTO games (name, console, genre)
    VALUES ($1, $2, $3)
    RETURNING * `,
      [game.name, game.console, game.genre]
    );
    return new Game(rows[0]);
  }

  static async updateById(id, newAttrs) {
    const game = await Game.getById(id);
    if (!game) return null;
    const updatedData = { ...game, ...newAttrs };

    const { rows } = await pool.query(
      `
        UPDATE games
        SET name = $2, console = $3, genre = $4
        WHERE id = $1
        RETURNING *
        `,
      [id, updatedData.name, updatedData.console, updatedData.genre]
    );

    return new Game(rows[0]);
  }
}
module.exports = { Game };
