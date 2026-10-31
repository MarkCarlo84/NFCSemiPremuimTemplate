import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Sparkles, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  type?: 'success' | 'info';
  onClose: () => void;
}

export const ToastNotification: React.FC<ToastProps> = ({ message, type = 'success', onClose }) => {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-[360px] w-full px-4"
        >
          <div className="bg-[var(--theme-surface)]/95 backdrop-blur-2xl border border-[var(--theme-border-hover)] text-[var(--theme-text-primary)] px-4 py-3 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.75)] flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              {type === 'success' ? (
                <div className="w-8 h-8 rounded-full bg-[var(--theme-accent-subtle)] text-[var(--theme-accent)] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-[var(--theme-accent-subtle)] text-[var(--theme-accent)] flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
              )}
              <span className="text-xs sm:text-sm font-medium tracking-wide truncate">
                {message}
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-[var(--theme-text-muted)] hover:text-[var(--theme-text-primary)] p-1 transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
