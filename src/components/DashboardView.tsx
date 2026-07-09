import React from 'react';
import { Plus, Clock, CheckCircle2, AlertTriangle, TrendingUp, ChevronRight, Wallet, Plane } from 'lucide-react';
import { motion } from 'motion/react';
import { ViaticRequest, User } from '../types';

interface DashboardProps {
  user: User;
  requests: ViaticRequest[];
  onNewRequestClick: () => void;
  onRequestClick: (request: ViaticRequest) => void;
}

export default function DashboardView({ user, requests, onNewRequestClick, onRequestClick }: DashboardProps) {
  // Filter requests for this traveler
  const userRequests = requests.filter(r => r.email === user.email);

  const pendingCount = userRequests.filter(r => r.estado === 'Pendiente').length;
  const approvedCount = userRequests.filter(r => r.estado === 'Aprobado').length;
  const rejectedCount = userRequests.filter(r => r.estado === 'Rechazado').length;

  const totalMonthlyBudget = 42000;
  const usedBudgetAmount = 27300; // 65% of 42000
  const usedPercentage = Math.round((usedBudgetAmount / totalMonthlyBudget) * 100);

  return (
    <div className="space-y-8">
      {/* Welcome Message */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-on-background tracking-tight">Bienvenido, {user.name}</h2>
          <p className="font-body-md text-sm text-on-surface-variant mt-1">Aquí tienes un resumen de tus gestiones de viáticos hoy.</p>
        </div>
        <button 
          onClick={onNewRequestClick}
          className="bg-primary text-white px-5 py-3 rounded-lg font-semibold text-sm flex items-center gap-2 hover:bg-primary-container active:scale-95 transition-all shadow-sm cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          <span>Nueva Solicitud</span>
        </button>
      </section>

      {/* Summary Bento Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Solicitudes Pendientes */}
        <motion.div 
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
          className="bg-white border border-outline-variant rounded-xl p-6 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => {
            const firstPending = userRequests.find(r => r.estado === 'Pendiente');
            if (firstPending) onRequestClick(firstPending);
          }}
        >
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 rounded-lg bg-secondary-container flex items-center justify-center">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <span className="bg-[#E7F1FF] text-primary px-3 py-1 rounded-full text-xs font-semibold">En Proceso</span>
          </div>
          <div>
            <p className="text-xs font-medium text-on-surface-variant">Solicitudes Pendientes</p>
            <p className="text-4xl font-bold text-on-background mt-1">{pendingCount}</p>
          </div>
          <div className="mt-2 flex items-center gap-1 text-primary text-xs font-semibold">
            <TrendingUp className="w-4 h-4" />
            <span>4 nuevas hoy</span>
          </div>
        </motion.div>

        {/* Solicitudes Aprobadas */}
        <motion.div 
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
          className="bg-white border border-outline-variant rounded-xl p-6 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => {
            const firstApproved = userRequests.find(r => r.estado === 'Aprobado');
            if (firstApproved) onRequestClick(firstApproved);
          }}
        >
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-green-700" />
            </div>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">Completado</span>
          </div>
          <div>
            <p className="text-xs font-medium text-on-surface-variant">Solicitudes Aprobadas</p>
            <p className="text-4xl font-bold text-on-background mt-1">{approvedCount}</p>
          </div>
          <div className="mt-2 flex items-center gap-1 text-green-700 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>80% del total</span>
          </div>
        </motion.div>

        {/* Solicitudes Rechazadas */}
        <motion.div 
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
          className="bg-white border border-outline-variant rounded-xl p-6 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => {
            const firstRejected = userRequests.find(r => r.estado === 'Rechazado');
            if (firstRejected) onRequestClick(firstRejected);
          }}
        >
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 rounded-lg bg-error-container/20 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-error" />
            </div>
            <span className="bg-error-container text-on-error-container px-3 py-1 rounded-full text-xs font-semibold">Revisión</span>
          </div>
          <div>
            <p className="text-xs font-medium text-on-surface-variant">Solicitudes Rechazadas</p>
            <p className="text-4xl font-bold text-on-background mt-1">{rejectedCount}</p>
          </div>
          <div className="mt-2 flex items-center gap-1 text-error text-xs font-semibold">
            <AlertTriangle className="w-4 h-4" />
            <span>Requiere acción</span>
          </div>
        </motion.div>
      </section>

      {/* Main Data Section: Asymmetric Layout */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-12">
        {/* Recent Activity Table */}
        <div className="lg:col-span-2 bg-white border border-outline-variant rounded-xl overflow-hidden shadow-sm flex flex-col justify-between">
          <div>
            <div className="px-6 py-4 border-b border-outline-variant flex justify-between items-center bg-white">
              <h3 className="font-headline-sm text-lg font-bold text-on-surface">Actividad Reciente</h3>
              <span className="text-xs text-on-surface-variant">Total: {userRequests.length} solicitudes</span>
            </div>
            
            <div className="overflow-x-auto">
              {userRequests.length === 0 ? (
                <div className="p-12 text-center text-on-surface-variant">
                  <p className="font-semibold">No tienes solicitudes registradas aún.</p>
                  <p className="text-xs mt-1">Presiona "+ Nueva Solicitud" para registrar tu primer viaje.</p>
                </div>
              ) : (
                <table className="w-full text-left font-body-md border-collapse text-sm">
                  <thead className="bg-surface-container-low">
                    <tr className="text-on-surface-variant font-semibold uppercase tracking-wider text-xs border-b border-outline-variant">
                      <th className="px-6 py-3 font-medium">Destino</th>
                      <th className="px-6 py-3 font-medium">Fecha</th>
                      <th className="px-6 py-3 font-medium">Monto</th>
                      <th className="px-6 py-3 font-medium">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant">
                    {userRequests.map((req) => (
                      <tr 
                        key={req.id}
                        onClick={() => onRequestClick(req)}
                        className="hover:bg-surface-container-low transition-colors cursor-pointer group"
                      >
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="font-semibold text-on-surface group-hover:text-primary transition-colors">
                              {req.destino}
                            </span>
                            <span className="text-xs text-on-surface-variant truncate max-w-xs">
                              {req.motivo || 'Viáticos de viaje'}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-on-surface-variant whitespace-nowrap">
                          {req.fechaEnvio}
                        </td>
                        <td className="px-6 py-4 font-semibold text-on-surface">
                          ${req.monto.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                            req.estado === 'Aprobado'
                              ? 'bg-green-100 text-green-700'
                              : req.estado === 'Rechazado'
                                ? 'bg-error-container text-on-error-container'
                                : 'bg-[#E7F1FF] text-primary'
                          }`}>
                            {req.estado}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
          
          <div className="px-6 py-3 border-t border-outline-variant bg-surface-container-low text-xs text-on-surface-variant text-right">
            Selecciona una solicitud para ver su estado y detalles de aprobación.
          </div>
        </div>

        {/* Visual Insight Column */}
        <div className="space-y-6">
          {/* Image Card with Overlay */}
          <div className="relative h-64 rounded-xl overflow-hidden shadow-md group cursor-pointer">
            <img 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeLDVLfWQWxK4O8afNHDQBP6id2XI5IvZfxlGcluKFYVZ3QVYtItOeJhpC72QJZFNDIY8FgeQY5t4fT1RKITPAniI2F0snrOteHTy4A3zah17m6AtTYCyOX4po_hfY-0995P1nQbh0JvWrDBBn632okphqxu7VSw5QwzhaLCOXASC2Aw0fBsxdl-neSxQ1Dsj6Pr7gu9u5EEWEO9LaOWdqK8hvOfcPRfa1MG9PuECVgqcOpxBLwXn8T35bMDmQM5nSBwfeu7qDgpc"
              alt="Aeropuerto"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent flex flex-col justify-end p-6">
              <div className="flex items-center gap-2 text-white/95 mb-1">
                <Plane className="w-5 h-5 text-white" />
                <span className="text-sm font-semibold tracking-wide uppercase">Próximo Viaje</span>
              </div>
              <span className="text-white font-bold text-xl leading-snug">Bogotá, Colombia</span>
              <span className="text-white/80 text-sm mt-0.5">12 Nov, 2024 · Junta Administrativa</span>
            </div>
          </div>

          {/* Compact Data Card */}
          <div className="bg-primary text-white p-6 rounded-xl shadow-md">
            <div className="flex items-center gap-2 mb-4 text-white/90">
              <Wallet className="w-5 h-5 text-white" />
              <h4 className="text-xs font-semibold uppercase tracking-widest">Presupuesto Mensual</h4>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <span className="text-3xl font-bold leading-none">
                  ${usedBudgetAmount.toLocaleString('en-US')}
                </span>
                <span className="text-xs opacity-90 font-medium">
                  {usedPercentage}% usado de ${totalMonthlyBudget.toLocaleString('en-US')}
                </span>
              </div>
              <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                <div className="bg-white h-full transition-all duration-500" style={{ width: `${usedPercentage}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
