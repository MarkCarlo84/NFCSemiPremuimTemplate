export type ThemeId = 'dark' | 'light' | 'obsidian' | 'ivory' | 'executive' | 'atelier' | 'signature';

export interface ContactInfo {
  phone?: string;
  email?: string;
  whatsapp?: string;
  telegram?: string;
  website?: string;
  address?: string;
  cityCountry?: string;
  timezone?: string;
  calendarUrl?: string; // e.g. Cal.com or Calendly
}

export type SocialPlatform = 
  | 'instagram'
  | 'linkedin'
  | 'x'
  | 'youtube'
  | 'tiktok'
  | 'github'
  | 'behance'
  | 'spotify'
  | 'facebook'
  | 'custom';

export interface SocialLink {
  platform: SocialPlatform;
  url: string;
  label: string;
  handle?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  startingPrice?: string;
  ctaText?: string;
  ctaUrl?: string;
  iconName?: string;
  featured?: boolean;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description?: string;
  image: string;
  link?: string;
  year?: string;
  client?: string;
}

export interface MilestoneItem {
  value: string;
  label: string;
  description?: string;
}

export interface SignatureThemeCustomization {
  bgPrimary: string;
  bgSecondary: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;
  accentHover: string;
  borderColor: string;
  fontHeading: string;
  fontBody: string;
}

export interface ProfileConfig {
  // Identity
  name: string;
  preferredName?: string;
  credentials?: string;
  title: string;
  company?: string;
  tagline: string;
  shortBio: string;
  fullBio: string;
  brandStatement?: string;
  avatarUrl: string;
  coverUrl?: string;
  location: string;
  
  // Real-time status / Availability
  availability: {
    status: 'available' | 'booked' | 'selective';
    note: string;
  };

  // Contact details
  contact: ContactInfo;

  // Social handles
  socialLinks: SocialLink[];

  // Professional competencies & statistics
  expertise: string[];
  milestones: MilestoneItem[];

  // Services & Portfolio
  services: ServiceItem[];
  portfolio: PortfolioItem[];

  // Theme & Appearance
  defaultTheme: ThemeId;
  signatureThemeConfig?: SignatureThemeCustomization;
  
  // Section ordering & visibility
  sectionVisibility: {
    hero: boolean;
    quickContact: boolean;
    about: boolean;
    services: boolean;
    portfolio: boolean;
    contactDetails: boolean;
    socialMedia: boolean;
  };

  // Audio & Interactive options
  enableAmbientSound?: boolean;
  showThemeSwitcher?: boolean;

  // SEO & OpenGraph
  seo: {
    title: string;
    description: string;
    keywords?: string;
    ogImage?: string;
  };
}
