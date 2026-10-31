import type { ProfileConfig } from '../types/profile';

/**
 * =========================================================================
 * PROFILE CONFIGURATION TEMPLATE — LOREM IPSUM
 * =========================================================================
 * Clean placeholder configuration for the Premium NFC Digital Business Card.
 * Customize with your personal or brand credentials.
 */
export const profileConfig: ProfileConfig = {
  // Identity & Credentials
  name: 'Lorem Ipsum',
  preferredName: 'Lorem',
  credentials: '',
  title: 'Lorem Ipsum & Dolor Sit',
  company: 'Lorem Ipsum Studio',
  tagline: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  
  // Biography
  shortBio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua based in Lorem City, Country.',
  fullBio: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  
  brandStatement: '“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.”',

  // Minimalist Grey Vector Imagery
  avatarUrl: '/images/portrait.svg',
  coverUrl: '/images/banner.svg',
  location: 'Lorem City, Country',

  // Real-time Availability Badge
  availability: {
    status: 'available',
    note: 'Lorem ipsum dolor sit amet',
  },

  // Contact Details
  contact: {
    phone: '+1 234 567 8900',
    email: 'lorem.ipsum@example.com',
    whatsapp: '+12345678900',
    website: 'https://example.com',
    address: '123 Lorem Ipsum Way',
    cityCountry: 'Lorem City, Country',
    timezone: 'UTC (GMT+0)',
    calendarUrl: 'mailto:lorem.ipsum@example.com?subject=Inquiry%20from%20NFC%20Card',
  },

  // Social Channels
  socialLinks: [
    {
      platform: 'github',
      url: 'https://github.com',
      label: 'GitHub',
      handle: '@loremipsum',
    },
    {
      platform: 'facebook',
      url: 'https://facebook.com',
      label: 'Facebook',
      handle: '@loremipsum',
    },
    {
      platform: 'instagram',
      url: 'https://instagram.com',
      label: 'Instagram',
      handle: '@loremipsum',
    },
    {
      platform: 'custom',
      url: 'https://example.com',
      label: 'Portfolio Site',
      handle: 'example.com',
    },
  ],

  // Key Expertise / Competencies
  expertise: [
    'Lorem Ipsum Dolor',
    'Consectetur Adipiscing',
    'Sed Do Eiusmod',
    'Tempor Incididunt',
    'Magna Aliqua Enim',
    'Minim Veniam Quis',
  ],

  // Milestones & Metrics
  milestones: [
    {
      value: '10+',
      label: 'Lorem Ipsum',
      description: 'Dolor sit amet consectetur',
    },
    {
      value: '99%',
      label: 'Adipiscing Elit',
      description: 'Sed do eiusmod tempor',
    },
    {
      value: '100+',
      label: 'Incididunt Labore',
      description: 'Magna aliqua et dolore',
    },
    {
      value: '24/7',
      label: 'Minim Veniam',
      description: 'Nostrud exercitation ullamco',
    },
  ],

  // Services & Professional Offerings
  services: [
    {
      id: 'service-1',
      title: 'Lorem Ipsum Dolor Sit',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      startingPrice: 'Lorem Ipsum',
      ctaText: 'Discuss Project',
      ctaUrl: 'mailto:lorem.ipsum@example.com?subject=Lorem%20Ipsum%20Inquiry',
      featured: true,
    },
    {
      id: 'service-2',
      title: 'Consectetur Adipiscing Elit',
      description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      startingPrice: 'Dolor Sit Amet',
      ctaText: 'Request Details',
      ctaUrl: 'mailto:lorem.ipsum@example.com?subject=Lorem%20Ipsum%20Inquiry',
    },
    {
      id: 'service-3',
      title: 'Tempor Incididunt Labore',
      description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint.',
      startingPrice: 'Magna Aliqua',
      ctaText: 'Inquire Now',
      ctaUrl: 'mailto:lorem.ipsum@example.com?subject=Lorem%20Ipsum%20Inquiry',
    },
  ],

  // Portfolio Highlights
  portfolio: [
    {
      id: 'proj-1',
      title: 'Lorem Ipsum Project One',
      category: 'Lorem Category',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      image: '/images/project-pos.svg',
      link: 'https://example.com',
      year: '2025',
      client: 'Lorem Client',
    },
    {
      id: 'proj-2',
      title: 'Lorem Ipsum Project Two',
      category: 'Ipsum Category',
      description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      image: '/images/project-rfid.svg',
      link: 'https://example.com',
      year: '2025',
      client: 'Ipsum Client',
    },
    {
      id: 'proj-3',
      title: 'Lorem Ipsum Project Three',
      category: 'Dolor Category',
      description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      image: '/images/project-booking.svg',
      link: 'https://example.com',
      year: '2024',
      client: 'Dolor Client',
    },
  ],

  // Default Theme
  defaultTheme: 'dark',

  // Signature Theme Customization
  signatureThemeConfig: {
    bgPrimary: '#0C0A09',
    bgSecondary: '#1C1917',
    textPrimary: '#FAFAF9',
    textSecondary: '#A8A29E',
    accent: '#38BDF8',
    accentHover: '#0284C7',
    borderColor: 'rgba(56, 189, 248, 0.2)',
    fontHeading: 'Cinzel, serif',
    fontBody: 'Plus Jakarta Sans, sans-serif',
  },

  // Toggle section visibility
  sectionVisibility: {
    hero: true,
    quickContact: true,
    about: true,
    services: true,
    portfolio: true,
    contactDetails: true,
    socialMedia: true,
  },

  // Interactive extras
  enableAmbientSound: true,
  showThemeSwitcher: false,

  // SEO & Social Meta
  seo: {
    title: 'Lorem Ipsum — Digital Business Card Template',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Digital business card template for NFC cards.',
    keywords: 'Lorem Ipsum, Digital Business Card, NFC Template, React, TypeScript',
    ogImage: '/images/portrait.svg',
  },
};
