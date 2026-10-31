import React from 'react';
import { Award, Quote } from 'lucide-react';
import type { ProfileConfig } from '../types/profile';

interface AboutSectionProps {
  profile: ProfileConfig;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ profile }) => {
  return (
    <section className="w-full px-4 mb-8">
      <div className="bg-[var(--theme-surface)]/80 backdrop-blur-xl rounded-3xl border border-[var(--theme-border)] p-5 sm:p-6 shadow-xl relative overflow-hidden">
        
        {/* Subtle Decorative Technical Datum Markings */}
        <div className="absolute top-2.5 left-3 text-[8px] font-mono text-[var(--theme-text-muted)] opacity-30 select-none">
          + // BIOGRAPHY
        </div>
        <div className="absolute top-2.5 right-3 text-[8px] font-mono text-[var(--theme-text-muted)] opacity-30 select-none">
          MONOGRAPH // 02
        </div>

        {/* Section Header */}
        <div className="flex items-center justify-between pb-3 mb-5 mt-1 border-b border-[var(--theme-border)]/60">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)]" />
            <h2 className="font-theme-heading text-xs tracking-[0.2em] uppercase font-semibold text-[var(--theme-text-primary)]">
              Background &amp; Philosophy
            </h2>
          </div>
          <span className="text-[9px] font-mono uppercase tracking-widest text-[var(--theme-text-muted)] font-medium px-2 py-0.5 rounded-full bg-[var(--theme-surface-hover)] border border-[var(--theme-border)]">
            Editorial
          </span>
        </div>

        {/* Luxury Brand Statement / Pull Quote */}
        {profile.brandStatement && (
          <div className="relative mb-5 pl-4 pr-3 py-2.5 border-l-2 border-[var(--theme-text-primary)] bg-[var(--theme-surface-hover)]/40 rounded-r-2xl">
            <Quote className="w-4 h-4 text-[var(--theme-text-muted)] mb-1 opacity-50" />
            <blockquote className="font-theme-heading text-sm sm:text-base text-[var(--theme-text-primary)] font-light italic leading-relaxed">
              {profile.brandStatement}
            </blockquote>
            <span className="block mt-2 text-[9px] font-mono tracking-widest uppercase text-[var(--theme-text-muted)]">
              — {profile.name}
            </span>
          </div>
        )}

        {/* Single Column Mobile Biography */}
        <div className="space-y-3 text-xs sm:text-sm leading-relaxed text-[var(--theme-text-secondary)] mb-6 font-light">
          <p className="first-letter:text-3xl first-letter:font-theme-heading first-letter:font-bold first-letter:text-[var(--theme-text-primary)] first-letter:mr-1.5 first-letter:float-left">
            {profile.shortBio}
          </p>
          <p className="whitespace-pre-line text-xs sm:text-sm text-[var(--theme-text-secondary)]/90 leading-relaxed">
            {profile.fullBio}
          </p>
        </div>

        {/* Milestone Metrics Grid (Mobile 2x2 Grid) */}
        {profile.milestones && profile.milestones.length > 0 && (
          <div className="pt-4 border-t border-[var(--theme-border)]/60 mb-6">
            <div className="grid grid-cols-2 gap-2.5">
              {profile.milestones.map((milestone, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-gradient-to-b from-[var(--theme-surface-hover)] to-[var(--theme-surface)] border border-[var(--theme-border)] hover:border-[var(--theme-border-hover)] flex flex-col justify-between shadow-2xs transition-all"
                >
                  <span className="font-theme-heading text-2xl font-bold text-[var(--theme-text-primary)] tracking-tight">
                    {milestone.value}
                  </span>
                  <div className="mt-2">
                    <span className="text-xs font-semibold text-[var(--theme-text-primary)] block leading-snug">
                      {milestone.label}
                    </span>
                    {milestone.description && (
                      <span className="text-[10px] font-mono text-[var(--theme-text-muted)] block mt-0.5 leading-snug">
                        {milestone.description}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Core Expertise Badges */}
        {profile.expertise && profile.expertise.length > 0 && (
          <div className="pt-4 border-t border-[var(--theme-border)]/60">
            <div className="flex items-center gap-1.5 mb-3">
              <Award className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
              <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--theme-text-muted)] font-semibold">
                Areas of Expertise
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {profile.expertise.map((skill, idx) => (
                <div
                  key={idx}
                  className="px-3 py-1 rounded-full bg-[var(--theme-surface-hover)] border border-[var(--theme-border)] hover:border-[var(--theme-border-hover)] text-[11px] font-mono text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] transition-colors flex items-center gap-1.5 shadow-2xs"
                >
                  <span className="w-1 h-1 rounded-full bg-[var(--theme-accent)] opacity-80" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
