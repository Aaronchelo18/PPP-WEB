const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Practica = require('./Practica');

const Actividad = sequelize.define('Actividad', {
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
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      len: [10, 1000] // Mínimo 10 caracteres, máximo 1000
    }
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: true,
      async isWithinPracticaPeriod() {
        const practica = await this.getPractica();
        if (this.fecha < practica.fecha_inicio || 
            (practica.fecha_fin && this.fecha > practica.fecha_fin)) {
          throw new Error('La fecha debe estar dentro del período de la práctica');
        }
      }
    }
  },
  horas: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 24 // Máximo 24 horas por día
    }
  },
  estado: {
    type: DataTypes.ENUM('pendiente', 'completada', 'rechazada'),
    allowNull: false,
    defaultValue: 'pendiente'
  }
}, {
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  hooks: {
    afterCreate: async (actividad) => {
      if (actividad.estado === 'completada') {
        const practica = await actividad.getPractica();
        await practica.increment('horas_completadas', { by: actividad.horas });
      }
    },
    afterUpdate: async (actividad) => {
      if (actividad.changed('estado') || actividad.changed('horas')) {
        const practica = await actividad.getPractica();
        if (actividad.estado === 'completada') {
          await practica.increment('horas_completadas', { by: actividad.horas });
        } else if (actividad.previous('estado') === 'completada') {
          await practica.decrement('horas_completadas', { by: actividad.previous('horas') });
        }
      }
    }
  }
});

// Establecer la relación con Practica
Actividad.belongsTo(Practica, { foreignKey: 'practicaId', as: 'practica' });
Practica.hasMany(Actividad, { foreignKey: 'practicaId', as: 'actividades' });

module.exports = Actividad; 