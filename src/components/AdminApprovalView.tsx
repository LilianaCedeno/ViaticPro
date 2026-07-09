import React, { useState } from 'react';
import { Calendar, TrendingUp, TrendingDown, Search, Filter, Check, X, MoreVertical, ChevronLeft, ChevronRight, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ViaticRequest } from '../types';

interface AdminApprovalProps {
  requests: ViaticRequest[];
  onApproveRequest: (requestId: string) => void;
  onRejectRequest: (requestId: string) => void;
  onRequestClick: (request: ViaticRequest) => void;
}

export default function AdminApprovalView({ requests, onApproveRequest, onRejectRequest, onRequestClick }: AdminApprovalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'Todos' | 'Pendiente' | 'Aprobado' | 'Rechazado'>('Todos');
  const [currentPage, setCurrentPage] = useState(1);

  // Stats calculation based on ALL requests
  const pendingCount = requests.filter(r => r.estado === 'Pendiente').length;
  const approvedCount = requests.filter(r => r.estado === 'Aprobado').length;
  const rejectedCount = requests.filter(r => r.estado === 'Rechazado').length;
  
  const totalAmountApproved = requests
    .filter(r => r.estado === 'Aprobado')
    .reduce((sum, r) => sum + r.monto, 0);

  // Filter requests based on search and status
  const filteredRequests = requests.filter(req => {
    const matchesSearch = 
      req.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.colaborador.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.destino.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'Todos' || req.estado === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Simple pagination logic
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRequests.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleApprove = (e: React.MouseEvent, reqId: string) => {
    e.stopPropagation();
    onApproveRequest(reqId);
  };

  const handleReject = (e: React.MouseEvent, reqId: string) => {
    e.stopPropagation();
    onRejectRequest(reqId);
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumbs & Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-secondary uppercase tracking-widest">Administración</p>
          <h2 className="text-2xl font-bold text-on-background">Panel de Aprobación</h2>
        </div>
        <div className="flex items-center gap-2 bg-surface-container px-4 py-2 rounded-xl border border-outline-variant shrink-0 text-sm">
          <Calendar className="text-secondary w-4 h-4" />
          <span className="font-semibold text-on-surface-variant">
            {new Date().toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' })}
          </span>
        </div>
      </div>

      {/* Dashboard Stats Summary (Bento-ish) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card: Pendientes */}
        <div className="bg-white border border-outline-variant p-4 rounded-xl hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <span className="text-primary font-bold text-xs uppercase">PEND</span>
            </div>
            <span className="text-[10px] text-primary flex items-center gap-0.5 font-semibold">
              <TrendingUp className="w-3 h-3" />
              +12% vs ayer
            </span>
          </div>
          <p className="text-xs font-semibold text-secondary">Pendientes</p>
          <p className="text-3xl font-bold text-on-background">{pendingCount}</p>
        </div>

        {/* Card: Aprobados */}
        <div className="bg-white border border-outline-variant p-4 rounded-xl hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <div className="p-2 bg-green-50 rounded-lg">
              <span className="text-green-700 font-bold text-xs uppercase">APROB</span>
            </div>
            <span className="text-[10px] text-green-700 flex items-center gap-0.5 font-semibold">
              <TrendingUp className="w-3 h-3" />
              +5% vs ayer
            </span>
          </div>
          <p className="text-xs font-semibold text-secondary">Aprobados</p>
          <p className="text-3xl font-bold text-on-background">{approvedCount}</p>
        </div>

        {/* Card: Rechazados */}
        <div className="bg-white border border-outline-variant p-4 rounded-xl hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <div className="p-2 bg-error-container/20 rounded-lg">
              <span className="text-error font-bold text-xs uppercase">RECH</span>
            </div>
            <span className="text-[10px] text-error flex items-center gap-0.5 font-semibold">
              <TrendingDown className="w-3 h-3" />
              -2% vs ayer
            </span>
          </div>
          <p className="text-xs font-semibold text-secondary">Rechazados</p>
          <p className="text-3xl font-bold text-on-background">{rejectedCount}</p>
        </div>

        {/* Card: Monto Total */}
        <div className="bg-white border border-outline-variant p-4 rounded-xl hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <div className="p-2 bg-secondary-container/50 rounded-lg">
              <span className="text-secondary font-bold text-xs uppercase">MONTO</span>
            </div>
            <span className="text-[10px] text-secondary font-semibold">Total Mes</span>
          </div>
          <p className="text-xs font-semibold text-secondary">Aprobado Total</p>
          <p className="text-2xl font-bold text-on-background truncate">
            ${totalAmountApproved.toLocaleString('en-US', { maximumFractionDigits: 0 })}
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <section className="bg-white border border-outline-variant rounded-xl p-4 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          {/* Search input */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
            <input 
              className="w-full pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:outline-none text-sm transition-all" 
              placeholder="Buscar por colaborador, destino o # solicitud..." 
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          
          {/* Status filter tabs */}
          <div className="flex gap-1.5 p-1 bg-surface-container rounded-lg shrink-0 w-full md:w-auto">
            {(['Todos', 'Pendiente', 'Aprobado', 'Rechazado'] as const).map((status) => (
              <button
                key={status}
                onClick={() => {
                  setStatusFilter(status);
                  setCurrentPage(1);
                }}
                className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                  statusFilter === status
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Requests Table */}
      <div className="bg-white border border-outline-variant rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          {currentItems.length === 0 ? (
            <div className="p-12 text-center text-on-surface-variant">
              <p className="font-semibold">No se encontraron solicitudes.</p>
              <p className="text-xs mt-1">Intente cambiando los términos de búsqueda o los filtros de estado.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-surface-container-low border-b border-outline-variant">
                  <th className="px-6 py-3 text-xs font-semibold text-secondary uppercase tracking-wider">Request #</th>
                  <th className="px-6 py-3 text-xs font-semibold text-secondary uppercase tracking-wider">Colaborador</th>
                  <th className="px-6 py-3 text-xs font-semibold text-secondary uppercase tracking-wider">Destino</th>
                  <th className="px-6 py-3 text-xs font-semibold text-secondary uppercase tracking-wider">Monto</th>
                  <th className="px-6 py-3 text-xs font-semibold text-secondary uppercase tracking-wider">Estado</th>
                  <th className="px-6 py-3 text-xs font-semibold text-secondary uppercase tracking-wider text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                <AnimatePresence mode="popLayout">
                  {currentItems.map((req) => (
                    <motion.tr 
                      key={req.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => onRequestClick(req)}
                      className="hover:bg-surface-container-low/50 transition-colors duration-150 cursor-pointer"
                    >
                      <td className="px-6 py-4 font-mono text-xs font-bold text-on-surface-variant whitespace-nowrap">
                        #{req.id}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center overflow-hidden font-semibold text-xs text-primary">
                            <User className="w-4 h-4 text-secondary" />
                          </div>
                          <div>
                            <span className="font-semibold text-on-surface block leading-none">{req.colaborador}</span>
                            <span className="text-[10px] text-on-surface-variant mt-1 block">{req.email}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-on-surface-variant whitespace-nowrap">
                        {req.destino}
                      </td>
                      <td className="px-6 py-4 font-bold text-on-surface whitespace-nowrap">
                        ${req.monto.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold leading-none ${
                          req.estado === 'Aprobado'
                            ? 'bg-green-100 text-green-700'
                            : req.estado === 'Rechazado'
                              ? 'bg-error-container text-on-error-container'
                              : 'bg-blue-100 text-blue-700'
                        }`}>
                          {req.estado}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        {req.estado === 'Pendiente' ? (
                          <div className="flex gap-2 justify-end">
                            <button 
                              onClick={(e) => handleApprove(e, req.id)}
                              className="bg-primary text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-primary-container transition-all active:scale-95 cursor-pointer flex items-center gap-1 shadow-sm"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Aprobar</span>
                            </button>
                            <button 
                              onClick={(e) => handleReject(e, req.id)}
                              className="border border-error text-error px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-error-container/20 transition-all active:scale-95 cursor-pointer flex items-center gap-1"
                            >
                              <X className="w-3.5 h-3.5" />
                              <span>Rechazar</span>
                            </button>
                          </div>
                        ) : (
                          <button className="text-secondary hover:text-primary transition-colors p-1.5 rounded hover:bg-surface-container" onClick={() => onRequestClick(req)}>
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination footer */}
        <div className="px-6 py-4 bg-surface-container-low flex items-center justify-between border-t border-outline-variant">
          <p className="text-xs text-secondary">
            Mostrando {filteredRequests.length > 0 ? indexOfFirstItem + 1 : 0}-{Math.min(indexOfLastItem, filteredRequests.length)} de {filteredRequests.length} resultados
          </p>
          <div className="flex gap-2">
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              className="p-1.5 rounded hover:bg-surface-container transition-colors text-secondary disabled:opacity-50 disabled:hover:bg-transparent cursor-pointer"
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-7 h-7 rounded text-xs font-bold cursor-pointer ${
                    currentPage === page
                      ? 'bg-primary text-white shadow-sm'
                      : 'hover:bg-surface-container text-on-surface-variant'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              className="p-1.5 rounded hover:bg-surface-container transition-colors text-secondary disabled:opacity-50 disabled:hover:bg-transparent cursor-pointer"
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
