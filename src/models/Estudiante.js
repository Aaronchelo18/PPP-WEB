const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario');

const Estudiante = sequelize.define('Estudiante', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    references: {
      model: Usuario,
      key: 'id'
    }
  },
  codigo: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      len: [8, 8] // Código de estudiante de 8 caracteres
    }
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [2, 50]
    }
  },
  apellidos: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [2, 50]
    }
  },
  carrera: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ciclo: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 10
    }
  }
}, {
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

// Establecer la relación con Usuario
Estudiante.belongsTo(Usuario, { foreignKey: 'usuarioId', as: 'usuario' });
Usuario.hasOne(Estudiante, { foreignKey: 'usuarioId', as: 'estudiante' });

module.exports = Estudiante; 