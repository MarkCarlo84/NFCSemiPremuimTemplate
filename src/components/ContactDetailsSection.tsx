import React, { useState, useEffect } from 'react';
import { Clock, Calendar, Mail, Phone, MapPin, Copy, Check, ExternalLink, ShieldCheck } from 'lucide-react';
import type { ProfileConfig } from '../types/profile';
import { luxuryAudio } from '../utils/audio';

interface ContactDetailsSectionProps {
  profile: ProfileConfig;
  onShowToast: (msg: string) => void;
}

export const ContactDetailsSection: React.FC<ContactDetailsSectionProps> = ({
  profile,
  onShowToast,
}) => {
  const { contact } = profile;
  const [localTime, setLocalTime] = useState('');
  const [copiedAddr, setCopiedAddr] = useState(false);

  // Dynamic Studio Clock (UTC)
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('en-US', {
          timeZone: 'UTC',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        });
        setLocalTime(timeStr);
      } catch {
        setLocalTime('12:00:00 UTC');
      }
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyAddress = async () => {
    if (!contact.address) return;
    luxuryAudio.playHapticTick();
    try {
      await navigator.clipboard.writeText(`${contact.address}, ${contact.cityCountry || ''}`);
      setCopiedAddr(true);
      onShowToast('Studio address copied to clipboard');
      setTimeout(() => setCopiedAddr(false), 2000);
    } catch {
      onShowToast('Failed to copy address');
    }
  };

  return (
    <section className="w-full px-4 mb-8">
      <div className="bg-[var(--theme-surface)]/80 backdrop-blur-xl rounded-3xl border border-[var(--theme-border)] p-4 sm:p-5 shadow-xl relative overflow-hidden">
        
        {/* Subtle Decorative Technical Datum Markings */}
        <div className="absolute top-2.5 left-3 text-[8px] font-mono text-[var(--theme-text-muted)] opacity-30 select-none">
          + // OPERATIONS
        </div>
        <div className="absolute top-2.5 right-3 text-[8px] font-mono text-[var(--theme-text-muted)] opacity-30 select-none">
          DISPATCH // 05
        </div>

        {/* Section Header */}
        <div className="flex items-center justify-between pb-3 mb-4 mt-1 border-b border-[var(--theme-border)]/60">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)]" />
            <h2 className="font-theme-heading text-xs tracking-[0.2em] uppercase font-semibold text-[var(--theme-text-primary)]">
              Studio &amp; Operations
            </h2>
          </div>
          <span className="text-[9px] font-mono uppercase tracking-widest text-[var(--theme-text-muted)] font-medium px-2 py-0.5 rounded-full bg-[var(--theme-surface-hover)] border border-[var(--theme-border)]">
            Concierge
          </span>
        </div>

        <div className="space-y-3">
          {/* 1. Principal Studio Location */}
          {contact.address && (
            <div className="p-3.5 rounded-2xl bg-gradient-to-b from-[var(--theme-surface-hover)] to-[var(--theme-surface)] border border-[var(--theme-border)] shadow-2xs">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-[var(--theme-surface)] border border-[var(--theme-border)] text-[var(--theme-text-primary)] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-[var(--theme-accent)]" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-[var(--theme-text-muted)] block">
                      Principal Studio Location
                    </span>
                    <p className="text-xs font-semibold text-[var(--theme-text-primary)] mt-0.5 truncate">
                      {contact.address}
                    </p>
                    <p className="text-[11px] text-[var(--theme-text-secondary)] font-light">
                      {contact.cityCountry}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleCopyAddress}
                  title="Copy address"
                  className="p-2 rounded-xl bg-[var(--theme-surface)] hover:bg-[var(--theme-surface-hover)] text-[var(--theme-text-muted)] hover:text-[var(--theme-text-primary)] border border-[var(--theme-border)] transition-colors cursor-pointer shrink-0 active:scale-95"
                >
                  {copiedAddr ? <Check className="w-3.5 h-3.5 text-[var(--theme-accent)]" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          )}

          {/* 2. Precision Studio Chronometer Clock */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-b from-[var(--theme-surface-hover)] to-[var(--theme-surface)] border border-[var(--theme-border)] flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[var(--theme-surface)] border border-[var(--theme-border)] text-[var(--theme-text-primary)] flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4 text-[var(--theme-accent)]" />
              </div>
              <div>
                <span className="text-[9px] font-mono uppercase tracking-wider text-[var(--theme-text-muted)] block">
                  Studio Chronometer ({contact.timezone || 'UTC'})
                </span>
                <span className="font-mono text-xs font-semibold text-[var(--theme-text-primary)] tracking-widest">
                  {localTime || '12:00:00 UTC'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--theme-surface-hover)] text-[var(--theme-text-primary)] text-[9px] font-mono border border-[var(--theme-border)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)] animate-pulse" />
              <span>Telemetry Active</span>
            </div>
          </div>

          {/* 3. Direct Communications (2-Column Grid) */}
          <div className="grid grid-cols-2 gap-2.5">
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="p-3 rounded-2xl bg-gradient-to-b from-[var(--theme-surface-hover)] to-[var(--theme-surface)] border border-[var(--theme-border)] hover:border-[var(--theme-border-hover)] flex items-center gap-2.5 transition-all cursor-pointer active:scale-95 shadow-2xs"
              >
                <Mail className="w-3.5 h-3.5 text-[var(--theme-accent)] shrink-0" />
                <div className="min-w-0">
                  <span className="text-[9px] font-mono uppercase text-[var(--theme-text-muted)] block">
                    Direct Email
                  </span>
                  <span className="text-[11px] font-medium text-[var(--theme-text-primary)] truncate block font-mono">
                    {contact.email}
                  </span>
                </div>
              </a>
            )}

            {contact.phone && (
              <a
                href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                className="p-3 rounded-2xl bg-gradient-to-b from-[var(--theme-surface-hover)] to-[var(--theme-surface)] border border-[var(--theme-border)] hover:border-[var(--theme-border-hover)] flex items-center gap-2.5 transition-all cursor-pointer active:scale-95 shadow-2xs"
              >
                <Phone className="w-3.5 h-3.5 text-[var(--theme-accent)] shrink-0" />
                <div className="min-w-0">
                  <span className="text-[9px] font-mono uppercase text-[var(--theme-text-muted)] block">
                    Telephone
                  </span>
                  <span className="text-[11px] font-medium text-[var(--theme-text-primary)] truncate block font-mono">
                    {contact.phone}
                  </span>
                </div>
              </a>
            )}
          </div>

          {/* 4. Consultation & Project Discussion Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-b from-[var(--theme-surface-hover)] to-[var(--theme-surface)] border border-[var(--theme-border)] shadow-2xs">
            <div className="flex items-center gap-2 text-[var(--theme-text-primary)] mb-2">
              <Calendar className="w-4 h-4 text-[var(--theme-accent)]" />
              <span className="text-[10px] font-mono uppercase tracking-widest font-semibold">
                Private Consultation
              </span>
            </div>
            <h3 className="font-theme-heading text-base font-semibold text-[var(--theme-text-primary)] mb-1">
              Project Inquiries &amp; Commissions
            </h3>
            <p className="text-xs text-[var(--theme-text-secondary)] leading-relaxed mb-4 font-light">
              Direct consultation regarding bespoke digital solutions, strategic systems, or private engagements.
            </p>

            <div className="space-y-2">
              {contact.email && (
                <a
                  href={`mailto:${contact.email}?subject=Inquiry%20from%20NFC%20Card`}
                  onClick={() => luxuryAudio.playChime(640, 0.4)}
                  className="w-full py-3 px-4 rounded-xl bg-[var(--theme-btn-bg)] hover:bg-[var(--theme-btn-hover)] text-[var(--theme-btn-text)] font-semibold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-98"
                >
                  <span>Send Direct Project Inquiry</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-[var(--theme-text-muted)] pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
                <span>Verified Identity · Confidentiality Assured</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
