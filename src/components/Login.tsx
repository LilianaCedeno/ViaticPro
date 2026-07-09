import React, { useState } from 'react';
import { Layers, User, Lock, Eye, EyeOff, ArrowRight, Shield, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { User as UserType } from '../types';

interface LoginProps {
  onLogin: (user: UserType) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('traveler@corporate.com');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Por favor ingrese su usuario corporativo');
      return;
    }
    
    setIsLoading(true);
    setError('');

    // Simulate network delay
    setTimeout(() => {
      setIsLoading(false);
      if (email.toLowerCase().includes('admin')) {
        onLogin({
          name: 'Valeria Alarcón',
          email: 'admin@corporate.com',
          role: 'admin',
          avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKf__83NDnNgXenJLlclLMpeDIzWCtehJjr5VO_dop5rGeUjnbUr-AjGgOlpfggn-Cmw3rAKj1k0FzpLktPuVXylLUkjnHzJNfy3cVwX1XRGN-Lh46GNCHE7kD3o9s-6u3pS1ldjwwsBguWRcEgAb0EJsZDj13VBBujBPpW4Zd4icY8csID0Sk3C3SUxdI9lloaMJMBzL4ZIHWS9oCyIi7KBiwd4UcAca-li_PCnpg9Z1V_-bE04Ayp0QFzN8HYxQ9WXKai4rWo5w'
        });
      } else {
        onLogin({
          name: 'ViaticPro Admin',
          email: email,
          role: 'traveler',
          avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAngpfjIpA-Epml-wsBR2zfEnxTt5Nn905NFmg-zREmnsG35_k9Ksg7jMrDoP7XUhms0QJK9GpfryUSnic7A8_sJ9HLMDHoIAWXEdaVn2d5gyrC_X3YWvSHVYxL_2tPryTTc7MINS9SL5l1v9mLUePFkGLXGBKFEzQHM1Ba4cKdJ0WAbzMJ7V8kSuyRIl8rxiBhs_5MGsjW1BCSRIRcZDSTtELuuczxl8O4JUZnsEqHPzWfrl1y2AvPzAClzCYqVnwEuqFFS70lguk'
        });
      }
    }, 1200);
  };

  return (
    <div id="login_container" className="relative min-h-screen w-full flex items-center justify-center bg-background overflow-hidden px-4">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] bg-surface-container-high rounded-full blur-[120px] opacity-60"></div>
        <div className="absolute -bottom-[10%] -right-[5%] w-[50%] h-[50%] bg-primary-fixed rounded-full blur-[150px] opacity-40"></div>
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03]" 
          style={{ 
            backgroundImage: 'radial-gradient(circle, #003f87 1px, transparent 1px)', 
            backgroundSize: '40px 40px' 
          }}
        ></div>
      </div>

      <main className="relative z-10 w-full max-w-5xl py-12 flex flex-col md:flex-row items-center justify-center gap-16">
        {/* Branding Side (Left on Desktop) */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden md:flex flex-col max-w-md space-y-6 text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center text-white shadow-md">
              <Layers className="w-10 h-10 text-white" />
            </div>
            <h1 className="font-headline-lg text-3xl font-bold text-primary tracking-tight">ViaticPro</h1>
          </div>
          <p className="font-body-lg text-lg text-on-surface-variant leading-relaxed">
            Gestión inteligente de viáticos corporativos. Transparencia, eficiencia y control financiero en cada viaje de negocios.
          </p>
          
          <div className="flex flex-col gap-3 pt-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="text-primary w-5 h-5" />
              <span className="text-sm font-semibold text-secondary uppercase tracking-wider">Certificado ISO 27001</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="text-primary w-5 h-5" />
              <span className="text-sm font-semibold text-secondary uppercase tracking-wider">Cifrado de grado bancario</span>
            </div>
          </div>

          <div className="mt-4 p-4 bg-surface-container rounded-xl border border-outline-variant/50 max-w-sm">
            <p className="text-xs text-on-surface-variant font-medium">
              💡 <span className="font-semibold text-primary">Tip de acceso:</span> Usa <span className="font-mono bg-white px-1 py-0.5 rounded border">traveler@corporate.com</span> para vista de empleado y <span className="font-mono bg-white px-1 py-0.5 rounded border">admin@corporate.com</span> para panel de aprobación.
            </p>
          </div>
        </motion.div>

        {/* Login Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-full max-w-[420px] bg-white/85 backdrop-blur-md rounded-2xl shadow-xl p-8 flex flex-col space-y-6 border border-outline-variant"
        >
          {/* Mobile Header */}
          <div className="flex flex-col items-center text-center space-y-3 md:hidden">
            <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center text-white shadow-md mb-2">
              <Layers className="w-10 h-10 text-white" />
            </div>
            <h2 className="font-headline-md text-2xl font-bold text-primary">ViaticPro</h2>
            <p className="text-sm text-on-surface-variant">Acceso administrativo corporativo</p>
          </div>

          <div className="hidden md:block">
            <h2 className="font-headline-sm text-xl font-bold text-on-surface mb-1">Bienvenido de nuevo</h2>
            <p className="text-sm text-on-surface-variant">Ingresa tus credenciales para continuar</p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 bg-error-container text-on-error-container text-xs rounded-lg font-medium">
                {error}
              </div>
            )}
            
            <div className="space-y-1.5">
              <label className="font-label-md text-sm font-medium text-on-surface" htmlFor="username">
                Usuario corporativo
              </label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary w-5 h-5 transition-colors group-focus-within:text-primary" />
                <input 
                  className="w-full pl-12 pr-4 py-3 bg-white border border-outline-variant rounded-lg font-body-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all placeholder:text-outline-variant" 
                  id="username" 
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ej. j.perez@empresa.com"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="font-label-md text-sm font-medium text-on-surface" htmlFor="password">
                  Contraseña
                </label>
                <a className="text-xs font-semibold text-primary hover:underline transition-all" href="#forgot" onClick={(e) => e.preventDefault()}>
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary w-5 h-5 transition-colors group-focus-within:text-primary" />
                <input 
                  className="w-full pl-12 pr-12 py-3 bg-white border border-outline-variant rounded-lg font-body-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all placeholder:text-outline-variant" 
                  id="password" 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={isLoading}
                />
                <button 
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary hover:text-on-surface transition-colors cursor-pointer" 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 py-1">
              <input 
                className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary" 
                id="remember" 
                type="checkbox"
                defaultChecked 
              />
              <label className="font-body-sm text-xs text-on-surface-variant cursor-pointer select-none" htmlFor="remember">
                Recordar sesión en este equipo
              </label>
            </div>

            <button 
              className="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold text-sm hover:bg-primary-container active:scale-[0.98] transition-all duration-200 shadow-sm flex items-center justify-center gap-2 disabled:opacity-80" 
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Procesando...
                </>
              ) : (
                <>
                  Ingresar
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Quick-select Mobile Tips */}
          <div className="md:hidden p-3 bg-surface-container rounded-lg border text-center">
            <p className="text-[11px] text-on-surface-variant font-medium">
              💡 Acceso rápido: prueba con <span className="font-semibold text-primary underline" onClick={() => setEmail('admin@corporate.com')}>admin@corporate.com</span> o <span className="font-semibold text-primary underline" onClick={() => setEmail('traveler@corporate.com')}>traveler@corporate.com</span>
            </p>
          </div>

          <div className="pt-4 border-t border-outline-variant text-center">
            <p className="text-xs text-on-surface-variant">
              ¿No tienes una cuenta? {' '}
              <a className="text-primary font-semibold hover:underline" href="#contact-hr" onClick={(e) => e.preventDefault()}>
                Contacta con Recursos Humanos
              </a>
            </p>
          </div>
        </motion.div>
      </main>

      {/* Footer for Login Screen */}
      <footer className="absolute bottom-0 left-0 w-full p-4 z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2 opacity-60 text-xs text-secondary">
          <span>© 2024 ViaticPro. Corporate Minimalism Design.</span>
          <div className="flex items-center gap-4">
            <a className="hover:text-primary transition-colors" href="#privacy" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
            <a className="hover:text-primary transition-colors" href="#support" onClick={(e) => e.preventDefault()}>Support</a>
            <a className="hover:text-primary transition-colors" href="#terms" onClick={(e) => e.preventDefault()}>Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
