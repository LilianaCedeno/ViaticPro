import { ViaticRequest, User } from './types';

export const INITIAL_USERS: User[] = [
  {
    name: 'ViaticPro Admin',
    email: 'traveler@corporate.com',
    role: 'traveler',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAngpfjIpA-Epml-wsBR2zfEnxTt5Nn905NFmg-zREmnsG35_k9Ksg7jMrDoP7XUhms0QJK9GpfryUSnic7A8_sJ9HLMDHoIAWXEdaVn2d5gyrC_X3YWvSHVYxL_2tPryTTc7MINS9SL5l1v9mLUePFkGLXGBKFEzQHM1Ba4cKdJ0WAbzMJ7V8kSuyRIl8rxiBhs_5MGsjW1BCSRIRcZDSTtELuuczxl8O4JUZnsEqHPzWfrl1y2AvPzAClzCYqVnwEuqFFS70lguk'
  },
  {
    name: 'Valeria Alarcón',
    email: 'admin@corporate.com',
    role: 'admin',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKf__83NDnNgXenJLlclLMpeDIzWCtehJjr5VO_dop5rGeUjnbUr-AjGgOlpfggn-Cmw3rAKj1k0FzpLktPuVXylLUkjnHzJNfy3cVwX1XRGN-Lh46GNCHE7kD3o9s-6u3pS1ldjwwsBguWRcEgAb0EJsZDj13VBBujBPpW4Zd4icY8csID0Sk3C3SUxdI9lloaMJMBzL4ZIHWS9oCyIi7KBiwd4UcAca-li_PCnpg9Z1V_-bE04Ayp0QFzN8HYxQ9WXKai4rWo5w'
  }
];

export const INITIAL_REQUESTS: ViaticRequest[] = [
  {
    id: 'VP-2024-0892',
    colaborador: 'ViaticPro Admin',
    email: 'traveler@corporate.com',
    area: 'Ventas',
    destino: 'Madrid, España',
    fechaInicio: '2024-10-14',
    fechaTermino: '2024-10-21',
    monto: 2450.00,
    motivo: 'Viaje de negocios para asistir a la cumbre técnica Q3 y coordinar con el equipo regional.',
    estado: 'Pendiente',
    fechaEnvio: '24 Mayo, 2024',
    comprobanteName: 'itinerario_madrid_q3.pdf',
    estimatedApprovalDate: '14 de Octubre, 2024',
    timeline: [
      { title: 'Solicitud enviada', date: '08 Oct 09:30', completed: true, active: false },
      { title: 'Revisión supervisor', date: '09 Oct 14:15', completed: true, active: false },
      { title: 'Aprobación financiera', date: 'En revisión...', completed: false, active: true },
      { title: 'Pago pendiente', date: 'Pendiente', completed: false, active: false }
    ],
    history: [
      {
        id: 'h1',
        title: 'Asignado a Finanzas (Analista: Alberto Ruiz)',
        date: 'Hoy, 10:45 AM',
        type: 'info',
        description: 'Validando comprobantes de alojamiento y políticas de vuelo transatlántico.'
      },
      {
        id: 'h2',
        title: 'Aprobado por Supervisor (Marta Gómez)',
        date: 'Ayer, 02:15 PM',
        type: 'success',
        description: 'El presupuesto se ajusta a los límites establecidos para el proyecto.'
      },
      {
        id: 'h3',
        title: 'Solicitud enviada por el empleado',
        date: '08 Oct, 09:30 AM',
        type: 'send',
        description: 'Viaje de negocios para asistir a la cumbre técnica Q3.'
      }
    ]
  },
  {
    id: 'RQ-2024-089',
    colaborador: 'Javier Mendoza',
    email: 'javier.mendoza@corporate.com',
    area: 'Marketing',
    destino: 'Monterrey, MX',
    fechaInicio: '2024-11-01',
    fechaTermino: '2024-11-05',
    monto: 1450.00,
    motivo: 'Lanzamiento de campaña regional y reuniones con distribuidores locales.',
    estado: 'Pendiente',
    fechaEnvio: '23 Oct, 2024',
    comprobanteName: 'vuelos_mty.pdf',
    estimatedApprovalDate: '28 de Octubre, 2024',
    timeline: [
      { title: 'Solicitud enviada', date: '23 Oct 10:00', completed: true, active: false },
      { title: 'Revisión supervisor', date: 'En revisión...', completed: false, active: true },
      { title: 'Aprobación financiera', date: 'Pendiente', completed: false, active: false },
      { title: 'Pago pendiente', date: 'Pendiente', completed: false, active: false }
    ],
    history: [
      {
        id: 'h201',
        title: 'Solicitud enviada por el empleado',
        date: '23 Oct, 10:00 AM',
        type: 'send',
        description: 'Viaje para coordinar campaña de marketing local en Monterrey.'
      }
    ]
  },
  {
    id: 'RQ-2024-092',
    colaborador: 'Elena Rodriguez',
    email: 'elena.rodriguez@corporate.com',
    area: 'Ingeniería',
    destino: 'Santiago, CL',
    fechaInicio: '2024-11-10',
    fechaTermino: '2024-11-15',
    monto: 3200.00,
    motivo: 'Supervisión presencial de la migración del data center sur.',
    estado: 'Pendiente',
    fechaEnvio: '24 Oct, 2024',
    comprobanteName: 'hotel_santiago.pdf',
    estimatedApprovalDate: '30 de Octubre, 2024',
    timeline: [
      { title: 'Solicitud enviada', date: '24 Oct 11:30', completed: true, active: false },
      { title: 'Revisión supervisor', date: 'En revisión...', completed: false, active: true },
      { title: 'Aprobación financiera', date: 'Pendiente', completed: false, active: false },
      { title: 'Pago pendiente', date: 'Pendiente', completed: false, active: false }
    ],
    history: [
      {
        id: 'h202',
        title: 'Solicitud enviada por el empleado',
        date: '24 Oct, 11:30 AM',
        type: 'send',
        description: 'Reunión de ingenieros clave para migración crítica.'
      }
    ]
  },
  {
    id: 'RQ-2024-075',
    colaborador: 'Sofia Castro',
    email: 'sofia.castro@corporate.com',
    area: 'Administración',
    destino: 'Bogotá, CO',
    fechaInicio: '2024-10-12',
    fechaTermino: '2024-10-15',
    monto: 850.00,
    motivo: 'Auditoría interna anual presencial de la oficina regional colombiana.',
    estado: 'Rechazado',
    fechaEnvio: '05 Oct, 2024',
    comprobanteName: 'cotizacion_vuelo.pdf',
    timeline: [
      { title: 'Solicitud enviada', date: '05 Oct 09:00', completed: true, active: false },
      { title: 'Revisión supervisor', date: '06 Oct 10:00', completed: true, active: false },
      { title: 'Rechazado', date: '06 Oct 15:30', completed: false, active: true }
    ],
    history: [
      {
        id: 'h301',
        title: 'Rechazado por Supervisor (Roberto G.)',
        date: '06 Oct, 03:30 PM',
        type: 'info',
        description: 'Monto excede tabulador de viáticos diarios para Bogotá. Favor de ajustar.'
      },
      {
        id: 'h302',
        title: 'Solicitud enviada por el empleado',
        date: '05 Oct, 09:00 AM',
        type: 'send',
        description: 'Viaje para auditoría contable presencial.'
      }
    ]
  },
  {
    id: 'RQ-2024-081',
    colaborador: 'Roberto Gomez',
    email: 'roberto.gomez@corporate.com',
    area: 'Administración',
    destino: 'Madrid, ES',
    fechaInicio: '2024-10-24',
    fechaTermino: '2024-10-28',
    monto: 4120.00,
    motivo: 'Reunión de planeación presupuestaria con junta de directivos.',
    estado: 'Aprobado',
    fechaEnvio: '10 Oct, 2024',
    comprobanteName: 'comprobantes_madrid.pdf',
    timeline: [
      { title: 'Solicitud enviada', date: '10 Oct 08:30', completed: true, active: false },
      { title: 'Revisión supervisor', date: '11 Oct 09:00', completed: true, active: false },
      { title: 'Aprobación financiera', date: '12 Oct 14:00', completed: true, active: false },
      { title: 'Pago transferido', date: '14 Oct 10:00', completed: true, active: false }
    ],
    history: [
      {
        id: 'h401',
        title: 'Pago procesado exitosamente',
        date: '14 Oct, 10:00 AM',
        type: 'success',
        description: 'La transferencia de fondos fue realizada por el banco asociado.'
      },
      {
        id: 'h402',
        title: 'Aprobado por Finanzas (Alberto R.)',
        date: '12 Oct, 02:00 PM',
        type: 'success',
        description: 'Presupuesto validado y autorizado para desembolso.'
      }
    ]
  }
];
