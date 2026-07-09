import React, { useState } from 'react';
import { Calendar, Check, Hourglass, Circle, History, ShieldCheck, Sun, Edit3, Trash2, Download, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { ViaticRequest } from '../types';

interface StatusTrackingProps {
  request: ViaticRequest;
  onBack: () => void;
  onCancelRequest: (requestId: string) => void;
  onEditRequest: (request: ViaticRequest) => void;
}

export default function StatusTrackingView({ request, onBack, onCancelRequest, onEditRequest }: StatusTrackingProps) {
  const [isCancelling, setIsCancelling] = useState(false);

  // Generate dynamic weather and office information based on destination
  const getDestinationInfo = (dest: string) => {
    const lowercase = dest.toLowerCase();
    if (lowercase.includes('madrid') || lowercase.includes('es')) {
      return {
        office: 'Sede: Madrid Corporate Office',
        weather: '18°C · Despejado',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA8HtMbPIscy4ToJt5uZrlBCwYkQMD39-q_lVCg6pbs-TU2hGKXYx7WN9TOVBlP_VmjWZmS1sviPyR405yy2Ry7CG8OvhLQzAS46Bf__XjvbFOZFlS5cmMc3O7g1RmLgO7SYRgEOVYYrHEXPBsUZV5Dz4jjxmBmcAIhsCFdFL40PB-NvCZ384cUsqQPYR0qVl-3nvfXqsP1Blf3QS1tqojOO6IRXaWCemG7QDL6CpFuipFyqXCMeqPGSwdEj03qtHSO-Y0iXz0JHPo'
      };
    } else if (lowercase.includes('monterrey') || lowercase.includes('mty')) {
      return {
        office: 'Sede: Monterrey Business Center',
        weather: '26°C · Soleado',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKf__83NDnNgXenJLlclLMpeDIzWCtehJjr5VO_dop5rGeUjnbUr-AjGgOlpfggn-Cmw3rAKj1k0FzpLktPuVXylLUkjnHzJNfy3cVwX1XRGN-Lh46GNCHE7kD3o9s-6u3pS1ldjwwsBguWRcEgAb0EJsZDj13VBBujBPpW4Zd4icY8csID0Sk3C3SUxdI9lloaMJMBzL4ZIHWS9oCyIi7KBiwd4UcAca-li_PCnpg9Z1V_-bE04Ayp0QFzN8HYxQ9WXKai4rWo5w'
      };
    } else if (lowercase.includes('méxico') || lowercase.includes('cdmx')) {
      return {
        office: 'Sede: CDMX Reforma Tower',
        weather: '22°C · Parcialmente Nublado',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAngpfjIpA-Epml-wsBR2zfEnxTt5Nn905NFmg-zREmnsG35_k9Ksg7jMrDoP7XUhms0QJK9GpfryUSnic7A8_sJ9HLMDHoIAWXEdaVn2d5gyrC_X3YWvSHVYxL_2tPryTTc7MINS9SL5l1v9mLUePFkGLXGBKFEzQHM1Ba4cKdJ0WAbzMJ7V8kSuyRIl8rxiBhs_5MGsjW1BCSRIRcZDSTtELuuczxl8O4JUZnsEqHPzWfrl1y2AvPzAClzCYqVnwEuqFFS70lguk'
      };
    } else {
      return {
        office: `Sede de Viajes: ${dest}`,
        weather: '21°C · Despejado',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARdZnzfcxq0efZGfE6308UJdtNdvCOWXW4dbclNViSZIiqGJegAHYvq8-ygH3S0n7f524t13Fr3sBZAphCsa81Q3udUSPQDVYEvr_8d2goPAUijBw0NTKRyZdIV2wCqu3h70ftZi4WL6F9vskNqPRXGKIAjgVsuo_1Ur5Y-ooFH9UFaFV7FFsJ6QXlC8s_HXAYnog-lz5UrpvSz0AgwevyvmOUP2hDHY9xXwQzckzseEWP3psgdX26Up_9_-PHng1vI-3F6rCvwOs'
      };
    }
  };

  const destInfo = getDestinationInfo(request.destino);

  const handleConfirmCancel = () => {
    onCancelRequest(request.id);
    setIsCancelling(false);
  };

  return (
    <div className="space-y-6">
      {/* Back button & Title Section */}
      <div className="flex items-center gap-2">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-surface-container rounded-full transition-colors active:scale-95 text-secondary flex items-center justify-center cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="text-xs font-semibold text-secondary uppercase tracking-widest bg-surface-container px-2 py-1 rounded">
          Regresar a Mis Solicitudes
        </span>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-secondary uppercase tracking-widest mb-1">
            Solicitud #{request.id}
          </p>
          <h2 className="text-2xl font-bold text-on-background">{request.destino} · {request.area}</h2>
          <p className="text-xs text-on-surface-variant italic mt-1 font-medium">"{request.motivo}"</p>
        </div>

        {request.estado === 'Pendiente' && request.estimatedApprovalDate && (
          <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-outline-variant shadow-sm max-w-xs shrink-0">
            <Calendar className="w-6 h-6 text-primary" />
            <div>
              <p className="text-[10px] text-secondary uppercase tracking-wider font-semibold leading-none">Fecha estimada aprobación</p>
              <p className="font-bold text-primary text-sm mt-1">{request.estimatedApprovalDate}</p>
            </div>
          </div>
        )}
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Progress Tracker (Col-span 2) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Progress Card */}
          <div className="bg-white border border-outline-variant rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline-sm text-base font-bold text-on-surface">Línea de Tiempo</h3>
              <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                request.estado === 'Aprobado'
                  ? 'bg-green-100 text-green-700'
                  : request.estado === 'Rechazado'
                    ? 'bg-error-container text-on-error-container'
                    : 'bg-[#E7F1FF] text-primary animate-pulse'
              }`}>
                {request.estado === 'Aprobado' ? 'APROBADA' : request.estado === 'Rechazado' ? 'RECHAZADA' : 'EN PROCESO'}
              </span>
            </div>

            {/* Stepper Grid/Layout */}
            <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-0 pt-2 pb-4">
              
              {/* Stepper Connector Lines (Desktop Only) */}
              <div className="hidden md:block absolute left-[12.5%] right-[12.5%] top-8 h-0.5 bg-outline-variant z-0">
                <div 
                  className="bg-primary h-full transition-all duration-500" 
                  style={{ 
                    width: request.estado === 'Aprobado' 
                      ? '100%' 
                      : request.estado === 'Rechazado' 
                        ? '33%' 
                        : '66%' 
                  }}
                ></div>
              </div>

              {/* Step Items */}
              {request.timeline.map((step, idx) => (
                <div 
                  key={idx} 
                  className="relative z-10 flex flex-row md:flex-col items-center gap-3 md:text-center w-full md:w-1/4"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm border-2 ${
                    step.completed 
                      ? 'bg-primary border-primary text-white' 
                      : step.active 
                        ? 'bg-white border-primary-container text-primary-container animate-pulse' 
                        : 'bg-surface-container-low border-outline-variant text-outline'
                  }`}>
                    {step.completed ? (
                      <Check className="w-5 h-5 text-white" />
                    ) : step.active ? (
                      <Hourglass className="w-5 h-5 text-primary" />
                    ) : (
                      <Circle className="w-2.5 h-2.5 text-outline fill-current" />
                    )}
                  </div>
                  <div className="flex flex-col md:items-center">
                    <span className={`text-xs font-bold ${step.active ? 'text-primary' : 'text-on-surface'}`}>
                      {step.title}
                    </span>
                    <span className="text-[10px] text-secondary mt-0.5">
                      {step.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Movement History Log */}
          <div className="bg-white border border-outline-variant rounded-xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-low/35">
              <h3 className="font-headline-sm text-base font-bold flex items-center gap-2 text-on-surface">
                <History className="w-5 h-5 text-primary" />
                Historial de Movimientos
              </h3>
              <button 
                onClick={() => alert(`Descargando logs para la solicitud #${request.id}...`)}
                className="text-primary font-bold text-xs hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                Descargar log
              </button>
            </div>

            <div className="divide-y divide-outline-variant">
              {request.history.map((log) => (
                <div key={log.id} className="p-5 flex gap-4 hover:bg-surface-container-low/20 transition-colors">
                  <div className="mt-1">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      log.type === 'success' 
                        ? 'bg-green-50 text-green-700' 
                        : log.type === 'send'
                          ? 'bg-primary/10 text-primary'
                          : 'bg-[#E7F1FF] text-primary'
                    }`}>
                      <Check className="w-4 h-4" />
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-4">
                      <p className="font-bold text-sm text-on-surface leading-tight">{log.title}</p>
                      <span className="text-[10px] text-secondary whitespace-nowrap">{log.date}</span>
                    </div>
                    <p className="text-xs text-on-surface-variant mt-1.5 italic leading-relaxed">
                      "{log.description}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detail Sidebar (Col-span 1) */}
        <div className="space-y-6">
          
          {/* Current Status Info */}
          <div className="bg-primary text-white rounded-xl p-6 shadow-md relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-xs font-semibold opacity-85 uppercase tracking-widest mb-4">Estado Actual</h3>
              
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck className="w-8 h-8 text-white" />
                <p className="text-lg font-bold">
                  {request.estado === 'Aprobado' 
                    ? 'Aprobado por Finanzas' 
                    : request.estado === 'Rechazado' 
                      ? 'Solicitud Rechazada' 
                      : 'En Revisión Financiera'}
                </p>
              </div>

              <div className="space-y-3.5 text-xs">
                <div className="flex justify-between border-b border-white/20 pb-2">
                  <span className="opacity-80">Monto total:</span>
                  <span className="font-bold">
                    ${request.monto.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
                  </span>
                </div>
                <div className="flex justify-between border-b border-white/20 pb-2">
                  <span className="opacity-80">Prioridad:</span>
                  <span className="font-bold">Alta (Travel &lt; 7 días)</span>
                </div>
                <div className="flex justify-between border-b border-white/20 pb-2">
                  <span className="opacity-80">Ubicación:</span>
                  <span className="font-bold">{request.destino}</span>
                </div>
                {request.comprobanteName && (
                  <div className="flex justify-between pb-1">
                    <span className="opacity-80">Comprobante:</span>
                    <span className="font-bold underline truncate max-w-[150px]">{request.comprobanteName}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Abstract design element */}
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          </div>

          {/* Destination Map Shortcut */}
          <div className="bg-white border border-outline-variant rounded-xl overflow-hidden flex flex-col h-64 shadow-sm">
            <div className="h-40 bg-surface-container-highest relative">
              <img 
                className="w-full h-full object-cover" 
                src={destInfo.image} 
                alt={request.destino}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                <span className="text-white text-xs font-bold">{destInfo.office}</span>
              </div>
            </div>
            <div className="p-4 flex items-center justify-between flex-1">
              <div>
                <p className="text-[10px] text-secondary uppercase font-semibold leading-none">Clima en destino</p>
                <p className="font-bold text-on-surface text-sm mt-1">{destInfo.weather}</p>
              </div>
              <Sun className="w-6 h-6 text-primary animate-pulse" />
            </div>
          </div>

          {/* Quick Actions */}
          {request.estado === 'Pendiente' ? (
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => onEditRequest(request)}
                className="bg-secondary-container text-on-secondary-container p-4 rounded-xl flex flex-col items-center justify-center gap-1.5 hover:brightness-95 active:scale-95 transition-all text-xs font-bold shadow-sm cursor-pointer"
              >
                <Edit3 className="w-5 h-5 text-on-secondary-container" />
                <span>Editar</span>
              </button>
              
              <button 
                onClick={() => setIsCancelling(true)}
                className="bg-error-container text-on-error-container p-4 rounded-xl flex flex-col items-center justify-center gap-1.5 hover:brightness-95 active:scale-95 transition-all text-xs font-bold shadow-sm cursor-pointer"
              >
                <Trash2 className="w-5 h-5 text-on-error-container" />
                <span>Cancelar</span>
              </button>
            </div>
          ) : (
            <div className="p-4 bg-surface-container-low border border-outline-variant/60 rounded-xl text-center text-xs text-on-surface-variant">
              Esta solicitud ha finalizado su ciclo de aprobación y no puede ser modificada.
            </div>
          )}

        </div>
      </div>

      {/* Cancellation Modal Confirmation */}
      {isCancelling && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full space-y-4 shadow-xl border border-outline-variant">
            <h4 className="text-lg font-bold text-on-surface">¿Cancelar esta solicitud?</h4>
            <p className="text-sm text-on-surface-variant">
              Esta acción no se puede deshacer. Se enviará una notificación al departamento de finanzas informando la cancelación del viaje a <span className="font-semibold">{request.destino}</span>.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button 
                onClick={() => setIsCancelling(false)}
                className="px-4 py-2 text-xs font-bold text-secondary hover:bg-surface-container rounded-lg"
              >
                Cerrar
              </button>
              <button 
                onClick={handleConfirmCancel}
                className="px-4 py-2 text-xs font-bold bg-error text-white hover:bg-error/95 rounded-lg active:scale-95 transition-all"
              >
                Confirmar Cancelación
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
