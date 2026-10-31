import React from 'react';
import { ArrowUpRight, Share2 } from 'lucide-react';
import type { SocialLink, SocialPlatform } from '../types/profile';
import { luxuryAudio } from '../utils/audio';

interface SocialMediaSectionProps {
  socialLinks: SocialLink[];
}

// Crisp, custom inline SVG brand icons
const renderSocialIcon = (platform: SocialPlatform) => {
  switch (platform) {
    case 'instagram':
      return (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      );
    case 'x':
      return (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case 'behance':
      return (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.171 3-3.691 0-6.155-2.55-6.155-6.386 0-3.847 2.42-6.614 6.136-6.614 4.093 0 5.679 2.929 5.378 6.425h-8.918c.045 2.128 1.488 3.575 3.559 3.575 1.767 0 2.766-.789 3.266-1.554l1.905 1.554zm-8.827-5h5.882c-.097-1.765-1.255-2.736-2.909-2.736-1.642 0-2.839.992-2.973 2.736zm-10.428 5.793c.995 0 2.227-.373 2.85-1.523.513-.949.529-2.062.529-3.27 0-3.666-1.954-5-5.379-5h-4.5v11.793h6.5zm-3.5-9.793h3c1.782 0 2.459.782 2.459 2.051 0 1.282-.693 2.072-2.459 2.072h-3v-4.123zm0 6h3.454c1.824 0 2.546.85 2.546 2.247 0 1.346-.722 2.246-2.546 2.246h-3.454v-4.493z" />
        </svg>
      );
    case 'spotify':
      return (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.505 17.307c-.215.352-.676.463-1.028.248-2.816-1.721-6.36-2.111-10.536-1.157-.4.092-.796-.157-.887-.556-.092-.4.157-.796.556-.887 4.571-1.045 8.492-.596 11.647 1.332.352.215.463.676.248 1.028zm1.47-3.267c-.27.44-.852.576-1.291.307-3.224-1.982-8.139-2.555-11.954-1.397-.497.151-1.025-.133-1.176-.63-.151-.497.133-1.025.63-1.176 4.364-1.324 9.775-.688 13.484 1.595.44.27.576.852.307 1.301zm.126-3.41c-3.867-2.296-10.248-2.508-13.941-1.387-.593.18-1.22-.162-1.4-.755-.18-.593.162-1.22.755-1.4 4.244-1.288 11.285-1.039 15.748 1.611.533.317.708 1.008.392 1.541-.317.533-1.008.708-1.554.391z" />
        </svg>
      );
    case 'github':
      return (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      );
    case 'facebook':
      return (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      );
    default:
      return <Share2 className="w-4 h-4" />;
  }
};

export const SocialMediaSection: React.FC<SocialMediaSectionProps> = ({ socialLinks }) => {
  if (!socialLinks || socialLinks.length === 0) return null;

  return (
    <section className="w-full px-4 mb-8">
      <div className="bg-[var(--theme-surface)]/80 backdrop-blur-xl rounded-3xl border border-[var(--theme-border)] p-4 sm:p-5 shadow-xl relative overflow-hidden">
        
        {/* Subtle Decorative Technical Datum Markings */}
        <div className="absolute top-2.5 left-3 text-[8px] font-mono text-[var(--theme-text-muted)] opacity-30 select-none">
          + // CHANNELS
        </div>
        <div className="absolute top-2.5 right-3 text-[8px] font-mono text-[var(--theme-text-muted)] opacity-30 select-none">
          NETWORK // 06
        </div>

        {/* Section Header */}
        <div className="flex items-center justify-between pb-3 mb-4 mt-1 border-b border-[var(--theme-border)]/60">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)]" />
            <h2 className="font-theme-heading text-xs tracking-[0.2em] uppercase font-semibold text-[var(--theme-text-primary)]">
              Digital Presence &amp; Channels
            </h2>
          </div>
          <span className="text-[9px] font-mono uppercase tracking-widest text-[var(--theme-text-muted)] font-medium px-2 py-0.5 rounded-full bg-[var(--theme-surface-hover)] border border-[var(--theme-border)]">
            Verified
          </span>
        </div>

        {/* Social Stack (Mobile-Optimized Luxury List) */}
        <div className="space-y-2.5">
          {socialLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => luxuryAudio.playHapticTick()}
              className="group p-3.5 rounded-2xl bg-gradient-to-r from-[var(--theme-surface-hover)] to-[var(--theme-surface)] border border-[var(--theme-border)] hover:border-[var(--theme-border-hover)] flex items-center justify-between transition-all duration-300 active:scale-[0.98] cursor-pointer shadow-2xs"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-[var(--theme-surface)] border border-[var(--theme-border)] text-[var(--theme-text-primary)] flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:border-[var(--theme-border-hover)] transition-all shadow-2xs">
                  {renderSocialIcon(link.platform)}
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-semibold text-[var(--theme-text-primary)] block tracking-wide truncate">
                    {link.label}
                  </span>
                  {link.handle && (
                    <span className="text-[10px] text-[var(--theme-text-muted)] block truncate font-mono">
                      {link.handle}
                    </span>
                  )}
                </div>
              </div>

              <div className="w-7 h-7 rounded-full flex items-center justify-center text-[var(--theme-text-muted)] group-hover:text-[var(--theme-text-primary)] group-hover:bg-[var(--theme-surface-hover)] transition-all shrink-0">
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};
