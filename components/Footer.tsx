import React from 'react';
import Logo from './Logo';
import { navItems } from 'constants/navItems';
import { CustomLink } from './CustomLink';
import { AiOutlineGithub, AiOutlineLinkedin, AiOutlineTwitter } from 'react-icons/ai';

export const Footer = () => {
  const socials = [
    {
      name: 'Twitter',
      icon: <AiOutlineTwitter className="h-5 w-5 hover:text-primary transition duration-150" />,
      link: 'https://twitter.com', // TODO: Menumize account later
    },
    {
      name: 'LinkedIn',
      icon: <AiOutlineLinkedin className="h-5 w-5 hover:text-primary transition duration-150" />,
      link: 'https://linkedin.com', // TODO: Menumize page later
    },
    {
      name: 'GitHub',
      icon: <AiOutlineGithub className="h-5 w-5 hover:text-primary transition duration-150" />,
      link: 'https://github.com/alielhasan85', // or org when you create it
    },
  ];

  return (
    <div className="border-t border-slate-900/5 py-10 max-w-6xl mx-auto px-8">
      <div className="flex flex-col justify-center items-center py-10 ">
        {/* Make sure Logo shows "Menumize" inside – we can update that component next */}
        <Logo textClassName="text-black text-xl" />

        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-4">
          {navItems.map((navItem: any, idx: number) => (
            <CustomLink
              key={`footer-link-${idx}`}
              href={navItem.link}
              className="text-zinc-500 text-sm relative"
            >
              <span className="relative z-10 px-2 py-2 inline-block">{navItem.name}</span>
            </CustomLink>
          ))}
        </div>
        <p className="text-slate-500 text-sm font-light text-center mt-8 border-t border-zinc-100 pt-4">
          © {new Date().getFullYear()} Menumize. All rights reserved.
        </p>
        <div className="flex flex-row justify-center space-x-2 mt-2">
          {socials.map((socialLink: any, idx: number) => (
            <a
              key={`footer-link-${idx}`}
              href={socialLink.link}
              className="text-zinc-500 text-sm relative"
              target="__blank"
            >
              <span className="relative z-10 px-2 py-2 inline-block">{socialLink.icon}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
