import React, { useState, useEffect } from 'react';
import { EngineLogo } from './EngineLogo';
import { Volume2, VolumeX, Menu, X, ArrowUpRight } from 'lucide-react';
import { ferrariAudio } from '../audio/engineSound';

interface NavbarProps {
  onOpenConfigurator: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenConfigurator }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [liveRpm, setLiveRpm] = useState(850);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const interval = setInterval(() => {
      setLiveRpm(ferrariAudio.getCurrentRPM());
    }, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const toggleSound = () => {
    const nextState = !isMuted;
    setIsMuted(nextState);
    ferrariAudio.setMute(nextState);
  };

  const navLinks = [
    { label: 'Cuore V12', href: '#cuore-v12' },
    { label: 'Black Badge Showroom', href: '#showroom' },
    { label: 'Acoustic Chamber', href: '#soundstage' },
    { label: 'Engineering', href: '#engineering' },
    { label: 'Craftsmanship', href: '#craftsmanship' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'bg-black/85 backdrop-blur-xl border-b border-white/[0.08] py-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
          : 'bg-gradient-to-b from-black/80 via-black/30 to-transparent py-5 sm:py-7'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
        {/* Brand Cavallino Logo & Title */}
        <a href="#" className="flex items-center gap-3.5 group">
          <div className="transition-transform duration-300 group-hover:scale-110">
            <EngineLogo size={42} variant="chrome" className="group-hover:opacity-90 transition-opacity" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-sm tracking-[0.3em] font-bold text-white uppercase group-hover:text-neutral-200">
              Ferrari
            </span>
            <span className="text-[9px] tracking-[0.4em] font-sans text-neutral-400 uppercase -mt-0.5">
              Black Badge Edition
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs uppercase tracking-[0.2em] font-sans text-neutral-300 hover:text-white transition-colors duration-200 relative group py-1"
            >
              <span>{link.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-red-600 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right Utility: Audio Control & Bespoke Inquiry CTA */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Audio Equalizer & Mute Toggle */}
          <button
            onClick={toggleSound}
            aria-label={isMuted ? "Unmute Engine Audio" : "Mute Engine Audio"}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-neutral-300 hover:text-white transition-all text-xs"
            title={isMuted ? "Unmute V12 Audio" : "Mute V12 Audio"}
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-neutral-500" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-red-500 animate-pulse" />
            )}
            <span className="hidden sm:inline font-mono text-[10px] tracking-widest uppercase">
              {isMuted ? 'Muted' : `${liveRpm} RPM`}
            </span>
            {!isMuted && (
              <div className="flex items-end gap-0.5 h-3">
                <span className="w-0.5 bg-red-500 animate-pulse h-2" />
                <span className="w-0.5 bg-red-500 animate-pulse h-3 delay-75" />
                <span className="w-0.5 bg-red-500 animate-pulse h-1.5 delay-150" />
              </div>
            )}
          </button>

          {/* Bespoke Inquiry CTA */}
          <button
            onClick={onOpenConfigurator}
            className="hidden sm:flex items-center gap-2 px-5 py-2 rounded-full bg-red-600 hover:bg-red-500 text-white font-sans text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_0_20px_rgba(232,0,29,0.4)] hover:shadow-[0_0_30px_rgba(232,0,29,0.7)]"
          >
            <span>Commission</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-300 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[60px] bg-black/95 backdrop-blur-2xl border-b border-white/10 px-6 py-8 flex flex-col gap-6 shadow-2xl animate-in slide-in-from-top-4 duration-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-sans tracking-[0.25em] uppercase text-neutral-200 hover:text-red-500 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenConfigurator();
            }}
            className="w-full py-3 rounded-lg bg-red-600 text-white font-sans text-xs font-bold tracking-[0.2em] uppercase text-center mt-2 shadow-[0_0_20px_rgba(232,0,29,0.5)]"
          >
            Commission Atelier Viewing
          </button>
        </div>
      )}
    </header>
  );
};
