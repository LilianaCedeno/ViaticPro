import React from 'react';
import { Check, Clock, Download, FileText, ArrowRight, Home } from 'lucide-react';
import { motion } from 'motion/react';
import { ViaticRequest } from '../types';

interface SuccessSplashProps {
  type: 'enviada' | 'aprobada';
  request: ViaticRequest;
  onPrimaryAction: () => void;
  onSecondaryAction: () => void;
}

export default function SuccessSplashView({ type, request, onPrimaryAction, onSecondaryAction }: SuccessSplashProps) {
  return (
    <div className="min-h-[calc(100vh-120px)] w-full flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* Subtle Ambient Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[300px] h-[300px] bg-surface-container-high rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[5%] right-[-10%] w-[350px] h-[350px] bg-secondary-container rounded-full blur-[80px]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-[500px]"
      >
        {/* Transactional Success Card */}
        <div className="bg-white border border-outline-variant rounded-xl p-8 shadow-md flex flex-col items-center">
          
          {/* Animated Success Badge */}
          <div className="w-20 h-20 mb-6 rounded-full bg-surface-container flex items-center justify-center relative">
            <div className="absolute inset-0 bg-primary/10 rounded-full animate-ping opacity-25"></div>
            <div className="w-16 h-16 bg-primary-container rounded-full flex items-center justify-center text-white shadow-md">
              <Check className="w-8 h-8 text-white stroke-[3px]" />
            </div>
          </div>

          {/* Identity Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-on-surface tracking-tight">
              {type === 'enviada' ? 'Solicitud enviada correctamente' : 'Solicitud aprobada'}
            </h1>
            <p className="text-sm text-on-surface-variant mt-2 max-w-sm mx-auto leading-relaxed">
              {type === 'enviada' 
                ? 'Tu itinerario de viaje ha sido registrado con éxito en el sistema corporativo.' 
                : 'Tu solicitud de viáticos ha sido procesada con éxito por el departamento de finanzas.'}
            </p>
          </div>

          {type === 'enviada' ? (
            /* SUBMITTED SPLASH SCREEN */
            <div className="w-full space-y-4 mb-6">
              {/* Status Badge Box */}
              <div className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-on-surface-variant">
                  <Clock className="w-5 h-5 text-on-surface-variant" />
                  <span className="text-xs font-semibold uppercase tracking-wider">Estado actual</span>
                </div>
                <div className="px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-[10px] font-bold uppercase tracking-wider">
                  Pendiente de aprobación
                </div>
              </div>

              {/* Transaction Summary Info Cards */}
              <div className="w-full grid grid-cols-2 gap-4 text-left">
                <div className="bg-white p-4 border border-outline-variant rounded-lg">
                  <p className="text-[10px] text-secondary uppercase font-bold tracking-wide mb-1">ID de Solicitud</p>
                  <p className="font-bold text-on-surface text-sm">#{request.id}</p>
                </div>
                <div className="bg-white p-4 border border-outline-variant rounded-lg">
                  <p className="text-[10px] text-secondary uppercase font-bold tracking-wide mb-1">Fecha Envío</p>
                  <p className="font-bold text-on-surface text-sm">{request.fechaEnvio}</p>
                </div>
              </div>
            </div>
          ) : (
            /* APPROVED SPLASH SCREEN */
            <div className="w-full space-y-3 mb-6">
              {/* Table-like Layout for financial numbers */}
              <div className="flex justify-between items-center py-3 border-b border-outline-variant">
                <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Monto Aprobado</span>
                <span className="font-bold text-primary text-lg">
                  ${request.monto.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-outline-variant">
                <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Fecha Estimada Pago</span>
                <span className="text-sm font-semibold text-on-surface">
                  {request.estimatedApprovalDate || '24 de Mayo, 2024'}
                </span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Referencia</span>
                <span className="text-xs font-mono font-bold text-secondary">#{request.id}-AX</span>
              </div>

              {/* Status Chip */}
              <div className="flex justify-center pt-3">
                <div className="px-4 py-1.5 bg-surface-container-high rounded-full flex items-center gap-2 border">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-pulse"></span>
                  <span className="text-xs font-semibold text-on-surface-variant">Estatus: Listo para depósito</span>
                </div>
              </div>
            </div>
          )}

          {/* Core Action buttons */}
          <div className="w-full space-y-3 pt-2">
            <button 
              onClick={onPrimaryAction}
              className="w-full bg-primary-container text-white font-semibold text-sm py-3 px-6 rounded-lg shadow-sm hover:opacity-90 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              {type === 'enviada' ? (
                <>
                  <span>Ver estado de mi solicitud</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  <Home className="w-4 h-4" />
                  <span>Volver al inicio</span>
                </>
              )}
            </button>
            
            <button 
              onClick={onSecondaryAction}
              className="w-full bg-transparent text-secondary font-semibold text-sm py-3 px-6 rounded-lg transition-colors hover:bg-surface-container-low flex items-center justify-center gap-2 cursor-pointer"
            >
              {type === 'enviada' ? (
                <span>Volver al Dashboard</span>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Descargar Comprobante</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Airport Image card at bottom for 'enviada' splash */}
        {type === 'enviada' && (
          <div className="mt-6 group relative overflow-hidden rounded-xl border border-outline-variant h-40">
            <div 
              className="bg-cover bg-center w-full h-full transition-transform duration-700 group-hover:scale-105" 
              style={{ 
                backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuARdZnzfcxq0efZGfE6308UJdtNdvCOWXW4dbclNViSZIiqGJegAHYvq8-ygH3S0n7f524t13Fr3sBZAphCsa81Q3udUSPQDVYEvr_8d2goPAUijBw0NTKRyZdIV2wCqu3h70ftZi4WL6F9vskNqPRXGKIAjgVsuo_1Ur5Y-ooFH9UFaFV7FFsJ6QXlC8s_HXAYnog-lz5UrpvSz0AgwevyvmOUP2hDHY9xXwQzckzseEWP3psgdX26Up_9_-PHng1vI-3F6rCvwOs')" 
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent flex items-end p-4 text-white text-left">
              <div>
                <p className="text-[10px] font-semibold text-white/80 uppercase tracking-widest">ViaticPro Business Travel</p>
                <p className="font-bold text-sm leading-tight mt-0.5">Gestionando tus viajes con precisión institucional.</p>
              </div>
            </div>
          </div>
        )}

        {/* Decorative isometric 3D building for 'aprobada' splash */}
        {type === 'aprobada' && (
          <div className="mt-8 opacity-20 flex justify-center">
            <img 
              className="w-28 grayscale opacity-40" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgioc1KRCwTp1fPSxf8QDVz8KJvsHrL-nQGgzjBe0CwNZ85eliQHmi3wg3TkQp_h62PXamfoZ9NxELGDh8yhK63q7KLvJzYEIKNShLhPAr0IcUTlX_3A1SX04pnLYh48KpvJH-6cc6TGsaVvavAofE_eULlyWVYjuJreyFHhHNQDyAZ08GnO-42UORD3i1eGIscA9r6HDg50gUVCtBIjiiJg3OvS15Bu9Ym-Fa-LBAu8bMNQfEd3reWrM1WxlI-xPD1x-8cGie8T8" 
              alt="Finanzas"
              referrerPolicy="no-referrer"
            />
          </div>
        )}

      </motion.div>
    </div>
  );
}
