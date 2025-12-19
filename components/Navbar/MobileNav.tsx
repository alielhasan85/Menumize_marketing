// components/Navbar/MobileNav.tsx
'use client';

import React, {useState} from 'react';
import Link from 'next/link';
import {AnimatePresence, motion} from 'framer-motion';
import {IoIosCloseCircleOutline, IoIosMenu} from 'react-icons/io';
import {useLocale, useTranslations} from 'next-intl';

import Logo from '@components/Logo';
import {CustomLink} from '@components/CustomLink';
import type {NavItem} from './Navbar';
import {buildPlatformAuthUrl} from 'constants/platform'; // adjust path

type MobileNavProps = {
  navItems: NavItem[];
  elevated: boolean;
};

export const MobileNav = ({navItems, elevated}: MobileNavProps) => {
  const [open, setOpen] = useState(false);

  const locale = useLocale();
  const t = useTranslations('navbar');
  const loginHref = buildPlatformAuthUrl(locale, 'login');
  const signupHref = buildPlatformAuthUrl(locale, 'signup');

  return (
    <div className="relative w-full">
      {/* pill header */}
      <motion.div
        animate={{
          backgroundColor: 'rgba(255,255,255,0.98)',
          boxShadow:
            elevated || open
              ? '0 16px 40px -22px rgba(15,23,42,0.45)'
              : '0 10px 28px -20px rgba(15,23,42,0.25)'
        }}
        className="flex items-center justify-between rounded-full px-4 py-3"
      >
        <Logo textClassName="text-[var(--primary)]" />

        <motion.button
          type="button"
          whileHover={{scale: 1.05}}
          whileTap={{scale: 0.92}}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation"
        >
          {open ? (
            <IoIosCloseCircleOutline className="h-6 w-6 text-[var(--foreground)]" />
          ) : (
            <IoIosMenu className="h-7 w-7 text-[var(--foreground)]" />
          )}
        </motion.button>
      </motion.div>

      {/* dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{opacity: 0, y: -4, scale: 0.98}}
            animate={{opacity: 1, y: 8, scale: 1}}
            exit={{opacity: 0, y: -4, scale: 0.98}}
            transition={{duration: 0.18, ease: 'easeOut'}}
            className="absolute left-0 right-0 mt-1 rounded-3xl bg-white shadow-[0_20px_45px_rgba(15,23,42,0.25)] border border-[var(--border)] overflow-hidden"
          >
            <nav className="flex flex-col gap-3 px-4 py-4">
              {navItems.map((item) => (
                <CustomLink
                  key={item.name}
                  href={item.link}
                  onClick={() => setOpen(false)}
                  className="block text-base text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                >
                  {item.name}
                </CustomLink>
              ))}

              <div className="mt-1 flex flex-col gap-2 pt-2 border-t border-[var(--border)]">
                <Link
                  href={loginHref}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                >
                  {t('logIn')}
                </Link>
                <Link
                  href={signupHref}
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center rounded-xl bg-[var(--primary)] px-4 py-2 text-sm font-medium text-[var(--primary-foreground)] shadow-[0_10px_26px_rgba(15,23,42,0.28)] hover:bg-[#243744]"
                >
                  {t('signUp')}
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
