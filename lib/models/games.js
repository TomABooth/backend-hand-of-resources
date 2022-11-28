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
}
module.exports = { Game };
