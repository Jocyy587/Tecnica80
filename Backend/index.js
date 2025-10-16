// index.js
import express from 'express';
import getConnection from './db.js'; 
import cors from 'cors'; // Importar cors
const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json()); 

app.get('/usuarios', async (req, res) => {
  let connection;
  try {
    connection = await getConnection();
    const sqlQuery = 'SELECT id, Gmail, TipoUsuario FROM Usuarios';
    const [rows] = await connection.execute(sqlQuery);

    res.json({
        mensaje: "Usuarios obtenidos exitosamente",
        data: rows
    });

  } catch (error) {
    console.error('Error al obtener usuarios:', error.message);
    res.status(500).json({ 
        mensaje: "Error interno del servidor",
        error: error.message 
    });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
});

app.listen(PORT, () => {
  console.log(`\nServidor Express iniciado en: http://localhost:${PORT}`);
});