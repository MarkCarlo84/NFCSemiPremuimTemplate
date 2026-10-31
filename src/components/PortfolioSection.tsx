import React, { useState } from 'react';
import { Eye, Maximize2 } from 'lucide-react';
import type { PortfolioItem } from '../types/profile';
import { luxuryAudio } from '../utils/audio';

interface PortfolioSectionProps {
  portfolio: PortfolioItem[];
  onOpenLightbox: (project: PortfolioItem) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  portfolio,
  onOpenLightbox,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  if (!portfolio || portfolio.length === 0) return null;

  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(portfolio.map((p) => p.category)))];

  const filteredProjects =
    selectedCategory === 'All'
      ? portfolio
      : portfolio.filter((p) => p.category === selectedCategory);

  return (
    <section id="portfolio-section" className="w-full px-4 mb-8 scroll-mt-16">
      {/* Section Header Card */}
      <div className="bg-[var(--theme-surface)]/80 backdrop-blur-xl rounded-3xl border border-[var(--theme-border)] p-4 sm:p-5 shadow-xl relative overflow-hidden mb-3">
        {/* Subtle Decorative Technical Datum Markings */}
        <div className="absolute top-2.5 left-3 text-[8px] font-mono text-[var(--theme-text-muted)] opacity-30 select-none">
          + // ARCHIVE
        </div>
        <div className="absolute top-2.5 right-3 text-[8px] font-mono text-[var(--theme-text-muted)] opacity-30 select-none">
          WORKS // 04
        </div>

        <div className="flex items-center justify-between pb-3 mb-3.5 mt-1 border-b border-[var(--theme-border)]/60">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)]" />
            <h2 className="font-theme-heading text-xs tracking-[0.2em] uppercase font-semibold text-[var(--theme-text-primary)]">
              Curated Portfolio
            </h2>
          </div>
          <span className="text-[9px] font-mono uppercase tracking-widest text-[var(--theme-text-muted)] font-medium px-2 py-0.5 rounded-full bg-[var(--theme-surface-hover)] border border-[var(--theme-border)]">
            {filteredProjects.length} Entries
          </span>
        </div>

        {/* Category Filter Pills */}
        <div className="flex gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                luxuryAudio.playHapticTick();
                setSelectedCategory(cat);
              }}
              className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer active:scale-95 ${
                selectedCategory === cat
                  ? 'bg-[var(--theme-btn-bg)] text-[var(--theme-btn-text)] font-semibold shadow-xs'
                  : 'bg-[var(--theme-surface-hover)] text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] border border-[var(--theme-border)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Stream Gallery Cards */}
      <div className="space-y-3.5">
        {filteredProjects.map((project, idx) => (
          <div
            key={project.id}
            onClick={() => {
              luxuryAudio.playChime(540, 0.4);
              onOpenLightbox(project);
            }}
            className="group cursor-pointer rounded-3xl bg-[var(--theme-surface)]/80 backdrop-blur-xl border border-[var(--theme-border)] hover:border-[var(--theme-border-hover)] overflow-hidden shadow-lg transition-all duration-300 active:scale-[0.98]"
          >
            {/* Image Box */}
            <div className="relative aspect-[16/10] overflow-hidden bg-black/40">
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {/* Top Row: Floating Category Badge & Expand Icon */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white/95 text-[9px] font-mono uppercase tracking-wider border border-white/10 shadow-xs">
                  {project.category}
                </span>

                <div className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-md text-white/90 flex items-center justify-center border border-white/10 group-hover:bg-[var(--theme-btn-bg)] group-hover:text-[var(--theme-btn-text)] transition-colors">
                  <Maximize2 className="w-3 h-3" />
                </div>
              </div>

              {/* Bottom Project Overlay */}
              <div className="absolute bottom-3 left-3.5 right-3.5 text-white">
                <div className="flex items-center justify-between text-[10px] text-white/70 mb-0.5 font-mono">
                  <span>PROJECT // 0{idx + 1}</span>
                  <span>{project.year || '2025'}</span>
                </div>
                <h3 className="font-theme-heading text-base font-semibold tracking-wide text-white line-clamp-1">
                  {project.title}
                </h3>
              </div>
            </div>

            {/* Description Card Footer */}
            <div className="p-3.5 flex items-center justify-between gap-3 bg-[var(--theme-surface)]/50">
              <p className="text-xs text-[var(--theme-text-secondary)] line-clamp-2 leading-relaxed font-light">
                {project.description}
              </p>
              <div className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-[var(--theme-text-primary)] shrink-0 group-hover:underline">
                <Eye className="w-3 h-3" />
                <span>Inspect</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
