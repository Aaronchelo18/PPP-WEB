export type EstadoPractica = 'En Progreso (Docs Iniciales OK)' | 'Pendiente Docs Empresa';
export type EstadoDocumento = 'Aprobado' | 'Pendiente';

export const estadosPractica = {
    'En Progreso (Docs Iniciales OK)': 'bg-green-100 text-green-800',
    'Pendiente Docs Empresa': 'bg-yellow-100 text-yellow-800'
} as const;

export const estadosDocumento = {
    'Aprobado': 'bg-green-100 text-green-800',
    'Pendiente': 'bg-yellow-100 text-yellow-800'
} as const; 