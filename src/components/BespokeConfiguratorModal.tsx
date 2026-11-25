import React, { useState } from 'react';
import { X, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { Cavallino } from './Cavallino';

interface BespokeConfiguratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCar?: string;
}

export const BespokeConfiguratorModal: React.FC<BespokeConfiguratorModalProps> = ({
  isOpen,
  onClose,
  initialCar = '12Cilindri Black Badge'
}) => {
  const [selectedModel, setSelectedModel] = useState(initialCar);
  const [selectedFinish, setSelectedFinish] = useState('Nero Puro');
  const [selectedInterior, setSelectedInterior] = useState('Alcantara & Rosso Stitch');
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: 'United Kingdom',
    currentCollection: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const resetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-300">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-neutral-950 border border-white/10 rounded-3xl p-6 sm:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.95)] text-white">
        
        {/* Close Button */}
        <button
          onClick={resetAndClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-3">
                <Cavallino size={36} className="text-red-500" />
              </div>
              <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-red-500">
                Atelier Maranello &bull; Private Commission
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-light tracking-[0.15em] uppercase text-white mt-1">
                Commission Your <span className="font-bold text-red-500">Dark Horse</span>
              </h3>
              <p className="text-xs text-neutral-400 font-sans tracking-wider max-w-md mx-auto mt-2">
                Initiate a bespoke consultation with a Maranello Atelier specialist. Every Black Badge allocation is tailored to individual client patron specifications.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Model Selection */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
                  Select Model
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    '12Cilindri Black Badge',
                    'Daytona SP3 Nero',
                    '812 Competizione',
                    'Purosangue Black'
                  ].map((model) => (
                    <button
                      key={model}
                      type="button"
                      onClick={() => setSelectedModel(model)}
                      className={`p-3 rounded-xl text-left border text-xs font-sans transition-all duration-200 ${
                        selectedModel.toLowerCase().includes(model.toLowerCase().slice(0, 5))
                          ? 'bg-red-600/20 border-red-500 text-white shadow-[0_0_15px_rgba(232,0,29,0.3)]'
                          : 'bg-neutral-900/60 border-white/[0.08] text-neutral-400 hover:border-white/20'
                      }`}
                    >
                      <div className="font-semibold">{model}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Bespoke Exterior Finish */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
                  Bespoke Exterior Finish
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { name: 'Nero Puro', hex: '#0a0a0c' },
                    { name: 'Rosso Corsa Scuro', hex: '#8a0010' },
                    { name: 'Carbonio Forgiato', hex: '#1c1d22' },
                    { name: 'Titanio Satinato', hex: '#58595e' }
                  ].map((finish) => (
                    <button
                      key={finish.name}
                      type="button"
                      onClick={() => setSelectedFinish(finish.name)}
                      className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-sans transition-all duration-200 ${
                        selectedFinish === finish.name
                          ? 'bg-red-600/20 border-red-500 text-white'
                          : 'bg-neutral-900/60 border-white/[0.08] text-neutral-400 hover:border-white/20'
                      }`}
                    >
                      <span className="w-3.5 h-3.5 rounded-full border border-white/20 flex-shrink-0" style={{ backgroundColor: finish.hex }} />
                      <span className="truncate">{finish.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Client Contact Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Lord Sterling"
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="client@atelier.ferrari.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1">
                    Direct Contact Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+44 20 7946 0991"
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1">
                    Preferred Atelier Country
                  </label>
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:outline-none focus:border-red-500"
                  >
                    <option>United Kingdom (Mayfair)</option>
                    <option>Italy (Maranello Factory)</option>
                    <option>United States (Beverly Hills)</option>
                    <option>United Arab Emirates (Dubai)</option>
                    <option>Switzerland (Geneva)</option>
                    <option>Monaco (Monte Carlo)</option>
                  </select>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-sans text-xs font-bold tracking-[0.25em] uppercase transition-all duration-300 shadow-[0_0_30px_rgba(232,0,29,0.5)] flex items-center justify-center gap-2"
                >
                  <span>Submit Atelier Commission Dossier</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-400 tracking-wider uppercase mt-3">
                  <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Strict Confidentiality Guaranteed &bull; Scuderia Ferrari VIP Protocols</span>
                </div>
              </div>

            </form>
          </div>
        ) : (
          <div className="text-center py-10 space-y-4">
            <div className="w-16 h-16 rounded-full bg-red-600/20 border border-red-500 text-red-500 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(232,0,29,0.5)]">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-light tracking-wide uppercase text-white">
              Commission Dossier Transmitted
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 font-sans tracking-wide max-w-md mx-auto leading-relaxed">
              Thank you, <span className="font-bold text-white">{formData.fullName || 'Patron'}</span>. Your bespoke specification for the <span className="text-red-500 font-semibold">{selectedModel}</span> in <span className="text-white font-semibold">{selectedFinish}</span> has been forwarded to the Private Client Directorate in Maranello.
            </p>
            <p className="text-xs text-neutral-400 font-mono tracking-widest uppercase">
              Reference: BB-MARANELLO-{Math.floor(100000 + Math.random() * 900000)}
            </p>
            <div className="pt-4">
              <button
                onClick={resetAndClose}
                className="px-8 py-3 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-mono uppercase tracking-widest border border-white/20 transition-colors"
              >
                Return to Experience
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
