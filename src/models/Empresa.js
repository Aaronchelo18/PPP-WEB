const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario');

const Empresa = sequelize.define('Empresa', {
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
  ruc: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      len: [11, 11], // RUC peruano tiene 11 dígitos
      isNumeric: true
    }
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3, 100]
    }
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [5, 200]
    }
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [9, 9], // Teléfono peruano tiene 9 dígitos
      isNumeric: true
    }
  }
}, {
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

// Establecer la relación con Usuario
Empresa.belongsTo(Usuario, { foreignKey: 'usuarioId', as: 'usuario' });
Usuario.hasOne(Empresa, { foreignKey: 'usuarioId', as: 'empresa' });

module.exports = Empresa; 