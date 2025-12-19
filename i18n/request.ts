// i18n/request.ts
import {getRequestConfig} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {routing} from './routing';

export default getRequestConfig(async ({requestLocale}) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  // Split messages per section/page
  const common = (await import(`../messages/${locale}/common.json`)).default;
  const navbar = (await import(`../messages/${locale}/navbar.json`)).default;
  const hero = (await import(`../messages/${locale}/hero.json`)).default;
  const subHero = (await import(`../messages/${locale}/subHero.json`)).default;
  const testimonials = (await import(`../messages/${locale}/testimonials.json`)).default;
  const pricing = (await import(`../messages/${locale}/pricing.json`)).default;
  const cta = (await import(`../messages/${locale}/cta.json`)).default;

  return {
    locale,
    messages: {
      common,
      navbar,
      hero,
      subHero,
      testimonials,
      pricing,
      cta,
    },
  };
});
