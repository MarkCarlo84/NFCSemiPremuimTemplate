import React from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import type { ServiceItem } from '../types/profile';
import { luxuryAudio } from '../utils/audio';

interface ServicesSectionProps {
  services: ServiceItem[];
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ services }) => {
  if (!services || services.length === 0) return null;

  return (
    <section className="w-full px-4 mb-8">
      {/* Section Header Card / Banner */}
      <div className="bg-[var(--theme-surface)]/80 backdrop-blur-xl rounded-3xl border border-[var(--theme-border)] p-4 sm:p-5 shadow-xl relative overflow-hidden mb-3">
        {/* Subtle Decorative Technical Datum Markings */}
        <div className="absolute top-2.5 left-3 text-[8px] font-mono text-[var(--theme-text-muted)] opacity-30 select-none">
          + // COMMISSIONS
        </div>
        <div className="absolute top-2.5 right-3 text-[8px] font-mono text-[var(--theme-text-muted)] opacity-30 select-none">
          OFFERINGS // 03
        </div>

        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)]" />
            <h2 className="font-theme-heading text-xs tracking-[0.2em] uppercase font-semibold text-[var(--theme-text-primary)]">
              Services &amp; Commissions
            </h2>
          </div>
          <span className="text-[9px] font-mono uppercase tracking-widest text-[var(--theme-text-muted)] font-medium px-2 py-0.5 rounded-full bg-[var(--theme-surface-hover)] border border-[var(--theme-border)]">
            {services.length} Tiers
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {services.map((service, index) => (
          <div
            key={service.id}
            className={`p-4 sm:p-5 rounded-3xl bg-[var(--theme-surface)]/80 backdrop-blur-xl border transition-all duration-300 relative shadow-md group ${
              service.featured
                ? 'border-[var(--theme-border-hover)] ring-1 ring-[var(--theme-border-hover)]/30'
                : 'border-[var(--theme-border)] hover:border-[var(--theme-border-hover)]'
            }`}
          >
            {/* Top Row: Index Monogram & Featured Badge */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-mono text-[9px] tracking-widest text-[var(--theme-text-muted)] uppercase">
                COMMISSION // 0{index + 1}
              </span>

              {service.featured && (
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[var(--theme-surface-hover)] text-[var(--theme-text-primary)] text-[9px] font-mono uppercase tracking-wider font-semibold border border-[var(--theme-border)]">
                  <CheckCircle2 className="w-3 h-3 text-[var(--theme-accent)]" />
                  <span>Priority</span>
                </div>
              )}
            </div>

            {/* Service Details */}
            <div>
              <h3 className="font-theme-heading text-base font-semibold text-[var(--theme-text-primary)] tracking-tight mb-1.5">
                {service.title}
              </h3>
              <p className="text-xs text-[var(--theme-text-secondary)] leading-relaxed mb-3.5 font-light">
                {service.description}
              </p>

              {/* Bottom Row: Starting Price & CTA Action */}
              <div className="flex items-center justify-between gap-2 pt-3 border-t border-[var(--theme-border)]/50">
                {service.startingPrice ? (
                  <div className="inline-flex items-center px-2.5 py-1 rounded-xl bg-[var(--theme-surface-hover)] border border-[var(--theme-border)] text-[10px] font-mono font-medium text-[var(--theme-text-primary)]">
                    <span>{service.startingPrice}</span>
                  </div>
                ) : <div />}

                {service.ctaText && service.ctaUrl && (
                  <a
                    href={service.ctaUrl}
                    onClick={() => luxuryAudio.playHapticTick()}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[var(--theme-btn-bg)] hover:bg-[var(--theme-btn-hover)] text-[var(--theme-btn-text)] text-[10px] font-mono font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer shadow-xs active:scale-95"
                  >
                    <span>{service.ctaText}</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
