'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { BlurImage } from './BlurImage';
import Button from './Button';
import { GridPattern } from './GridPattern';
import { motion, useScroll } from 'framer-motion';

export const Hero = () => {
  // no squares overlay → clean grid only
  const pattern = {
    y: -6,
    squares: [] as [number, number][],
  };

  const [isHalf, setIsHalf] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      if (scrollY.get() > (window.innerHeight * 2) / 10) {
        setIsHalf(true);
      } else {
        setIsHalf(false);
      }
    };
    scrollY.onChange(handleScroll);
    return () => {
      scrollY.clearListeners();
    };
  }, [scrollY]);

  return (
    <section id="hero" className="relative px-4 pt-24 pb-24">
      {/* subtle brand background pattern (only light grid now) */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl transition duration-300 [mask-image:linear-gradient(white,transparent)]">
        <GridPattern
          width={120}
          height={120}
          x="50%"
          className="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-5deg] fill-transparent stroke-[var(--border)]"
          {...pattern}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* 🔹 animated badge */}
        {/* <div className="flex justify-center">
          <HeroBadge />
        </div> */}

        {/* headline – base text uses brand primary now */}
        <h1 className="mt-8 font-semibold text-4xl sm:text-6xl lg:text-7xl text-center max-w-5xl mx-auto leading-tight tracking-tight text-[var(--primary)]">
          Beautiful <span className="text-[var(--accent-foreground)]">digital QR menus</span> that
          feel like your brand.
        </h1>

        {/* subtext */}
        <p className="mx-auto mt-6 max-w-3xl text-lg sm:text-xl tracking-tight text-center leading-normal text-[var(--muted-foreground)]">
          Menumize lets you launch fast, branded QR menus, update items in seconds, and see what
          guests actually love — without changing your existing workflow.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center items-center mt-10">
          <Button
            as="button"
            variant="large"
            className="rounded-2xl py-2 px-6 bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[#243744]"
          >
            <Link href="/signup">Start free trial</Link>
          </Button>

          <Button
            as="button"
            variant="outline"
            className="rounded-2xl py-2 px-6 border border-[var(--accent-foreground)] bg-[var(--accent)]/60 text-[var(--accent-foreground)] hover:bg-[var(--accent)]"
          >
            <Link href="/demo">View live demo menu</Link>
          </Button>
        </div>

        {/* screenshot area */}
        <div
          style={{ perspective: '1000px' }}
          className="overflow-hidden pt-16 sm:pt-20 px-4 w-full relative"
        >
          <motion.div
            animate={{
              rotateX: isHalf ? 0 : 45,
              scale: isHalf ? [0.8, 1.05, 1] : 0.8,
              transition: {
                type: 'spring',
                stiffness: 100,
                damping: 20,
                mass: 0.5,
              },
            }}
            className="relative w-full overflow-x-hidden md:w-3/4 mx-auto h-[12rem] sm:h-[16rem] md:h-[24rem] lg:h-[32rem] -mb-12 md:-mb-32 max-w-5xl"
          >
            <BlurImage
              src="/images/landing.png" // later: real Menumize screenshot
              layout="fill"
              className="rounded-xl md:rounded-3xl border border-[var(--border)] mx-auto object-cover shadow-sm object-right-top"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/**
 * Animated badge with rotating gradient outline,
 * adapted from the sample "We raised $69M pre seed"
 * but using Menumize brand tokens.
 */
const HeroBadge = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative mx-auto mb-6 flex w-fit items-center justify-center overflow-hidden rounded-full p-px"
    >
      {/* rotating gradient strip */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-transparent via-[var(--accent-foreground)] to-transparent"
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        style={{ width: '280px', height: '32px' }}
      />

      {/* inner pill */}
      <div className="relative z-10 flex items-center gap-2 rounded-full bg-[var(--card)] px-4 py-2 text-xs sm:text-sm font-medium text-[var(--accent-foreground)] shadow-sm">
        <span className="h-2 w-2 rounded-full bg-[var(--accent-foreground)]" />
        <span>Digital menu platform for modern venues</span>
      </div>
    </motion.div>
  );
};
