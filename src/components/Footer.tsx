import React from 'react';
import { Nfc } from 'lucide-react';
import type { ProfileConfig } from '../types/profile';

interface FooterProps {
  profile: ProfileConfig;
  onSaveContact?: () => void;
}

const currentYear = new Date().getFullYear();

export const Footer: React.FC<FooterProps> = ({ profile }) => {
  return (
    <footer className="w-full border-t border-[var(--theme-border)]/60 bg-[var(--theme-surface)]/70 backdrop-blur-xl py-6 px-4 mt-auto">
      <div className="w-full flex flex-col items-center justify-center gap-2 text-center">
        {/* Subtle NFC Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--theme-surface-hover)] border border-[var(--theme-border)] text-[9px] font-mono tracking-[0.2em] uppercase text-[var(--theme-text-muted)]">
          <Nfc className="w-3 h-3 text-[var(--theme-accent)]" />
          <span>NFC Digital Card · Verified</span>
        </div>

        {/* Copyright notice */}
        <div className="text-[11px] font-light text-[var(--theme-text-muted)] flex items-center gap-1.5">
          <span className="w-1 h-1 rounded-full bg-[var(--theme-accent)] opacity-60" />
          <span>© {currentYear} {profile.name}. All rights reserved.</span>
        </div>

        <div className="text-[9px] font-mono text-[var(--theme-text-muted)] opacity-50 tracking-widest uppercase">
          PROTOCOL // NFC-V3 · ENCRYPTED vCARD
        </div>
      </div>
    </footer>
  );
};
