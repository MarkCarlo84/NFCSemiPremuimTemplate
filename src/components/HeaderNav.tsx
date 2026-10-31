import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Share2, UserPlus } from 'lucide-react';
import type { ProfileConfig } from '../types/profile';
import { luxuryAudio } from '../utils/audio';

interface HeaderNavProps {
  profile: ProfileConfig;
  onSaveContact: () => void;
  onOpenShare: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ profile, onSaveContact, onOpenShare }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const muted = luxuryAudio.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      luxuryAudio.playChime(640, 0.4);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      <div
        className={`w-full px-4 transition-all duration-300 ${
          isScrolled
            ? 'py-2.5 bg-[var(--theme-bg)]/85 backdrop-blur-2xl border-b border-[var(--theme-border)] shadow-md'
            : 'py-3.5 bg-gradient-to-b from-black/40 via-transparent to-transparent'
        }`}
      >
        <div className="flex items-center justify-between gap-2">
          {/* Brand Monogram & Name */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[var(--theme-surface-hover)] to-[var(--theme-surface)] border border-[var(--theme-border-hover)] flex items-center justify-center text-[var(--theme-accent)] font-theme-heading font-semibold text-xs tracking-wider shadow-sm shrink-0">
              {profile.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
            </div>
            <div className="min-w-0">
              <span className="font-theme-heading text-xs tracking-wider uppercase font-semibold text-[var(--theme-text-primary)] block truncate">
                {profile.company || profile.name}
              </span>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)] animate-pulse" />
                <span className="text-[9px] font-mono text-[var(--theme-text-muted)] tracking-wider truncate">
                  NFC Card Connected
                </span>
              </div>
            </div>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Ambient Sound Toggle */}
            <button
              onClick={toggleSound}
              title={isMuted ? 'Unmute luxury chime' : 'Mute luxury chime'}
              className="w-8 h-8 rounded-full bg-[var(--theme-surface)]/80 hover:bg-[var(--theme-surface-hover)] border border-[var(--theme-border)] flex items-center justify-center text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] transition-all cursor-pointer shadow-xs active:scale-95"
              aria-label="Toggle sound"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[var(--theme-accent)]" />}
            </button>

            {/* Share / QR Modal Trigger */}
            <button
              onClick={() => {
                luxuryAudio.playHapticTick();
                onOpenShare();
              }}
              title="Share profile or view QR"
              className="w-8 h-8 rounded-full bg-[var(--theme-surface)]/80 hover:bg-[var(--theme-surface-hover)] border border-[var(--theme-border)] flex items-center justify-center text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] transition-all cursor-pointer shadow-xs active:scale-95"
              aria-label="Share profile"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>

            {/* Save Contact Quick Top Button (reveals on scroll) */}
            <button
              onClick={onSaveContact}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[var(--theme-accent)] to-[var(--theme-accent-hover)] hover:opacity-95 text-black font-semibold text-[11px] tracking-wider uppercase transition-all duration-300 cursor-pointer shadow-md active:scale-95 ${
                isScrolled ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
              }`}
            >
              <UserPlus className="w-3 h-3" />
              <span>Save</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
