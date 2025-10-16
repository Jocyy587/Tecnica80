// db.js
import mysql from 'mysql2/promise';

const dbConfig = {
  host: '127.0.0.1', // Ej: 'localhost' o la IP de tu servidor MySQL
  user: 'root', 
  password: '',
  database: 'escuela' // El nombre de tu base de datos
};

async function getConnection() {
  const connection = await mysql.createConnection(dbConfig);
  return connection;
}

export default getConnection;