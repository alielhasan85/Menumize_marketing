'use client';
import { features } from 'constants/features';
import { useMotionValue } from 'framer-motion';
import React from 'react';

import { CardPattern } from './CardPattern';

type FeatureType = {
  heading: string;
  description: string | React.ReactNode;
  icon: React.ReactNode;
};

export const SubHero = () => {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function onMouseMove({ currentTarget, clientX, clientY }: any) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const pattern = {
    y: -6,
    squares: [
      [-1, 2],
      [1, 3],
      // Random values between -10 and 10
      ...Array.from({ length: 10 }, () => [
        Math.floor(Math.random() * 20) - 10,
        Math.floor(Math.random() * 20) - 10,
      ]),
    ],
  };

  return (
    <>
      {/* 🔹 Features section (anchor: /#features) */}
      <section
        id="features"
        className="px-4 bg-zinc-900 py-20 md:py-40 relative group"
        onMouseMove={onMouseMove}
      >
        <div className="absolute w-96 h-96 -left-20 -top-20 bg-gradient-to-t from-[#9890e3] to-[#b1f4cf] blur-3xl rounded-full opacity-20" />

        <div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl md:text-5xl">
            Everything your digital menu needs in one place
          </h2>
          <p className="mt-6 text-lg tracking-tight text-blue-100">
            Menumize lets you build branded QR menus, manage items and sections, and keep every
            venue up to date in seconds &mdash; without any technical skills.
          </p>
        </div>

        <CardPattern {...pattern} mouseX={mouseX} mouseY={mouseY} />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-5xl mx-auto gap-20 my-20 md:my-40 px-4">
          {features.map((feature: FeatureType, idx: number) => (
            <Card
              key={`feature-${idx}`}
              heading={feature.heading}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </section>

      {/* 🔹 How it works section (anchor: /#how-it-works) */}
      <section id="how-it-works" className="px-4 py-20 md:py-32 bg-white border-t border-zinc-100">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl tracking-tight text-zinc-900 sm:text-4xl">
            From QR code to live menu in three steps
          </h2>
          <p className="mt-6 text-lg tracking-tight text-zinc-600">
            Set up your venue, build your menu, and share a single QR code. Updates go live
            instantly for every guest.
          </p>
        </div>

        <div className="max-w-5xl mx-auto mt-12 grid gap-10 md:grid-cols-3">
          <HowStep
            number="01"
            title="Create your venue"
            description="Add your restaurant details, logo, and brand colors so your digital menu matches your real-life identity."
          />
          <HowStep
            number="02"
            title="Build your menu"
            description="Create menus, sections, and items with prices, photos, and descriptions. Turn items on or off anytime."
          />
          <HowStep
            number="03"
            title="Print & share your QR"
            description="Place QR codes on tables, counters, or packaging and let guests browse on their phones in their own language."
          />
        </div>
      </section>
    </>
  );
};

const Card = ({ heading, description, icon }: FeatureType) => {
  return (
    <div className="flex flex-col items-start">
      <IconContainer icon={icon} />
      <div className="mt-8">
        <h3 className="text-white text-2xl">{heading}</h3>
        <p className="text-sm text-zinc-100 mt-8 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

const IconContainer = ({ icon }: { icon: React.ReactNode }) => {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-primary/50 transform rounded-md blur-lg" />
      <div className="h-10 w-10 rounded-2xl backdrop-blur-sm flex items-center justify-center bg-white bg-grid-extrasmall-zinc-200 overflow-hidden">
        {icon}
        <div className="absolute inset-0 bg-white [mask-image:linear-gradient(to_bottom,transparent,white_4rem,white_calc(100%-4rem),transparent)] z-40" />
      </div>
    </div>
  );
};

type HowStepProps = {
  number: string;
  title: string;
  description: string;
};

const HowStep = ({ number, title, description }: HowStepProps) => {
  return (
    <div className="text-left md:text-center">
      <p className="text-sm font-mono text-primary mb-2">{number}</p>
      <h3 className="text-lg font-semibold text-zinc-900">{title}</h3>
      <p className="mt-3 text-sm text-zinc-600 leading-relaxed">{description}</p>
    </div>
  );
};
