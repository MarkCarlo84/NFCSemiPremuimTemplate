import type { ProfileConfig } from '../types/profile';

/**
 * Escapes special characters for vCard format according to RFC 2426/6350
 */
function escapeVCardValue(value: string): string {
  if (!value) return '';
  return value
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}

/**
 * Generates an RFC-compliant vCard 3.0 string from a ProfileConfig
 */
export function generateVCardString(profile: ProfileConfig): string {
  const parts = profile.name.trim().split(' ');
  const firstName = parts[0] || '';
  const lastName = parts.slice(1).join(' ') || '';

  const lines: string[] = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `PRODID:-//NFC Premium Digital Identity//EN`,
    `FN;CHARSET=UTF-8:${escapeVCardValue(profile.name)}`,
    `N;CHARSET=UTF-8:${escapeVCardValue(lastName)};${escapeVCardValue(firstName)};;;`,
  ];

  if (profile.title) {
    lines.push(`TITLE;CHARSET=UTF-8:${escapeVCardValue(profile.title)}`);
  }

  if (profile.company) {
    lines.push(`ORG;CHARSET=UTF-8:${escapeVCardValue(profile.company)}`);
  }

  if (profile.contact.phone) {
    // Standard cell/voice
    lines.push(`TEL;TYPE=CELL,VOICE:${profile.contact.phone.replace(/\s+/g, '')}`);
  }

  if (profile.contact.email) {
    lines.push(`EMAIL;TYPE=INTERNET,PREF:${profile.contact.email.trim()}`);
  }

  if (profile.contact.website) {
    lines.push(`URL;TYPE=WORK:${profile.contact.website.trim()}`);
  }

  if (profile.contact.address || profile.contact.cityCountry) {
    const street = escapeVCardValue(profile.contact.address || '');
    const city = escapeVCardValue(profile.contact.cityCountry || '');
    lines.push(`ADR;TYPE=WORK:;;${street};${city};;;`);
  }

  // Note with Tagline and Bio
  const noteParts: string[] = [];
  if (profile.tagline) noteParts.push(profile.tagline);
  if (profile.shortBio) noteParts.push(profile.shortBio);
  if (profile.contact.calendarUrl) noteParts.push(`Book Consultation: ${profile.contact.calendarUrl}`);
  
  if (noteParts.length > 0) {
    lines.push(`NOTE;CHARSET=UTF-8:${escapeVCardValue(noteParts.join('\n\n'))}`);
  }

  // Social profiles
  profile.socialLinks.forEach((link) => {
    lines.push(`X-SOCIALPROFILE;TYPE=${link.platform}:${link.url}`);
  });

  lines.push('END:VCARD');

  return lines.join('\r\n');
}

/**
 * Triggers an instant download of the contact's .vcf card
 */
export function downloadVCard(profile: ProfileConfig): boolean {
  try {
    const vCardData = generateVCardString(profile);
    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const filename = `${profile.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}_contact.vcf`;
    
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);

    return true;
  } catch (error) {
    console.error('Failed to generate vCard download:', error);
    return false;
  }
}
