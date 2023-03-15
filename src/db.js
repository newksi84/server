const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1',
  database: 'users'
});

module.exports = {
  executeQuery: async function(query, params) {
    const connection = await pool.getConnection();
    try {
      const [rows, fields] = await connection.execute(query, params);
      return rows;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      connection.release();
    }
  }
};
