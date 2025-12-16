import Link from 'next/link';
import React from 'react';
import { twMerge } from 'tailwind-merge';

type LogoProps = {
  textClassName?: string;
  logoClassName?: string;
};

const Logo = ({ textClassName, logoClassName }: LogoProps) => {
  return (
    <Link
      href="/"
      aria-label="Menumize home"
      className={twMerge(
        'font-bold text-sm flex items-center justify-center text-white space-x-2',
        logoClassName,
      )}
    >
      {/* Icon box */}
      <span className="bg-primary w-6 h-6 flex items-center justify-center rounded-[6px] font-mono relative overflow-hidden">
        <span className="absolute w-full h-full transform translate-x-3 bg-white/20 rotate-45" />
      </span>

      {/* Brand text */}
      <span className={twMerge('font-mono', textClassName)}>Menumize</span>
    </Link>
  );
};

export default Logo;
