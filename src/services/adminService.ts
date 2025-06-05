import type { Estudiante, Empresa, Practica, Actividad, EstadisticasDashboard } from '../types/admin';

// Datos de ejemplo
const estudiantes: Estudiante[] = [
    {
        id: 1,
        nombre: 'Ana',
        apellidos: 'García López',
        email: 'ana.garcia@estudiante.edu.pe',
        carrera: 'Ingeniería de Software',
        ciclo: 8,
        estado: 'activo'
    },
    {
        id: 2,
        nombre: 'Carlos',
        apellidos: 'Mendoza Ruiz',
        email: 'carlos.mendoza@estudiante.edu.pe',
        carrera: 'Ingeniería de Sistemas',
        ciclo: 7,
        estado: 'activo'
    }
];

const empresas: Empresa[] = [
    {
        id: 1,
        nombre: 'Tech Solutions SAC',
        ruc: '20123456789',
        direccion: 'Av. La Marina 123',
        sector: 'Tecnología',
        estado: 'activa',
        contacto: {
            nombre: 'Juan Pérez',
            email: 'juan.perez@techsolutions.com',
            telefono: '987654321'
        }
    },
    {
        id: 2,
        nombre: 'Global Corp EIRL',
        ruc: '20987654321',
        direccion: 'Jr. Huallaga 456',
        sector: 'Consultoría',
        estado: 'activa',
        contacto: {
            nombre: 'María Torres',
            email: 'maria.torres@globalcorp.com',
            telefono: '987123456'
        }
    }
];

const practicas: Practica[] = [
    {
        id: 1,
        estudiante_id: 1,
        empresa_id: 1,
        fecha_inicio: '2024-03-01',
        fecha_fin: '2024-08-31',
        estado: 'en_curso',
        horas_completadas: 120,
        area: 'Desarrollo Web',
        supervisor: 'Pedro Gómez'
    },
    {
        id: 2,
        estudiante_id: 2,
        empresa_id: 2,
        fecha_inicio: '2024-03-15',
        fecha_fin: '2024-09-15',
        estado: 'en_curso',
        horas_completadas: 80,
        area: 'Gestión de Proyectos',
        supervisor: 'Ana Sánchez'
    }
];

const actividades: Actividad[] = [
    {
        id: 1,
        tipo: 'revision',
        descripcion: 'Revisar informe mensual de Ana García',
        fecha: '2024-03-25',
        prioridad: 'alta',
        estado: 'pendiente',
        relacionado_id: 1
    },
    {
        id: 2,
        tipo: 'aprobacion',
        descripcion: 'Aprobar convenio con nueva empresa',
        fecha: '2024-03-26',
        prioridad: 'media',
        estado: 'pendiente'
    }
];

// Servicios simulados
export const adminService = {
    // Estudiantes
    getEstudiantes: async (): Promise<Estudiante[]> => {
        return estudiantes;
    },

    getEstudiantePorId: async (id: number): Promise<Estudiante | undefined> => {
        return estudiantes.find(e => e.id === id);
    },

    // Empresas
    getEmpresas: async (): Promise<Empresa[]> => {
        return empresas;
    },

    getEmpresaPorId: async (id: number): Promise<Empresa | undefined> => {
        return empresas.find(e => e.id === id);
    },

    // Prácticas
    getPracticas: async (): Promise<Practica[]> => {
        return practicas;
    },

    getPracticaPorId: async (id: number): Promise<Practica | undefined> => {
        return practicas.find(p => p.id === id);
    },

    getPracticasPorEstudiante: async (estudiante_id: number): Promise<Practica[]> => {
        return practicas.filter(p => p.estudiante_id === estudiante_id);
    },

    getPracticasPorEmpresa: async (empresa_id: number): Promise<Practica[]> => {
        return practicas.filter(p => p.empresa_id === empresa_id);
    },

    // Actividades
    getActividades: async (): Promise<Actividad[]> => {
        return actividades;
    },

    getActividadesPendientes: async (): Promise<Actividad[]> => {
        return actividades.filter(a => a.estado === 'pendiente');
    },

    // Dashboard
    getEstadisticas: async (): Promise<EstadisticasDashboard> => {
        return {
            estudiantes_activos: estudiantes.filter(e => e.estado === 'activo').length,
            practicas_en_curso: practicas.filter(p => p.estado === 'en_curso').length,
            empresas_activas: empresas.filter(e => e.estado === 'activa').length,
            postulaciones_pendientes: 12 // Número de ejemplo
        };
    }
}; 