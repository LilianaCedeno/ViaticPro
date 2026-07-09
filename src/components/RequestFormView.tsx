import React, { useState, useRef } from 'react';
import { Info, CheckCircle, MapPin, ChevronRight, User, Compass, UploadCloud, Send, FileText, X } from 'lucide-react';
import { motion } from 'motion/react';
import { ViaticRequest, User as UserType } from '../types';

interface RequestFormProps {
  user: UserType;
  onSubmitSuccess: (newRequest: ViaticRequest) => void;
  onCancel: () => void;
}

export default function RequestFormView({ user, onSubmitSuccess, onCancel }: RequestFormProps) {
  const [destino, setDestino] = useState('');
  const [area, setArea] = useState('Ventas');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaTermino, setFechaTermino] = useState('');
  const [monto, setMonto] = useState('');
  const [motivo, setMotivo] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const selectDestination = (dest: string) => {
    setDestino(dest);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!destino.trim()) {
      setError('Por favor ingrese el destino de su viaje');
      return;
    }
    if (!fechaInicio) {
      setError('Por favor seleccione la fecha de inicio');
      return;
    }
    if (!fechaTermino) {
      setError('Por favor seleccione la fecha de término');
      return;
    }
    if (new Date(fechaInicio) > new Date(fechaTermino)) {
      setError('La fecha de inicio no puede ser posterior a la fecha de término');
      return;
    }
    if (!monto || parseFloat(monto) <= 0) {
      setError('Por favor ingrese un monto solicitado válido');
      return;
    }
    if (!motivo.trim() || motivo.length < 10) {
      setError('Por favor describa brevemente el motivo de su viaje (mínimo 10 caracteres)');
      return;
    }

    setIsSubmitting(true);

    // Create new travel allowance request
    const randomId = `RQ-2024-${Math.floor(100 + Math.random() * 900)}`;
    const today = new Date();
    const formattedToday = today.toLocaleDateString('es-MX', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).replace('.', '');

    const newRequest: ViaticRequest = {
      id: randomId,
      colaborador: user.name,
      email: user.email,
      area: area,
      destino: destino,
      fechaInicio: fechaInicio,
      fechaTermino: fechaTermino,
      monto: parseFloat(monto),
      motivo: motivo,
      estado: 'Pendiente',
      fechaEnvio: formattedToday,
      comprobanteName: file ? file.name : 'comprobante_fiscal.pdf',
      estimatedApprovalDate: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('es-MX', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }),
      timeline: [
        { title: 'Solicitud enviada', date: `${formattedToday} 09:30`, completed: true, active: false },
        { title: 'Revisión supervisor', date: 'En revisión...', completed: false, active: true },
        { title: 'Aprobación financiera', date: 'Pendiente', completed: false, active: false },
        { title: 'Pago pendiente', date: 'Pendiente', completed: false, active: false }
      ],
      history: [
        {
          id: 'h-' + Date.now(),
          title: 'Solicitud enviada por el empleado',
          date: 'Hoy, 09:30 AM',
          type: 'send',
          description: motivo
        }
      ]
    };

    setTimeout(() => {
      setIsSubmitting(false);
      onSubmitSuccess(newRequest);
    }, 1500);
  };

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Left Column: Guidelines & Illustration */}
      <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
        {/* Guidelines Card */}
        <div className="bg-primary text-white p-6 rounded-xl shadow-sm flex flex-col justify-between overflow-hidden relative min-h-[300px]">
          <div className="relative z-10">
            <Info className="w-12 h-12 mb-4 text-white/90" />
            <h3 className="font-headline-sm text-lg font-bold mb-2 text-white">Directrices de Viaje</h3>
            <p className="font-body-md text-sm text-white/90 mb-6 leading-relaxed">
              Asegúrese de completar todos los campos obligatorios para agilizar el proceso de aprobación de su viático.
            </p>
            <ul className="flex flex-col gap-3 text-white/80">
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-white/90 shrink-0" />
                <span className="text-xs font-semibold uppercase tracking-wider">Adjuntar comprobantes fiscales</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-white/90 shrink-0" />
                <span className="text-xs font-semibold uppercase tracking-wider">Justificar el motivo del viaje</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-white/90 shrink-0" />
                <span className="text-xs font-semibold uppercase tracking-wider">Montos según tabulador de área</span>
              </li>
            </ul>
          </div>
          
          <div className="absolute -bottom-8 -right-8 opacity-10 transform rotate-12">
            <svg className="w-48 h-48 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L14 19v-5.5l7 2.5z"/>
            </svg>
          </div>
        </div>

        {/* Popular Destinations List */}
        <div className="bg-white p-6 rounded-xl border border-outline-variant shadow-sm">
          <h4 className="text-xs text-secondary uppercase font-bold tracking-wider mb-4">
            Próximos Destinos Populares
          </h4>
          <div className="space-y-2">
            {[
              'Ciudad de México',
              'Monterrey, NL',
              'Guadalajara, JAL',
              'San Francisco, CA',
              'Madrid, España'
            ].map((dest) => (
              <div 
                key={dest}
                onClick={() => selectDestination(dest)}
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                  destino === dest 
                    ? 'bg-surface-container-high border-l-4 border-primary' 
                    : 'hover:bg-surface-container-low border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center border border-outline-variant/50">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-on-surface">{dest}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-outline-variant" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: The Form */}
      <div className="col-span-12 lg:col-span-8">
        <div className="bg-white p-8 rounded-xl border border-outline-variant shadow-sm">
          {error && (
            <div className="p-4 bg-error-container text-on-error-container text-sm rounded-lg font-medium mb-6">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Colaborador */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-on-surface-variant">Colaborador</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
                  <input 
                    className="w-full pl-10 pr-4 py-2.5 border border-outline-variant rounded-lg font-body-md text-sm bg-surface-container-low cursor-not-allowed text-on-surface/70" 
                    type="text" 
                    value={user.name} 
                    readOnly 
                  />
                </div>
              </div>

              {/* Área */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-on-surface-variant">Área</label>
                <select 
                  className="w-full px-4 py-2.5 border border-outline-variant rounded-lg font-body-md text-sm bg-white focus:ring-2 focus:ring-primary focus:outline-none"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                >
                  <option>Ventas</option>
                  <option>Marketing</option>
                  <option>Ingeniería</option>
                  <option>Administración</option>
                </select>
              </div>
            </div>

            {/* Destino */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-on-surface-variant">Destino</label>
              <div className="relative">
                <Compass className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
                <input 
                  className="w-full pl-10 pr-4 py-2.5 border border-outline-variant rounded-lg font-body-md text-sm focus:ring-2 focus:ring-primary focus:outline-none focus:border-transparent transition-all placeholder:text-outline-variant" 
                  placeholder="Ej. San Francisco, CA" 
                  type="text"
                  value={destino}
                  onChange={(e) => setDestino(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Fecha Inicio */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-on-surface-variant">Fecha de Inicio</label>
                <input 
                  className="w-full px-4 py-2.5 border border-outline-variant rounded-lg font-body-md text-sm focus:ring-2 focus:ring-primary focus:outline-none" 
                  type="date"
                  value={fechaInicio}
                  onChange={(e) => setFechaInicio(e.target.value)}
                />
              </div>
              {/* Fecha Término */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-on-surface-variant">Fecha de Término</label>
                <input 
                  className="w-full px-4 py-2.5 border border-outline-variant rounded-lg font-body-md text-sm focus:ring-2 focus:ring-primary focus:outline-none" 
                  type="date"
                  value={fechaTermino}
                  onChange={(e) => setFechaTermino(e.target.value)}
                />
              </div>
            </div>

            {/* Monto Solicitado */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-on-surface-variant">Monto Solicitado (USD)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-outline text-sm">$</span>
                <input 
                  className="w-full pl-8 pr-4 py-2.5 border border-outline-variant rounded-lg font-body-md text-sm text-right focus:ring-2 focus:ring-primary focus:outline-none focus:border-transparent placeholder:text-outline-variant" 
                  placeholder="0.00" 
                  type="number"
                  step="0.01"
                  min="0"
                  value={monto}
                  onChange={(e) => setMonto(e.target.value)}
                />
              </div>
            </div>

            {/* Motivo del Viaje */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-on-surface-variant">Motivo del Viaje</label>
              <textarea 
                className="w-full px-4 py-2.5 border border-outline-variant rounded-lg font-body-md text-sm focus:ring-2 focus:ring-primary focus:outline-none resize-none" 
                placeholder="Describa brevemente el propósito comercial..." 
                rows={3}
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
              />
            </div>

            {/* Adjuntar Comprobantes */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-on-surface-variant">Adjuntar Comprobantes</label>
              
              <div 
                className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-2 transition-all cursor-pointer group ${
                  dragActive 
                    ? 'border-primary bg-surface-container-high' 
                    : file 
                      ? 'border-green-400 bg-green-50/20'
                      : 'border-outline-variant bg-surface-container-low hover:bg-surface-container'
                }`}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <UploadCloud className={`w-10 h-10 transition-colors ${
                  file ? 'text-green-600' : 'text-outline group-hover:text-primary'
                }`} />
                
                {file ? (
                  <div className="text-center">
                    <p className="text-sm font-semibold text-green-700 flex items-center justify-center gap-1.5">
                      <FileText className="w-4 h-4" />
                      {file.name}
                    </p>
                    <p className="text-xs text-on-surface-variant mt-0.5">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB · Haz clic para cambiar archivo
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-sm font-semibold text-on-surface">Haz clic para subir o arrastra aquí</p>
                    <p className="text-xs text-on-surface-variant mt-0.5">PDF, JPG o PNG (máx. 10MB)</p>
                  </div>
                )}
                
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                />
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex justify-end gap-4 pt-6 border-t border-outline-variant">
              <button 
                type="button"
                onClick={onCancel}
                className="px-6 py-2.5 font-semibold text-sm text-secondary hover:bg-surface-container transition-all rounded-lg cursor-pointer"
                disabled={isSubmitting}
              >
                Cancelar
              </button>
              
              <button 
                type="submit"
                className="px-6 py-2.5 font-semibold text-sm bg-primary-container text-white hover:opacity-90 active:scale-95 transition-all rounded-lg flex items-center gap-2 cursor-pointer disabled:opacity-80"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Enviar Solicitud
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
