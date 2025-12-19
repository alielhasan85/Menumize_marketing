// components/Navbar/DesktopNav.tsx
'use client';

import React, {useState} from 'react';
import Link from 'next/link';
import {AnimatePresence, motion} from 'framer-motion';
import {useLocale, useTranslations} from 'next-intl';

import Logo from '@components/Logo';
import {CustomLink} from '@components/CustomLink';
import type {NavItem} from './Navbar';
import {buildPlatformAuthUrl} from 'constants/platform'; // adjust path if different

type Props = {
  navItems: NavItem[];
};

export const DesktopNav = ({navItems}: Props) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const locale = useLocale();
  const t = useTranslations('navbar'); // messages/en/navbar.json
  const loginHref = buildPlatformAuthUrl(locale, 'login');
  const signupHref = buildPlatformAuthUrl(locale, 'signup');

  return (
    <nav className="flex w-full items-center justify-between">
      {/* logo on the left */}
      <Logo textClassName="text-[var(--primary)]" />

      {/* center links */}
      <div className="flex flex-1 items-center justify-center space-x-1 text-sm">
        {navItems.map((item, idx) => (
          <div
            key={item.name}
            className="relative"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <CustomLink
              href={item.link}
              className="relative px-2 py-1.5 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
            >
              <AnimatePresence>
                {hoveredIndex === idx && (
                  <motion.span
                    layoutId="nav-hover-pill"
                    className="absolute inset-0 rounded-full"
                    initial={{opacity: 0}}
                    animate={{
                      opacity: 1,
                      background:
                        'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.2) 100%)',
                      boxShadow: '0 8px 20px rgba(15,23,42,0.08)'
                    }}
                    exit={{opacity: 0}}
                    transition={{duration: 0.08}}
                  />
                )}
              </AnimatePresence>
              <span className="relative z-10">{item.name}</span>
            </CustomLink>
          </div>
        ))}
      </div>

      {/* right actions */}
      <div className="flex items-center gap-3">
        <Link
          href={loginHref}
          className="text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
        >
          {t('logIn')}
        </Link>
        <Link
          href={signupHref}
          className="inline-flex items-center justify-center rounded-full bg-[var(--primary)] px-4 py-2 text-sm font-medium text-[var(--primary-foreground)] shadow-[0_10px_24px_rgba(15,23,42,0.28)] hover:bg-[#243744] transition"
        >
          {t('signUp')}
        </Link>
      </div>
    </nav>
  );
};
