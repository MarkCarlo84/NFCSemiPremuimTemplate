import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { profileConfig } from './config/profile.config';
import type { PortfolioItem } from './types/profile';
import { downloadVCard } from './utils/vcard';
import { luxuryAudio } from './utils/audio';

// Components
import { HeroSection } from './components/HeroSection';
import { QuickContactActions } from './components/QuickContactActions';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { PortfolioSection } from './components/PortfolioSection';
import { SocialMediaSection } from './components/SocialMediaSection';
import { ContactDetailsSection } from './components/ContactDetailsSection';
import { Footer } from './components/Footer';
import { ShareModal } from './components/ShareModal';
import { LightboxModal } from './components/LightboxModal';
import { ToastNotification } from './components/ToastNotification';

export function App() {
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nfc_theme_mode');
      if (saved === 'dark' || saved === 'light') return saved;
    }
    return profileConfig.defaultTheme === 'light' ? 'light' : 'dark';
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [activeLightboxProject, setActiveLightboxProject] = useState<PortfolioItem | null>(null);

  // Apply active theme mode (dark or light) to the HTML root
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', themeMode);
    try {
      localStorage.setItem('nfc_theme_mode', themeMode);
    } catch {
      // Fallback if storage is blocked
    }
  }, [themeMode]);

  const toggleThemeMode = () => {
    setThemeMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Show Toast with auto-dismiss
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 3500);
  };

  // Save Contact Action: Downloads .vcf, chimes audio, triggers monochrome confetti, and shows toast
  const handleSaveContact = () => {
    luxuryAudio.playChime(528, 0.7);

    // Subtle luxury monochrome confetti
    try {
      const confettiColors =
        themeMode === 'light'
          ? ['#000000', '#2B2B2B', '#555555', '#888888']
          : ['#FFFFFF', '#E0E0E0', '#B0B0B0', '#777777'];

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.75 },
        colors: confettiColors,
        disableForReducedMotion: true,
      });
    } catch {
      // Fallback if canvas is unavailable
    }

    const success = downloadVCard(profileConfig);
    if (success) {
      showToast(`${profileConfig.name}'s contact card (.vcf) downloaded`);
    } else {
      showToast('Contact card generated');
    }
  };

  const handleExploreWork = () => {
    const el = document.getElementById('portfolio-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const { sectionVisibility } = profileConfig;

  return (
    <div className="min-h-screen bg-[var(--theme-desktop-bg)] text-[var(--theme-text-primary)] transition-colors duration-500 relative flex justify-center items-start sm:py-8 font-theme-body bg-luxury-grain">
      
      {/* Desktop Ambient Spotlight Glow */}
      <div className="fixed inset-0 pointer-events-none bg-radial from-[var(--theme-accent)]/8 via-transparent to-transparent opacity-70 hidden sm:block" />

      {/* Flagship Smartphone / Mobile Device Shell */}
      <div className="w-full max-w-[440px] min-h-screen sm:min-h-[880px] bg-[var(--theme-bg)] sm:rounded-[44px] sm:border sm:border-[var(--theme-border)] sm:shadow-[0_25px_80px_rgba(0,0,0,0.5),0_0_0_1px_var(--theme-border)] relative flex flex-col overflow-hidden transition-colors duration-500 z-10">

        {/* Main Content Area */}
        <main className="flex-1 w-full flex flex-col items-center">
          
          {/* 1. Hero Section */}
          {sectionVisibility.hero && (
            <HeroSection
              profile={profileConfig}
              onSaveContact={handleSaveContact}
              onExploreWork={handleExploreWork}
              onOpenShare={() => setIsShareModalOpen(true)}
              themeMode={themeMode}
              onToggleThemeMode={toggleThemeMode}
            />
          )}

          {/* 2. Direct Contact Touchpoints */}
          {sectionVisibility.quickContact && (
            <QuickContactActions
              profile={profileConfig}
              onSaveContact={handleSaveContact}
              onOpenShare={() => setIsShareModalOpen(true)}
              onShowToast={showToast}
            />
          )}

          {/* 3. Editorial About & Philosophy */}
          {sectionVisibility.about && (
            <AboutSection profile={profileConfig} />
          )}

          {/* 4. Services & Private Commissions */}
          {sectionVisibility.services && profileConfig.services?.length > 0 && (
            <ServicesSection services={profileConfig.services} />
          )}

          {/* 5. Curated Portfolio & Gallery */}
          {sectionVisibility.portfolio && profileConfig.portfolio?.length > 0 && (
            <PortfolioSection
              portfolio={profileConfig.portfolio}
              onOpenLightbox={(proj) => setActiveLightboxProject(proj)}
            />
          )}

          {/* 6. Studio Operations & Consultation Booking */}
          {sectionVisibility.contactDetails && (
            <ContactDetailsSection
              profile={profileConfig}
              onShowToast={showToast}
            />
          )}

          {/* 7. Social Media & Digital Channels */}
          {sectionVisibility.socialMedia && profileConfig.socialLinks?.length > 0 && (
            <SocialMediaSection socialLinks={profileConfig.socialLinks} />
          )}

        </main>

        {/* Luxury Footer */}
        <Footer
          profile={profileConfig}
          onSaveContact={handleSaveContact}
        />

      </div>

      {/* Lightbox Modal for Fullscreen Portfolio Inspection */}
      <LightboxModal
        project={activeLightboxProject}
        projects={profileConfig.portfolio}
        onClose={() => setActiveLightboxProject(null)}
        onSelectProject={(proj) => setActiveLightboxProject(proj)}
      />

      {/* Share & QR Code Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        profile={profileConfig}
        onShowToast={showToast}
      />

      {/* Floating Toast Notification */}
      <ToastNotification
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />

    </div>
  );
}

export default App;
