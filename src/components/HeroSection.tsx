import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, UserPlus, ArrowUpRight, Sparkles, CheckCircle2, QrCode, Sun, Moon } from 'lucide-react';
import type { ProfileConfig } from '../types/profile';
import { luxuryAudio } from '../utils/audio';

interface HeroSectionProps {
  profile: ProfileConfig;
  onSaveContact: () => void;
  onExploreWork: () => void;
  onOpenShare?: () => void;
  themeMode?: 'dark' | 'light';
  onToggleThemeMode?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  profile,
  onSaveContact,
  onExploreWork,
  onOpenShare,
  themeMode = 'dark',
  onToggleThemeMode,
}) => {
  return (
    <section className="relative w-full overflow-hidden pb-8">
      {/* 1. Cinematic Panoramic Header Banner */}
      <div className="relative w-full h-44 sm:h-52 overflow-hidden bg-gradient-to-b from-[var(--theme-surface-hover)] to-[var(--theme-bg)]">
        {profile.coverUrl ? (
          <img
            src={profile.coverUrl}
            alt="Header Banner"
            className="w-full h-full object-cover filter brightness-[0.92] contrast-[1.08] transition-transform duration-700 ease-out hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-luxury-grain opacity-40" />
        )}

        {/* Ambient Gradient Overlays for Seamless Blending into Profile Background */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--theme-bg)] via-[var(--theme-bg)]/45 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-black/25 to-black/70 pointer-events-none" />

        {/* Top Floating Utility Bar */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 z-20">
          {/* Availability Status Badge */}
          {profile.availability ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--theme-accent)] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--theme-accent)]" />
              </span>
              <span className="text-[10px] font-medium tracking-wide text-white/95">
                {profile.availability.note}
              </span>
            </div>
          ) : (
            <div />
          )}

          {/* Dark / Light Mode Toggle */}
          {onToggleThemeMode && (
            <button
              onClick={() => {
                luxuryAudio.playHapticTick();
                onToggleThemeMode();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 hover:border-white/30 text-white/90 hover:text-white transition-all cursor-pointer shadow-sm active:scale-95 text-[10px] font-mono uppercase tracking-wider ml-auto"
              aria-label="Toggle dark and light mode"
              title={`Switch to ${themeMode === 'dark' ? 'light' : 'dark'} mode`}
            >
              {themeMode === 'dark' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-white" />
                  <span>Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-white" />
                  <span>Dark</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* 2. Main Identity & Elevated Overlapping Avatar */}
      <div className="relative px-4 flex flex-col items-center -mt-16 sm:-mt-18 z-20">
        
        {/* Sculpted Avatar with Monochrome Aura */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-3 group"
        >
          {/* Subtle Glow Halo */}
          <div className="absolute -inset-1 rounded-3xl bg-[var(--theme-border-hover)]/30 blur-md opacity-60 group-hover:opacity-100 transition-opacity" />

          {/* Avatar Container with Theme Background Border */}
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden border-4 border-[var(--theme-bg)] bg-[var(--theme-surface)] shadow-[0_15px_35px_rgba(0,0,0,0.5)]">
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="w-full h-full object-cover object-center filter brightness-[0.98] contrast-[1.02] group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Luxury Verified Checkmark Stamp */}
          <div
            title="Verified NFC Digital Identity"
            className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[var(--theme-btn-bg)] text-[var(--theme-btn-text)] flex items-center justify-center shadow-lg border-2 border-[var(--theme-bg)] transition-transform group-hover:scale-110"
          >
            <CheckCircle2 className="w-4 h-4 fill-[var(--theme-btn-text)] text-[var(--theme-btn-bg)]" />
          </div>
        </motion.div>

        {/* Identity Badges: Monogram NFC Stamp & Location */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--theme-surface)] border border-[var(--theme-border)] text-[9px] font-mono tracking-[0.18em] uppercase text-[var(--theme-text-muted)] mb-2.5 shadow-2xs"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)]" />
          <span>NFC Digital Card</span>
          {profile.location && (
            <>
              <span className="opacity-40">·</span>
              <span className="inline-flex items-center gap-1 text-[var(--theme-text-secondary)]">
                <MapPin className="w-2.5 h-2.5" />
                {profile.location}
              </span>
            </>
          )}
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-theme-heading text-3xl sm:text-4xl font-bold tracking-tight text-[var(--theme-text-primary)] text-center leading-tight mb-1"
        >
          {profile.name}
        </motion.h1>

        {/* Professional Title (without credentials) */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.25 }}
          className="text-xs font-mono uppercase tracking-[0.18em] text-[var(--theme-text-secondary)] font-semibold text-center mb-1.5"
        >
          {profile.title}
        </motion.div>

        {/* Company Affiliation */}
        {profile.company && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.3 }}
            className="text-[11px] font-theme-heading tracking-widest uppercase text-[var(--theme-text-muted)] font-medium text-center mb-3"
          >
            {profile.company}
          </motion.div>
        )}

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="text-xs sm:text-sm text-[var(--theme-text-secondary)] text-center font-light leading-relaxed mb-6 max-w-sm px-3"
        >
          {profile.tagline}
        </motion.p>

        {/* Action Suite: Primary Save Contact Button & Secondary Row */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-full space-y-2.5"
        >
          {/* Primary "Save Contact Card (.vcf)" with Clean High-Contrast Shimmer */}
          <button
            onClick={() => {
              luxuryAudio.playHapticTick();
              onSaveContact();
            }}
            className="btn-shimmer group relative w-full py-4 px-6 rounded-2xl bg-[var(--theme-btn-bg)] hover:bg-[var(--theme-btn-hover)] text-[var(--theme-btn-text)] font-semibold text-xs tracking-[0.18em] uppercase transition-all duration-300 shadow-lg flex items-center justify-center gap-2.5 cursor-pointer active:scale-[0.98]"
          >
            <UserPlus className="w-4 h-4 transition-transform group-hover:scale-110" />
            <span className="font-bold">Save Contact to Phone</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-btn-text)]/40" />
          </button>

          {/* Secondary Action Row: Selected Works + Share / QR */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                luxuryAudio.playHapticTick();
                onExploreWork();
              }}
              className="py-3 px-4 rounded-xl bg-[var(--theme-surface)] hover:bg-[var(--theme-surface-hover)] border border-[var(--theme-border)] hover:border-[var(--theme-border-hover)] text-[var(--theme-text-primary)] font-medium text-[11px] tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 shadow-2xs"
            >
              <span>Selected Works</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
            </button>

            <button
              onClick={() => {
                luxuryAudio.playHapticTick();
                if (onOpenShare) onOpenShare();
              }}
              className="py-3 px-4 rounded-xl bg-[var(--theme-surface)] hover:bg-[var(--theme-surface-hover)] border border-[var(--theme-border)] hover:border-[var(--theme-border-hover)] text-[var(--theme-text-primary)] font-medium text-[11px] tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 shadow-2xs"
            >
              <QrCode className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
              <span>Share &amp; QR</span>
            </button>
          </div>
        </motion.div>

        {/* Tap NFC Prompt */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 flex items-center justify-center gap-1.5 text-[10px] text-[var(--theme-text-muted)] tracking-wide text-center"
        >
          <Sparkles className="w-3 h-3 text-[var(--theme-accent)] shrink-0" />
          <span>Tap NFC Card or scan QR anytime to sync</span>
        </motion.div>

      </div>
    </section>
  );
};
