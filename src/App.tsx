import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Layers, ChevronRight, X, AlertTriangle, Edit3, DollarSign, Send } from 'lucide-react';

import { ViaticRequest, User, RequestStatus } from './types';
import { INITIAL_REQUESTS } from './data';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Login from './components/Login';
import DashboardView from './components/DashboardView';
import RequestFormView from './components/RequestFormView';
import StatusTrackingView from './components/StatusTrackingView';
import AdminApprovalView from './components/AdminApprovalView';
import SuccessSplashView from './components/SuccessSplashView';
import { NotificationsView, ProfileView } from './components/OtherViews';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [requests, setRequests] = useState<ViaticRequest[]>([]);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedRequest, setSelectedRequest] = useState<ViaticRequest | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [editingRequest, setEditingRequest] = useState<ViaticRequest | null>(null);
  const [editMonto, setEditMonto] = useState('');
  const [editMotivo, setEditMotivo] = useState('');

  // Load requests from localStorage on mount, or initialize with seed data
  useEffect(() => {
    const savedRequests = localStorage.getItem('viaticpro_requests');
    if (savedRequests) {
      try {
        setRequests(JSON.parse(savedRequests));
      } catch (e) {
        setRequests(INITIAL_REQUESTS);
      }
    } else {
      setRequests(INITIAL_REQUESTS);
      localStorage.setItem('viaticpro_requests', JSON.stringify(INITIAL_REQUESTS));
    }

    // Try auto-login from local session if present
    const savedUser = localStorage.getItem('viaticpro_current_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        // ignore
      }
    }
  }, []);

  // Save requests to localStorage when they change
  const saveRequests = (updatedRequests: ViaticRequest[]) => {
    setRequests(updatedRequests);
    localStorage.setItem('viaticpro_requests', JSON.stringify(updatedRequests));
  };

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    localStorage.setItem('viaticpro_current_user', JSON.stringify(loggedInUser));
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('viaticpro_current_user');
    setActiveTab('dashboard');
    setMobileMenuOpen(false);
  };

  // Easily switch roles inside the workspace to preview both interfaces
  const handleToggleRole = () => {
    if (!user) return;
    const newRole = user.role === 'admin' ? 'traveler' : 'admin';
    const updatedUser: User = newRole === 'admin' 
      ? {
          name: 'Valeria Alarcón',
          email: 'admin@corporate.com',
          role: 'admin',
          avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKf__83NDnNgXenJLlclLMpeDIzWCtehJjr5VO_dop5rGeUjnbUr-AjGgOlpfggn-Cmw3rAKj1k0FzpLktPuVXylLUkjnHzJNfy3cVwX1XRGN-Lh46GNCHE7kD3o9s-6u3pS1ldjwwsBguWRcEgAb0EJsZDj13VBBujBPpW4Zd4icY8csID0Sk3C3SUxdI9lloaMJMBzL4ZIHWS9oCyIi7KBiwd4UcAca-li_PCnpg9Z1V_-bE04Ayp0QFzN8HYxQ9WXKai4rWo5w'
        }
      : {
          name: 'ViaticPro Admin',
          email: 'traveler@corporate.com',
          role: 'traveler',
          avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAngpfjIpA-Epml-wsBR2zfEnxTt5Nn905NFmg-zREmnsG35_k9Ksg7jMrDoP7XUhms0QJK9GpfryUSnic7A8_sJ9HLMDHoIAWXEdaVn2d5gyrC_X3YWvSHVYxL_2tPryTTc7MINS9SL5l1v9mLUePFkGLXGBKFEzQHM1Ba4cKdJ0WAbzMJ7V8kSuyRIl8rxiBhs_5MGsjW1BCSRIRcZDSTtELuuczxl8O4JUZnsEqHPzWfrl1y2AvPzAClzCYqVnwEuqFFS70lguk'
        };
    setUser(updatedUser);
    localStorage.setItem('viaticpro_current_user', JSON.stringify(updatedUser));
    setActiveTab('dashboard');
  };

  // Submit new request
  const handleFormSubmitSuccess = (newRequest: ViaticRequest) => {
    const updated = [newRequest, ...requests];
    saveRequests(updated);
    setSelectedRequest(newRequest);
    setActiveTab('submitted_success');
  };

  // Approve a request as admin
  const handleApproveRequest = (requestId: string) => {
    const updated = requests.map(req => {
      if (req.id === requestId) {
        // Build completed timeline
        const updatedTimeline = req.timeline.map(step => {
          if (step.title === 'Revisión supervisor' || step.title === 'Aprobación financiera') {
            return { ...step, completed: true, active: false, date: 'Aprobado hoy' };
          }
          if (step.title === 'Pago pendiente') {
            return { ...step, completed: false, active: true, title: 'Listo para depósito', date: 'En proceso de transferencia' };
          }
          return step;
        });

        // Append log to history
        const newLog = {
          id: 'h-' + Date.now(),
          title: 'Aprobado por Administrador (Valeria Alarcón)',
          date: 'Hoy, justo ahora',
          type: 'success' as const,
          description: 'Presupuesto validado y autorizado para desembolso bancario inmediato.'
        };

        return {
          ...req,
          estado: 'Aprobado' as RequestStatus,
          timeline: updatedTimeline,
          history: [newLog, ...req.history]
        };
      }
      return req;
    });

    saveRequests(updated);

    // Find and set the selected request to showcase the 'aprobada' success screen
    const approvedReq = updated.find(r => r.id === requestId);
    if (approvedReq) {
      setSelectedRequest(approvedReq);
      setActiveTab('approved_success');
    }
  };

  // Reject a request as admin
  const handleRejectRequest = (requestId: string) => {
    const updated = requests.map(req => {
      if (req.id === requestId) {
        const updatedTimeline = req.timeline.map(step => {
          if (step.title === 'Aprobación financiera') {
            return { ...step, completed: false, active: true, title: 'Rechazado' };
          }
          return step;
        });

        const newLog = {
          id: 'h-' + Date.now(),
          title: 'Rechazado por Administrador (Valeria Alarcón)',
          date: 'Hoy, justo ahora',
          type: 'info' as const,
          description: 'La solicitud fue rechazada debido a inconsistencias con la política interna de viáticos corporativos.'
        };

        return {
          ...req,
          estado: 'Rechazado' as RequestStatus,
          timeline: updatedTimeline,
          history: [newLog, ...req.history]
        };
      }
      return req;
    });

    saveRequests(updated);
    alert('La solicitud fue rechazada con éxito.');
  };

  // Cancel/delete request from traveler
  const handleCancelRequest = (requestId: string) => {
    const updated = requests.map(req => {
      if (req.id === requestId) {
        return {
          ...req,
          estado: 'Rechazado' as RequestStatus,
          history: [
            {
              id: 'h-cancel-' + Date.now(),
              title: 'Cancelada por el colaborador',
              date: 'Hoy, justo ahora',
              type: 'info' as const,
              description: 'El colaborador canceló el viaje.'
            },
            ...req.history
          ]
        };
      }
      return req;
    });
    saveRequests(updated);
    setActiveTab('dashboard');
    alert('Solicitud cancelada correctamente.');
  };

  // Open Edit Modal/State
  const handleEditRequestClick = (req: ViaticRequest) => {
    setEditingRequest(req);
    setEditMonto(req.monto.toString());
    setEditMotivo(req.motivo);
  };

  // Save changes to request
  const handleSaveEditRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRequest) return;

    const updatedMonto = parseFloat(editMonto);
    if (isNaN(updatedMonto) || updatedMonto <= 0) {
      alert('Por favor ingrese un monto válido.');
      return;
    }
    if (!editMotivo.trim()) {
      alert('Por favor ingrese una justificación.');
      return;
    }

    const updated = requests.map(req => {
      if (req.id === editingRequest.id) {
        return {
          ...req,
          monto: updatedMonto,
          motivo: editMotivo,
          history: [
            {
              id: 'h-edit-' + Date.now(),
              title: 'Solicitud modificada por el colaborador',
              date: 'Hoy, justo ahora',
              type: 'send' as const,
              description: `Monto editado a $${updatedMonto.toFixed(2)}. Justificación: ${editMotivo}`
            },
            ...req.history
          ]
        };
      }
      return req;
    });

    saveRequests(updated);
    
    // Update active tracked request state too
    const updatedReq = updated.find(r => r.id === editingRequest.id);
    if (updatedReq) {
      setSelectedRequest(updatedReq);
    }

    setEditingRequest(null);
    alert('Solicitud actualizada correctamente.');
  };

  // Render the currently active subview
  const renderContentView = () => {
    if (!user) return null;

    switch (activeTab) {
      case 'dashboard':
        return user.role === 'admin' ? (
          <AdminApprovalView 
            requests={requests}
            onApproveRequest={handleApproveRequest}
            onRejectRequest={handleRejectRequest}
            onRequestClick={(req) => {
              setSelectedRequest(req);
              setActiveTab('status_tracking');
            }}
          />
        ) : (
          <DashboardView 
            user={user}
            requests={requests}
            onNewRequestClick={() => setActiveTab('new_request')}
            onRequestClick={(req) => {
              setSelectedRequest(req);
              setActiveTab('status_tracking');
            }}
          />
        );

      case 'new_request':
        return (
          <RequestFormView 
            user={user}
            onSubmitSuccess={handleFormSubmitSuccess}
            onCancel={() => setActiveTab('dashboard')}
          />
        );

      case 'status_tracking':
        return selectedRequest ? (
          <StatusTrackingView 
            request={selectedRequest}
            onBack={() => setActiveTab('dashboard')}
            onCancelRequest={handleCancelRequest}
            onEditRequest={handleEditRequestClick}
          />
        ) : (
          <div className="p-8 text-center bg-white border rounded-xl">
            <p className="text-secondary font-semibold">Seleccione una solicitud en el dashboard para ver su estado.</p>
          </div>
        );

      case 'submitted_success':
        return selectedRequest ? (
          <SuccessSplashView 
            type="enviada"
            request={selectedRequest}
            onPrimaryAction={() => setActiveTab('status_tracking')}
            onSecondaryAction={() => setActiveTab('dashboard')}
          />
        ) : null;

      case 'approved_success':
        return selectedRequest ? (
          <SuccessSplashView 
            type="aprobada"
            request={selectedRequest}
            onPrimaryAction={() => setActiveTab('dashboard')}
            onSecondaryAction={() => alert('Descargando comprobante fiscal de aprobación...')}
          />
        ) : null;

      case 'notifications':
        return <NotificationsView user={user} />;

      case 'profile':
        return <ProfileView user={user} onLogout={handleLogout} />;

      default:
        return (
          <div className="p-12 text-center bg-white border rounded-xl">
            <p className="font-semibold text-secondary">Pantalla no encontrada.</p>
          </div>
        );
    }
  };

  // Get localized header title
  const getHeaderTitle = () => {
    if (!user) return 'Acceso';
    switch (activeTab) {
      case 'dashboard':
        return user.role === 'admin' ? 'Panel de Aprobación' : 'Dashboard';
      case 'new_request':
        return 'Nueva Solicitud';
      case 'status_tracking':
        return 'Estado de Solicitud';
      case 'submitted_success':
        return 'Solicitud Enviada';
      case 'approved_success':
        return 'Solicitud Aprobada';
      case 'notifications':
        return 'Notificaciones';
      case 'profile':
        return 'Mi Perfil';
      default:
        return 'ViaticPro';
    }
  };

  // If no user is logged in, show the login screen
  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-background text-on-surface">
      {/* Mobile Drawer Slide overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-40 md:hidden"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-full w-72 z-50 md:hidden bg-white"
            >
              <div className="absolute top-4 right-4 z-50">
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 bg-surface-container rounded-full text-secondary hover:text-on-surface"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <Sidebar 
                user={user}
                activeTab={activeTab}
                setActiveTab={(tab) => {
                  setActiveTab(tab);
                  setMobileMenuOpen(false);
                }}
                onLogout={handleLogout}
                onToggleRole={() => {
                  handleToggleRole();
                  setMobileMenuOpen(false);
                }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Full Screen Layout */}
      <div className="flex w-full min-h-screen">
        {/* Desktop Sidebar (Permanent) */}
        <div className="hidden md:block w-72 shrink-0">
          <Sidebar 
            user={user}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onLogout={handleLogout}
            onToggleRole={handleToggleRole}
          />
        </div>

        {/* Content Section */}
        <div className="flex-1 min-w-0 flex flex-col min-h-screen">
          <Header 
            user={user}
            title={getHeaderTitle()}
            onMenuClick={() => setMobileMenuOpen(true)}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          <main className="flex-grow p-6 md:p-8 max-w-7xl mx-auto w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab + '-' + (selectedRequest?.id || '')}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                {renderContentView()}
              </motion.div>
            </AnimatePresence>
          </main>

          {/* Footer predicted from layout specifications */}
          <footer className="w-full py-6 px-8 border-t border-outline-variant bg-white">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs text-secondary gap-4">
              <div className="flex items-center gap-2">
                <span className="font-bold text-primary">ViaticPro</span>
                <span>© 2024 ViaticPro. Corporate Minimalism Design.</span>
              </div>
              <div className="flex gap-6">
                <a className="hover:text-primary transition-opacity duration-200" href="#privacy" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
                <a className="hover:text-primary transition-opacity duration-200" href="#support" onClick={(e) => e.preventDefault()}>Support</a>
                <a className="hover:text-primary transition-opacity duration-200" href="#terms" onClick={(e) => e.preventDefault()}>Terms of Service</a>
              </div>
            </div>
          </footer>
        </div>
      </div>

      {/* Quick Edit Overlay Modal */}
      {editingRequest && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full space-y-4 shadow-xl border border-outline-variant text-sm text-on-surface"
          >
            <div className="flex justify-between items-center border-b pb-3">
              <h4 className="text-base font-bold text-on-surface flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-primary" />
                Editar Solicitud #{editingRequest.id}
              </h4>
              <button 
                onClick={() => setEditingRequest(null)}
                className="p-1 hover:bg-surface-container rounded-full text-secondary"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEditRequest} className="space-y-4 pt-1">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-secondary uppercase">Monto Solicitado (USD)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-outline">$</span>
                  <input 
                    className="w-full pl-7 pr-4 py-2 border border-outline-variant rounded-lg text-right font-semibold text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                    type="number"
                    step="0.01"
                    min="1"
                    value={editMonto}
                    onChange={(e) => setEditMonto(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-secondary uppercase">Justificación del Viaje</label>
                <textarea 
                  className="w-full px-3 py-2 border border-outline-variant rounded-lg text-xs leading-relaxed focus:ring-2 focus:ring-primary focus:outline-none resize-none"
                  rows={3}
                  value={editMotivo}
                  onChange={(e) => setEditMotivo(e.target.value)}
                />
              </div>

              <div className="p-3 bg-surface-container-low rounded-lg border flex gap-2">
                <AlertTriangle className="w-5 h-5 text-primary shrink-0" />
                <p className="text-[11px] text-on-surface-variant leading-normal">
                  Al editar esta solicitud, se reiniciará el flujo de aprobación financiera y se le notificará a su supervisor.
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button 
                  type="button"
                  onClick={() => setEditingRequest(null)}
                  className="px-4 py-2 text-xs font-bold text-secondary hover:bg-surface-container rounded-lg"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 text-xs font-bold bg-primary text-white hover:bg-primary/95 rounded-lg active:scale-95 transition-all flex items-center gap-1"
                >
                  <Send className="w-3.5 h-3.5" />
                  Guardar Cambios
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
