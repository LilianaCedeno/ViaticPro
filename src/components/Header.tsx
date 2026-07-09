import React from 'react';
import { Menu, Bell } from 'lucide-react';
import { User } from '../types';

interface HeaderProps {
  user: User;
  title: string;
  onMenuClick: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Header({ user, title, onMenuClick, activeTab, setActiveTab }: HeaderProps) {
  return (
    <header className="bg-surface-container-lowest border-b border-outline-variant docked full-width top-0 sticky z-30 h-16 flex items-center">
      <div className="flex justify-between items-center w-full px-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <button 
            onClick={onMenuClick}
            className="md:hidden p-2 hover:bg-surface-container rounded-full transition-colors active:scale-95 duration-200"
          >
            <Menu className="w-5 h-5 text-secondary" />
          </button>
          <h1 className="text-xl font-bold text-primary">{title}</h1>
        </div>

        <div className="flex items-center gap-4">
          {/* Notifications bell */}
          <div 
            onClick={() => setActiveTab('notifications')}
            className={`relative cursor-pointer active:scale-95 duration-200 transition-colors p-2 rounded-full hover:bg-surface-container ${
              activeTab === 'notifications' ? 'bg-surface-container' : ''
            }`}
          >
            <Bell className="w-5 h-5 text-primary" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full"></span>
          </div>

          {/* User headshot avatar */}
          <div 
            onClick={() => setActiveTab('profile')}
            className={`w-9 h-9 rounded-full border border-outline-variant overflow-hidden cursor-pointer active:scale-95 duration-200 hover:ring-2 hover:ring-primary/40 transition-all ${
              activeTab === 'profile' ? 'ring-2 ring-primary' : ''
            }`}
          >
            {user.avatarUrl ? (
              <img className="w-full h-full object-cover" src={user.avatarUrl} alt={user.name} referrerPolicy="no-referrer" />
            ) : (
              <div className="w-full h-full bg-primary flex items-center justify-center text-white text-xs font-semibold">
                {user.name.charAt(0)}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
