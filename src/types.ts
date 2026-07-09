export type RequestStatus = 'Pendiente' | 'Aprobado' | 'Rechazado';

export interface TimelineStep {
  title: string;
  date: string;
  completed: boolean;
  active: boolean;
}

export interface HistoryLog {
  id: string;
  title: string;
  date: string;
  type: 'info' | 'success' | 'send';
  description: string;
}

export interface ViaticRequest {
  id: string;
  colaborador: string;
  email: string;
  area: string;
  destino: string;
  fechaInicio: string;
  fechaTermino: string;
  monto: number;
  motivo: string;
  estado: RequestStatus;
  fechaEnvio: string;
  comprobanteName?: string;
  estimatedApprovalDate?: string;
  timeline: TimelineStep[];
  history: HistoryLog[];
}

export interface User {
  name: string;
  email: string;
  role: 'traveler' | 'admin';
  avatarUrl: string;
}
