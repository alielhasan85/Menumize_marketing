// i18n/routing.ts
import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  // Supported locales
  locales: ['en', 'ar'] as const,
  // Default locale
  defaultLocale: 'en',
  // You can tweak this later (always/as-needed/never)
  localePrefix: 'always',
});