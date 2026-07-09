import React from 'react';
import { Layers, PlusCircle, FileText, Bell, User as UserIcon, LogOut, RefreshCw } from 'lucide-react';
import { User } from '../types';

interface SidebarProps {
  user: User;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  onToggleRole: () => void;
}

export default function Sidebar({ user, activeTab, setActiveTab, onLogout, onToggleRole }: SidebarProps) {
  return (
    <aside id="sidebar" className="fixed left-0 top-0 h-full z-40 flex flex-col p-4 bg-surface-container-low border-r border-outline-variant shadow-sm w-72 transition-all duration-150 ease-in-out">
      {/* Logo Section */}
      <div className="mb-8 flex items-center gap-3 px-2 pt-2">
        <Layers className="text-primary w-8 h-8" />
        <h1 className="font-sans text-xl font-bold text-primary">ViaticPro</h1>
      </div>

      {/* Profile Header */}
      <div className="flex items-center gap-3 p-3 mb-6 bg-surface-container-highest rounded-xl">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-primary-container flex items-center justify-center text-white font-semibold">
          {user.avatarUrl ? (
            <img className="w-full h-full object-cover" src={user.avatarUrl} alt={user.name} referrerPolicy="no-referrer" />
          ) : (
            user.name.charAt(0)
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-body-md text-sm font-semibold text-on-surface truncate">{user.name}</p>
          <p className="text-xs text-on-surface-variant truncate">{user.email}</p>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 flex flex-col gap-1">
        {user.role === 'traveler' && (
          <button
            onClick={() => setActiveTab('new_request')}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-semibold text-sm transition-all duration-150 ease-in-out ${
              activeTab === 'new_request'
                ? 'bg-primary-container text-white'
                : 'text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            <PlusCircle className="w-5 h-5" />
            <span>Nueva Solicitud</span>
          </button>
        )}

        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-semibold text-sm transition-all duration-150 ease-in-out ${
            activeTab === 'dashboard'
              ? user.role === 'admin'
                ? 'bg-primary text-white'
                : 'bg-secondary-container text-on-secondary-container'
              : 'text-on-surface-variant hover:bg-surface-container-high'
          }`}
        >
          <FileText className="w-5 h-5" />
          <span>{user.role === 'admin' ? 'Panel de Aprobación' : 'Mis Solicitudes'}</span>
        </button>

        <button
          onClick={() => setActiveTab('notifications')}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-semibold text-sm transition-all duration-150 ease-in-out ${
            activeTab === 'notifications'
              ? 'bg-secondary-container text-on-secondary-container'
              : 'text-on-surface-variant hover:bg-surface-container-high'
          }`}
        >
          <Bell className="w-5 h-5" />
          <span>Notificaciones</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-semibold text-sm transition-all duration-150 ease-in-out ${
            activeTab === 'profile'
              ? 'bg-secondary-container text-on-secondary-container'
              : 'text-on-surface-variant hover:bg-surface-container-high'
          }`}
        >
          <UserIcon className="w-5 h-5" />
          <span>Perfil</span>
        </button>
      </nav>

      {/* Role switcher for easy testing in AI Studio */}
      <div className="p-2 mb-2 bg-surface-container border border-outline-variant/30 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="text-[11px] text-secondary-variant">
            <span className="font-semibold text-primary">{user.role === 'admin' ? 'Vista Administrador' : 'Vista Empleado'}</span>
          </div>
          <button 
            onClick={onToggleRole}
            className="p-1 hover:bg-surface-container-high rounded text-primary transition-all flex items-center justify-center gap-1 text-[11px] font-medium"
            title="Cambiar rol"
          >
            <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" />
            <span>Alternar</span>
          </button>
        </div>
      </div>

      {/* Logout Button */}
      <div className="border-t border-outline-variant pt-3">
        <button
          onClick={onLogout}
          className="flex items-center gap-3 px-3 py-2.5 w-full text-left text-error hover:bg-error-container/20 rounded-lg transition-all duration-150 text-sm font-semibold"
        >
          <LogOut className="w-5 h-5" />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
}
