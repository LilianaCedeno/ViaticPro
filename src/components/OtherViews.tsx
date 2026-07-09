import React from 'react';
import { Bell, User, Shield, Key, Mail, Calendar, MapPin, Building, CreditCard } from 'lucide-react';
import { User as UserType } from '../types';

interface NotificationsViewProps {
  user: UserType;
}

export function NotificationsView({ user }: NotificationsViewProps) {
  const notifications = [
    {
      id: 'n1',
      title: 'Solicitud aprobada por Finanzas',
      desc: 'Tu solicitud de viáticos #RQ-2024-081 para Madrid ha sido depositada.',
      time: 'Hace 2 horas',
      unread: true,
    },
    {
      id: 'n2',
      title: 'Nueva Directriz Presupuestaria Q3/Q4',
      desc: 'El departamento de Recursos Humanos actualizó los tabuladores diarios de hospedaje para México.',
      time: 'Ayer, 04:15 PM',
      unread: false,
    },
    {
      id: 'n3',
      title: 'Recordatorio: Sube tus comprobantes fiscales',
      desc: 'Recuerda subir tus archivos PDF del viaje a Monterrey para finalizar el reembolso.',
      time: 'Hace 3 días',
      unread: false,
    },
  ];

  return (
    <div className="bg-white border border-outline-variant rounded-xl p-6 shadow-sm max-w-2xl mx-auto space-y-6">
      <div className="flex justify-between items-center pb-4 border-b">
        <h3 className="font-headline-sm text-lg font-bold flex items-center gap-2 text-on-surface">
          <Bell className="w-5 h-5 text-primary" />
          Notificaciones ({notifications.filter(n => n.unread).length} nuevas)
        </h3>
        <button 
          onClick={() => alert('Todas marcadas como leídas.')}
          className="text-xs text-primary font-bold hover:underline"
        >
          Marcar todas como leídas
        </button>
      </div>

      <div className="divide-y divide-outline-variant">
        {notifications.map((notif) => (
          <div key={notif.id} className="py-4 flex gap-4 first:pt-0 last:pb-0 items-start hover:bg-surface-container-low/20 px-2 rounded-lg transition-colors">
            <div className="relative mt-1">
              <span className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center">
                <Bell className="w-4 h-4 text-primary" />
              </span>
              {notif.unread && (
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-error rounded-full ring-2 ring-white"></span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start gap-4">
                <p className={`text-sm text-on-surface leading-tight ${notif.unread ? 'font-bold' : 'font-medium'}`}>
                  {notif.title}
                </p>
                <span className="text-[10px] text-secondary whitespace-nowrap">{notif.time}</span>
              </div>
              <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
                {notif.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface ProfileViewProps {
  user: UserType;
  onLogout: () => void;
}

export function ProfileView({ user, onLogout }: ProfileViewProps) {
  return (
    <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Profile Card */}
      <div className="bg-white border border-outline-variant rounded-xl p-6 shadow-sm flex flex-col items-center text-center space-y-4">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/20 bg-primary-container flex items-center justify-center text-white text-3xl font-bold relative group">
          {user.avatarUrl ? (
            <img className="w-full h-full object-cover" src={user.avatarUrl} alt={user.name} referrerPolicy="no-referrer" />
          ) : (
            user.name.charAt(0)
          )}
        </div>
        
        <div>
          <h3 className="font-headline-sm text-base font-bold text-on-surface">{user.name}</h3>
          <span className="inline-block mt-1 px-3 py-0.5 bg-secondary-container text-on-secondary-container rounded-full text-[10px] font-bold uppercase tracking-wider">
            {user.role === 'admin' ? 'Aprobador / Finanzas' : 'Empleado / Colaborador'}
          </span>
        </div>

        <p className="text-xs text-on-surface-variant">
          Miembro desde Octubre, 2023 · Estado activo
        </p>

        <button 
          onClick={onLogout}
          className="w-full py-2 bg-error-container text-on-error-container text-xs font-bold rounded-lg hover:opacity-90 active:scale-95 transition-all cursor-pointer"
        >
          Cerrar Sesión Activa
        </button>
      </div>

      {/* Corporate Details */}
      <div className="md:col-span-2 bg-white border border-outline-variant rounded-xl p-6 shadow-sm space-y-6">
        <h3 className="font-headline-sm text-base font-bold text-on-surface pb-3 border-b">
          Información Corporativa
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded-lg border border-outline-variant/30">
            <Mail className="w-5 h-5 text-primary shrink-0" />
            <div>
              <p className="text-[10px] text-secondary uppercase font-semibold leading-none">Email Corporativo</p>
              <p className="font-bold text-on-surface mt-1">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded-lg border border-outline-variant/30">
            <Building className="w-5 h-5 text-primary shrink-0" />
            <div>
              <p className="text-[10px] text-secondary uppercase font-semibold leading-none">Departamento</p>
              <p className="font-bold text-on-surface mt-1">{user.role === 'admin' ? 'Finanzas & Control' : 'Ventas Corporativas'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded-lg border border-outline-variant/30">
            <Key className="w-5 h-5 text-primary shrink-0" />
            <div>
              <p className="text-[10px] text-secondary uppercase font-semibold leading-none">ID de Empleado</p>
              <p className="font-bold text-on-surface mt-1">#EMP-2024-8842</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded-lg border border-outline-variant/30">
            <CreditCard className="w-5 h-5 text-primary shrink-0" />
            <div>
              <p className="text-[10px] text-secondary uppercase font-semibold leading-none">Tarjeta Corporativa</p>
              <p className="font-bold text-on-surface mt-1">VISA **** 9823</p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-primary/5 rounded-lg border border-primary/10 text-xs space-y-2">
          <h4 className="font-bold text-primary flex items-center gap-1.5 leading-none">
            <Shield className="w-4 h-4" />
            Políticas de Seguridad y Límites de Viáticos
          </h4>
          <p className="text-on-surface-variant leading-relaxed">
            Su cuenta está sujeta a los límites de viáticos estipulados en la norma fiscal interna de la empresa. Todos los gastos reportados deben contar con comprobantes fiscales digitales válidos (CFDI/PDF) para proceder a la validación de depósitos bancarios.
          </p>
        </div>
      </div>
    </div>
  );
}
