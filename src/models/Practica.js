const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Estudiante = require('./Estudiante');
const Empresa = require('./Empresa');

const Practica = sequelize.define('Practica', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  estudianteId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Estudiante,
      key: 'id'
    }
  },
  empresaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Empresa,
      key: 'id'
    }
  },
  fecha_inicio: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: true,
      isAfter: new Date().toISOString() // La fecha debe ser posterior a hoy
    }
  },
  fecha_fin: {
    type: DataTypes.DATE,
    allowNull: true,
    validate: {
      isDate: true,
      isAfterFechaInicio(value) {
        if (value && value <= this.fecha_inicio) {
          throw new Error('La fecha de fin debe ser posterior a la fecha de inicio');
        }
      }
    }
  },
  horas_requeridas: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 1000
    }
  },
  horas_completadas: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  estado: {
    type: DataTypes.ENUM('pendiente', 'en_curso', 'completada', 'cancelada'),
    allowNull: false,
    defaultValue: 'pendiente'
  }
}, {
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

// Establecer las relaciones
Practica.belongsTo(Estudiante, { foreignKey: 'estudianteId', as: 'estudiante' });
Practica.belongsTo(Empresa, { foreignKey: 'empresaId', as: 'empresa' });
Estudiante.hasMany(Practica, { foreignKey: 'estudianteId', as: 'practicas' });
Empresa.hasMany(Practica, { foreignKey: 'empresaId', as: 'practicas' });

module.exports = Practica; 