import React, { useState } from 'react';
import { Phone, Mail, MessageSquare, Globe, Copy, Check, ArrowUpRight } from 'lucide-react';
import type { ProfileConfig } from '../types/profile';
import { luxuryAudio } from '../utils/audio';

interface QuickContactActionsProps {
  profile: ProfileConfig;
  onSaveContact: () => void;
  onOpenShare: () => void;
  onShowToast: (msg: string) => void;
}

export const QuickContactActions: React.FC<QuickContactActionsProps> = ({
  profile,
  onShowToast,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const { contact } = profile;

  const copyToClipboard = async (text: string, type: 'email' | 'phone') => {
    luxuryAudio.playHapticTick();
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'email') {
        setCopiedEmail(true);
        onShowToast(`Copied ${text} to clipboard`);
        setTimeout(() => setCopiedEmail(false), 2000);
      } else {
        setCopiedPhone(true);
        onShowToast(`Copied ${text} to clipboard`);
        setTimeout(() => setCopiedPhone(false), 2000);
      }
    } catch {
      onShowToast('Could not copy to clipboard');
    }
  };

  return (
    <section className="w-full px-4 mb-8">
      <div className="bg-[var(--theme-surface)]/80 backdrop-blur-xl rounded-3xl border border-[var(--theme-border)] p-4 sm:p-5 shadow-xl relative overflow-hidden group">
        
        {/* Subtle Decorative Technical Datum Markings */}
        <div className="absolute top-2.5 left-3 text-[8px] font-mono text-[var(--theme-text-muted)] opacity-30 select-none">
          + // TOUCHPOINTS
        </div>
        <div className="absolute top-2.5 right-3 text-[8px] font-mono text-[var(--theme-text-muted)] opacity-30 select-none">
          SYNC // 01
        </div>

        {/* Section Header */}
        <div className="flex items-center justify-between pb-3 mb-4 mt-1 border-b border-[var(--theme-border)]/60">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)]" />
            <h2 className="font-theme-heading text-xs tracking-[0.2em] uppercase font-semibold text-[var(--theme-text-primary)]">
              Direct Touchpoints
            </h2>
          </div>
          <span className="text-[9px] font-mono uppercase tracking-widest text-[var(--theme-text-muted)] font-medium px-2 py-0.5 rounded-full bg-[var(--theme-surface-hover)] border border-[var(--theme-border)]">
            Instant Connect
          </span>
        </div>

        {/* Primary Contact Buttons Grid (Mobile 2x2 Grid) */}
        <div className="grid grid-cols-2 gap-2.5">
          
          {/* 1. Direct Call */}
          {contact.phone && (
            <a
              href={`tel:${contact.phone.replace(/\s+/g, '')}`}
              onClick={() => luxuryAudio.playHapticTick()}
              className="group/card relative p-3.5 rounded-2xl bg-gradient-to-b from-[var(--theme-surface-hover)] to-[var(--theme-surface)] border border-[var(--theme-border)] hover:border-[var(--theme-border-hover)] flex flex-col items-center justify-center text-center transition-all duration-300 active:scale-[0.97] cursor-pointer shadow-xs"
            >
              <ArrowUpRight className="absolute top-2.5 right-2.5 w-3 h-3 text-[var(--theme-text-muted)] group-hover/card:text-[var(--theme-text-primary)] group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 transition-all" />
              <div className="w-10 h-10 rounded-2xl bg-[var(--theme-surface)] border border-[var(--theme-border)] text-[var(--theme-text-primary)] flex items-center justify-center mb-2 group-hover/card:scale-105 group-hover/card:border-[var(--theme-border-hover)] transition-all shadow-2xs">
                <Phone className="w-4 h-4 text-[var(--theme-accent)]" />
              </div>
              <span className="text-xs font-semibold text-[var(--theme-text-primary)] tracking-wide">
                Direct Call
              </span>
              <span className="text-[10px] text-[var(--theme-text-muted)] mt-0.5 truncate max-w-[120px] font-mono">
                {contact.phone}
              </span>
            </a>
          )}

          {/* 2. Direct Email */}
          {contact.email && (
            <a
              href={`mailto:${contact.email}`}
              onClick={() => luxuryAudio.playHapticTick()}
              className="group/card relative p-3.5 rounded-2xl bg-gradient-to-b from-[var(--theme-surface-hover)] to-[var(--theme-surface)] border border-[var(--theme-border)] hover:border-[var(--theme-border-hover)] flex flex-col items-center justify-center text-center transition-all duration-300 active:scale-[0.97] cursor-pointer shadow-xs"
            >
              <ArrowUpRight className="absolute top-2.5 right-2.5 w-3 h-3 text-[var(--theme-text-muted)] group-hover/card:text-[var(--theme-text-primary)] group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 transition-all" />
              <div className="w-10 h-10 rounded-2xl bg-[var(--theme-surface)] border border-[var(--theme-border)] text-[var(--theme-text-primary)] flex items-center justify-center mb-2 group-hover/card:scale-105 group-hover/card:border-[var(--theme-border-hover)] transition-all shadow-2xs">
                <Mail className="w-4 h-4 text-[var(--theme-accent)]" />
              </div>
              <span className="text-xs font-semibold text-[var(--theme-text-primary)] tracking-wide">
                Send Email
              </span>
              <span className="text-[10px] text-[var(--theme-text-muted)] mt-0.5 truncate max-w-[120px] font-mono">
                {contact.email}
              </span>
            </a>
          )}

          {/* 3. WhatsApp Message */}
          {contact.whatsapp && (
            <a
              href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => luxuryAudio.playHapticTick()}
              className="group/card relative p-3.5 rounded-2xl bg-gradient-to-b from-[var(--theme-surface-hover)] to-[var(--theme-surface)] border border-[var(--theme-border)] hover:border-[var(--theme-border-hover)] flex flex-col items-center justify-center text-center transition-all duration-300 active:scale-[0.97] cursor-pointer shadow-xs"
            >
              <ArrowUpRight className="absolute top-2.5 right-2.5 w-3 h-3 text-[var(--theme-text-muted)] group-hover/card:text-[var(--theme-text-primary)] group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 transition-all" />
              <div className="w-10 h-10 rounded-2xl bg-[var(--theme-surface)] border border-[var(--theme-border)] text-[var(--theme-text-primary)] flex items-center justify-center mb-2 group-hover/card:scale-105 group-hover/card:border-[var(--theme-border-hover)] transition-all shadow-2xs">
                <MessageSquare className="w-4 h-4 text-[var(--theme-accent)]" />
              </div>
              <span className="text-xs font-semibold text-[var(--theme-text-primary)] tracking-wide">
                WhatsApp
              </span>
              <span className="text-[10px] text-[var(--theme-text-muted)] mt-0.5 font-mono">
                Instant Chat
              </span>
            </a>
          )}

          {/* 4. Portfolio Website */}
          {contact.website && (
            <a
              href={contact.website}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => luxuryAudio.playHapticTick()}
              className="group/card relative p-3.5 rounded-2xl bg-gradient-to-b from-[var(--theme-surface-hover)] to-[var(--theme-surface)] border border-[var(--theme-border)] hover:border-[var(--theme-border-hover)] flex flex-col items-center justify-center text-center transition-all duration-300 active:scale-[0.97] cursor-pointer shadow-xs"
            >
              <ArrowUpRight className="absolute top-2.5 right-2.5 w-3 h-3 text-[var(--theme-text-muted)] group-hover/card:text-[var(--theme-text-primary)] group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 transition-all" />
              <div className="w-10 h-10 rounded-2xl bg-[var(--theme-surface)] border border-[var(--theme-border)] text-[var(--theme-text-primary)] flex items-center justify-center mb-2 group-hover/card:scale-105 group-hover/card:border-[var(--theme-border-hover)] transition-all shadow-2xs">
                <Globe className="w-4 h-4 text-[var(--theme-accent)]" />
              </div>
              <span className="text-xs font-semibold text-[var(--theme-text-primary)] tracking-wide">
                Website
              </span>
              <span className="text-[10px] text-[var(--theme-text-muted)] mt-0.5 truncate max-w-[120px] font-mono">
                {contact.website?.replace(/^https?:\/\//, '').replace(/\/$/, '') || 'example.com'}
              </span>
            </a>
          )}

          {/* 5. Copy Email Quick Bar */}
          {contact.email && (
            <button
              onClick={() => copyToClipboard(contact.email!, 'email')}
              className="group p-2.5 rounded-xl bg-[var(--theme-surface-hover)]/70 border border-[var(--theme-border)] hover:border-[var(--theme-border-hover)] flex items-center justify-between px-3 transition-all duration-300 active:scale-[0.97] cursor-pointer col-span-1 shadow-2xs"
            >
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-5 h-5 rounded-md bg-[var(--theme-surface)] border border-[var(--theme-border)] flex items-center justify-center shrink-0">
                  {copiedEmail ? <Check className="w-3 h-3 text-[var(--theme-accent)]" /> : <Copy className="w-3 h-3 text-[var(--theme-text-muted)]" />}
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--theme-text-secondary)] group-hover:text-[var(--theme-text-primary)] truncate">
                  {copiedEmail ? 'Copied' : 'Copy Email'}
                </span>
              </div>
            </button>
          )}

          {/* 6. Copy Phone Quick Bar */}
          {contact.phone && (
            <button
              onClick={() => copyToClipboard(contact.phone!, 'phone')}
              className="group p-2.5 rounded-xl bg-[var(--theme-surface-hover)]/70 border border-[var(--theme-border)] hover:border-[var(--theme-border-hover)] flex items-center justify-between px-3 transition-all duration-300 active:scale-[0.97] cursor-pointer col-span-1 shadow-2xs"
            >
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-5 h-5 rounded-md bg-[var(--theme-surface)] border border-[var(--theme-border)] flex items-center justify-center shrink-0">
                  {copiedPhone ? <Check className="w-3 h-3 text-[var(--theme-accent)]" /> : <Copy className="w-3 h-3 text-[var(--theme-text-muted)]" />}
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--theme-text-secondary)] group-hover:text-[var(--theme-text-primary)] truncate">
                  {copiedPhone ? 'Copied' : 'Copy Phone'}
                </span>
              </div>
            </button>
          )}

        </div>

      </div>
    </section>
  );
};
