export interface Estudiante {
    id: number;
    nombre: string;
    apellidos: string;
    email: string;
    carrera: string;
    ciclo: number;
    estado: 'activo' | 'inactivo';
}

export interface Empresa {
    id: number;
    nombre: string;
    ruc: string;
    direccion: string;
    sector: string;
    estado: 'activa' | 'inactiva';
    contacto: {
        nombre: string;
        email: string;
        telefono: string;
    };
}

export interface Practica {
    id: number;
    estudiante_id: number;
    empresa_id: number;
    fecha_inicio: string;
    fecha_fin: string;
    estado: 'pendiente' | 'en_curso' | 'completada' | 'cancelada';
    horas_completadas: number;
    area: string;
    supervisor: string;
}

export interface Actividad {
    id: number;
    tipo: 'revision' | 'aprobacion' | 'seguimiento';
    descripcion: string;
    fecha: string;
    prioridad: 'alta' | 'media' | 'baja';
    estado: 'pendiente' | 'completada';
    relacionado_id?: number;
}

export interface EstadisticasDashboard {
    estudiantes_activos: number;
    practicas_en_curso: number;
    empresas_activas: number;
    postulaciones_pendientes: number;
} 