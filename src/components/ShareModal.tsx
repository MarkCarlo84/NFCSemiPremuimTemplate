import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { X, Copy, Check, Share2, Download, Smartphone } from 'lucide-react';
import type { ProfileConfig } from '../types/profile';
import { luxuryAudio } from '../utils/audio';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileConfig;
  onShowToast: (msg: string) => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, profile, onShowToast }) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = typeof window !== 'undefined' ? window.location.href : (profile.contact.website || 'https://example.com');

  const handleCopyLink = async () => {
    luxuryAudio.playHapticTick();
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      onShowToast('Profile link copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      onShowToast('Failed to copy link');
    }
  };

  const handleNativeShare = async () => {
    luxuryAudio.playChime(660, 0.5);
    if (navigator.share) {
      try {
        await navigator.share({
          title: profile.name,
          text: `${profile.name} — ${profile.title}`,
          url: shareUrl,
        });
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          handleCopyLink();
        }
      }
    } else {
      handleCopyLink();
    }
  };

  const downloadQRCode = () => {
    luxuryAudio.playChime(580, 0.4);
    const svg = document.getElementById('nfc-qr-code-svg');
    if (!svg) return;
    
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    canvas.width = 500;
    canvas.height = 500;
    
    img.onload = () => {
      if (ctx) {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 25, 25, 450, 450);
        const pngFile = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.download = `${profile.name.toLowerCase().replace(/\s+/g, '_')}_nfc_qr.png`;
        downloadLink.href = pngFile;
        downloadLink.click();
        onShowToast('QR Code downloaded for NFC card printing');
      }
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-sm rounded-3xl bg-[var(--theme-surface)]/95 backdrop-blur-2xl border border-[var(--theme-border-hover)]/30 shadow-[0_25px_70px_rgba(0,0,0,0.85)] p-6 overflow-hidden z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3.5 border-b border-[var(--theme-border)]/60">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-[var(--theme-accent)]" />
                <h3 className="font-theme-heading text-xs tracking-widest uppercase font-semibold text-[var(--theme-text-primary)]">
                  Share NFC Digital Card
                </h3>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--theme-text-muted)] hover:text-[var(--theme-text-primary)] hover:bg-[var(--theme-surface-hover)] transition-colors active:scale-95"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* QR Code Container */}
            <div className="my-5 flex flex-col items-center">
              <div className="p-4 bg-white rounded-2xl shadow-xl border border-stone-200">
                <QRCodeSVG
                  id="nfc-qr-code-svg"
                  value={shareUrl}
                  size={190}
                  level="H"
                  includeMargin={false}
                  fgColor="#0A0A0B"
                  bgColor="#FFFFFF"
                />
              </div>
              <p className="mt-3.5 font-theme-heading text-sm font-semibold tracking-wide text-[var(--theme-text-primary)]">
                {profile.name}
              </p>
              <p className="text-[11px] text-[var(--theme-text-secondary)] tracking-wider mt-0.5 text-center font-light">
                Scan with any smartphone camera or tap NFC
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <button
                onClick={handleNativeShare}
                className="btn-shimmer w-full py-3 px-4 rounded-xl bg-[var(--theme-btn-bg)] hover:bg-[var(--theme-btn-hover)] text-[var(--theme-btn-text)] font-semibold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-98"
              >
                <Share2 className="w-4 h-4" />
                <span>Share via Smartphone</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleCopyLink}
                  className="py-2.5 px-3 rounded-xl bg-[var(--theme-surface-hover)] border border-[var(--theme-border)] hover:border-[var(--theme-border-hover)] text-[var(--theme-text-primary)] text-xs font-medium tracking-wide transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 shadow-2xs"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Link'}</span>
                </button>

                <button
                  onClick={downloadQRCode}
                  className="py-2.5 px-3 rounded-xl bg-[var(--theme-surface-hover)] border border-[var(--theme-border)] hover:border-[var(--theme-border-hover)] text-[var(--theme-text-primary)] text-xs font-medium tracking-wide transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 shadow-2xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Save QR</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
