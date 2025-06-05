const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Practica = require('./Practica');

const Documento = sequelize.define('Documento', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  practicaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Practica,
      key: 'id'
    }
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3, 100]
    }
  },
  tipo: {
    type: DataTypes.ENUM('convenio', 'informe_inicial', 'informe_final', 'informe_mensual', 'otro'),
    allowNull: false
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isUrl: true
    }
  }
}, {
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

// Establecer la relación con Practica
Documento.belongsTo(Practica, { foreignKey: 'practicaId', as: 'practica' });
Practica.hasMany(Documento, { foreignKey: 'practicaId', as: 'documentos' });

module.exports = Documento; 