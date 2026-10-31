import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, ChevronUp, ChevronDown, Check } from 'lucide-react';
import type { ThemeId } from '../types/profile';
import { luxuryAudio } from '../utils/audio';

interface ThemeSwitcherProps {
  currentTheme: ThemeId;
  onThemeChange: (theme: ThemeId) => void;
}

interface ThemeOption {
  id: ThemeId;
  name: string;
  tagline: string;
  swatches: string[];
}

const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'obsidian',
    name: 'Obsidian Luxury',
    tagline: 'Deep black & champagne metallic',
    swatches: ['#070709', '#C5A059', '#F8F9FA'],
  },
  {
    id: 'ivory',
    name: 'Ivory Editorial',
    tagline: 'Warm cream & magazine serif',
    swatches: ['#FAF7F2', '#7A3E26', '#181716'],
  },
  {
    id: 'executive',
    name: 'Modern Executive',
    tagline: 'Prestige navy & cobalt azure',
    swatches: ['#090E1A', '#0EA5E9', '#F8FAFC'],
  },
  {
    id: 'atelier',
    name: 'Creative Atelier',
    tagline: 'Avant-garde dark & terracotta',
    swatches: ['#0E0F12', '#F97316', '#FFFFFF'],
  },
  {
    id: 'signature',
    name: 'Signature Brand',
    tagline: 'Bespoke custom client palette',
    swatches: ['#0C0A09', '#D4AF37', '#FAFAF9'],
  },
];

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ currentTheme, onThemeChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (themeId: ThemeId) => {
    luxuryAudio.playChime(600, 0.4);
    onThemeChange(themeId);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="mb-3 p-3.5 bg-[var(--theme-surface)]/95 backdrop-blur-2xl border border-[var(--theme-border-hover)]/30 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] w-72 overflow-hidden"
          >
            <div className="px-2 py-1 mb-2 border-b border-[var(--theme-border)]/60 flex items-center justify-between">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[var(--theme-text-muted)]">
                Art-Directed Palettes
              </span>
              <span className="text-[9px] text-[var(--theme-accent)] font-semibold uppercase tracking-wider">
                5 Luxury Presets
              </span>
            </div>

            <div className="space-y-1.5">
              {THEME_OPTIONS.map((theme) => {
                const isActive = currentTheme === theme.id;
                return (
                  <button
                    key={theme.id}
                    onClick={() => handleSelect(theme.id)}
                    className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
                      isActive
                        ? 'bg-[var(--theme-surface-hover)] border border-[var(--theme-border-hover)]'
                        : 'hover:bg-[var(--theme-surface-hover)] border border-transparent'
                    }`}
                  >
                    <div className="min-w-0 pr-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-[var(--theme-text-primary)] tracking-wide">
                          {theme.name}
                        </span>
                        {isActive && <Check className="w-3.5 h-3.5 text-[var(--theme-accent)]" />}
                      </div>
                      <p className="text-[10px] text-[var(--theme-text-secondary)] truncate">
                        {theme.tagline}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {theme.swatches.map((color, idx) => (
                        <span
                          key={idx}
                          className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-xs"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Pill */}
      <button
        onClick={() => {
          luxuryAudio.playHapticTick();
          setIsOpen(!isOpen);
        }}
        className="group flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[var(--theme-surface)]/90 hover:bg-[var(--theme-surface)] backdrop-blur-2xl border border-[var(--theme-border-hover)]/40 text-[var(--theme-text-primary)] shadow-2xl transition-all cursor-pointer active:scale-95 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
        aria-label="Toggle luxury theme switcher"
      >
        <Palette className="w-3.5 h-3.5 text-[var(--theme-accent)] transition-transform group-hover:rotate-12" />
        <span className="text-[11px] font-medium tracking-wide">
          Theme: <span className="font-semibold text-[var(--theme-accent)] capitalize">{currentTheme}</span>
        </span>
        {isOpen ? <ChevronDown className="w-3.5 h-3.5 text-[var(--theme-text-muted)]" /> : <ChevronUp className="w-3.5 h-3.5 text-[var(--theme-text-muted)]" />}
      </button>
    </div>
  );
};
