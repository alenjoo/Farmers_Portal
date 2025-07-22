
import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: 'localhost',
  user: 'your_user',
  password: 'your_password',
  database: 'your_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default db;
