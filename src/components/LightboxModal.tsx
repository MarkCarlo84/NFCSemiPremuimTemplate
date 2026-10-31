import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ExternalLink, Calendar, Building2 } from 'lucide-react';
import type { PortfolioItem } from '../types/profile';
import { luxuryAudio } from '../utils/audio';

interface LightboxModalProps {
  project: PortfolioItem | null;
  projects: PortfolioItem[];
  onClose: () => void;
  onSelectProject: (proj: PortfolioItem) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  project,
  projects,
  onClose,
  onSelectProject,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!project) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        const currentIndex = projects.findIndex((p) => p.id === project.id);
        const nextIndex = (currentIndex + 1) % projects.length;
        onSelectProject(projects[nextIndex]);
        luxuryAudio.playHapticTick();
      } else if (e.key === 'ArrowLeft') {
        const currentIndex = projects.findIndex((p) => p.id === project.id);
        const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
        onSelectProject(projects[prevIndex]);
        luxuryAudio.playHapticTick();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, projects, onClose, onSelectProject]);

  if (!project) return null;

  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const nextProject = () => {
    luxuryAudio.playHapticTick();
    const nextIndex = (currentIndex + 1) % projects.length;
    onSelectProject(projects[nextIndex]);
  };
  const prevProject = () => {
    luxuryAudio.playHapticTick();
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    onSelectProject(projects[prevIndex]);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-xl"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="relative max-w-xl w-full bg-[var(--theme-surface)]/95 backdrop-blur-2xl rounded-3xl border border-[var(--theme-border-hover)]/30 shadow-[0_25px_80px_rgba(0,0,0,0.9)] overflow-hidden z-10 flex flex-col max-h-[90vh]"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between p-4 border-b border-[var(--theme-border)]/60 bg-[var(--theme-surface)]/80 backdrop-blur-md">
            <div>
              <span className="text-[9px] uppercase font-mono tracking-widest text-[var(--theme-accent)] font-semibold">
                {project.category} · {currentIndex + 1} of {projects.length}
              </span>
              <h3 className="font-theme-heading text-base font-medium text-[var(--theme-text-primary)]">
                {project.title}
              </h3>
            </div>
            
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center bg-[var(--theme-surface-hover)] text-[var(--theme-text-muted)] hover:text-[var(--theme-text-primary)] transition-colors active:scale-95"
              aria-label="Close lightbox"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Image Canvas with Navigation Arrows */}
          <div className="relative flex-1 bg-black/40 flex items-center justify-center min-h-[300px] sm:min-h-[460px] overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="max-h-[60vh] w-auto max-w-full object-contain select-none"
            />

            {/* Prev / Next controls */}
            {projects.length > 1 && (
              <>
                <button
                  onClick={prevProject}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-sm transition-all cursor-pointer"
                  aria-label="Previous project"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextProject}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-sm transition-all cursor-pointer"
                  aria-label="Next project"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {/* Details Footer */}
          <div className="p-4 sm:p-6 bg-[var(--theme-surface)] border-t border-[var(--theme-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1 max-w-xl">
              <p className="text-xs sm:text-sm text-[var(--theme-text-secondary)] leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-[11px] text-[var(--theme-text-muted)] pt-2">
                {project.year && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
                    Year: {project.year}
                  </span>
                )}
                {project.client && (
                  <span className="flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
                    Commission: {project.client}
                  </span>
                )}
              </div>
            </div>

            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--theme-btn-bg)] hover:bg-[var(--theme-btn-hover)] text-[var(--theme-btn-text)] text-xs font-semibold uppercase tracking-wider transition-all self-start sm:self-auto cursor-pointer"
              >
                <span>View Full Case</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
