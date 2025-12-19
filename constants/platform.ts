export const PLATFORM_BASE_URL =
  process.env.NEXT_PUBLIC_PLATFORM_URL ?? 'https://platform.menumize.com';

export function buildPlatformAuthUrl(
  locale: string | undefined,
  mode: 'login' | 'signup'
) {
  const base = PLATFORM_BASE_URL.replace(/\/$/, '');
  const safeLocale = locale || 'en';

  if (mode === 'login') {
    return `${base}/${safeLocale}/login`;
  }

  // signup → login with query
  return `${base}/${safeLocale}/login?mode=signup`;
}
