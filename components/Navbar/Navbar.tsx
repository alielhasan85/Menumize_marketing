// components/Navbar/Navbar.tsx
'use client';

import React, { useRef, useState } from 'react';
import { navItems } from 'constants/navItems';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

import { DesktopNav } from './DesktopNav';
import { MobileNav } from './MobileNav';

export type NavItem = {
  name: string;
  link: string;
};

const Navbar = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollY } = useScroll();
  const [elevated, setElevated] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setElevated(latest > 40);
  });

  return (
    <motion.header
      ref={ref}
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed top-4 left-0 right-0 z-50 flex justify-center"
    >
      {/* Desktop / tablet pill in the center */}
      <div className="hidden md:flex w-full justify-center">
        <motion.div
          animate={{
            backgroundColor: elevated ? 'rgba(255,255,255,0.96)' : 'rgba(255,255,255,0.9)',
            boxShadow: elevated ? '0 14px 35px -18px rgba(15,23,42,0.45)' : '0 0 0 rgba(0,0,0,0)',
            backdropFilter: 'blur(16px)',
          }}
          className="pointer-events-auto w-full max-w-5xl rounded-full border border-[var(--border)] px-4 py-2"
        >
          <DesktopNav navItems={navItems as NavItem[]} />
        </motion.div>
      </div>

      {/* Mobile: full-width pill, dropdown handled inside MobileNav */}
      <div className="block md:hidden w-full px-4">
        <MobileNav navItems={navItems as NavItem[]} elevated={elevated} />
      </div>
    </motion.header>
  );
};

export default Navbar;
