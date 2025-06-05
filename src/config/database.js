const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('ppp_system', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
  logging: false // Desactiva los logs SQL en consola
});

// Probar la conexión
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
};

testConnection();

module.exports = sequelize; 