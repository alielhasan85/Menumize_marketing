'use client';
import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Button from './Button';
import { BsArrowRightCircle } from 'react-icons/bs';

type Package = {
  title: string;
  description: string;
  monthly: number;
  yearly: number;
  features: string[];
  className?: string;
  type?: 'monthly' | 'yearly';
  highlight?: boolean;
};

export const Pricing = () => {
  const [type, setType] = useState<'monthly' | 'yearly'>('monthly');

  // ⚠️ Placeholder numbers – change later to your real pricing
  const packages: Record<'starter' | 'growth' | 'pro', Package> = {
    starter: {
      title: 'Starter',
      description: 'For single cafés and restaurants starting with QR menus.',
      monthly: 19,
      yearly: 190,
      features: [
        '1 active venue',
        'Unlimited menu updates',
        'Menus, sections & items',
        'Basic branding (logo & colors)',
        'QR codes for tables',
        'Email support',
      ],
    },
    growth: {
      title: 'Growth',
      description: 'For growing brands with multiple menus and higher traffic.',
      monthly: 39,
      yearly: 390,
      features: [
        'Up to 3 active venues',
        'Advanced branding & layouts',
        'Multi-language menus',
        'Video-ready item cards (coming soon)',
        'Guest insights & analytics',
        'Priority support',
      ],
    },
    pro: {
      title: 'Pro',
      description: 'For groups, hotels, and multi-venue operators.',
      monthly: 79,
      yearly: 790,
      features: [
        'Up to 10 active venues',
        'All Growth features included',
        'Advanced analytics & exports',
        'Role-based access for your team',
        'Custom domains for menu links',
        'Dedicated onboarding support',
      ],
    },
  };

  return (
    <section
      id="pricing"
      className="min-h-[40rem] px-4 bg-white py-20 md:py-40 relative group overflow-hidden"
    >
      <div className="max-w-xl md:mx-auto md:text-center xl:max-w-none relative z-10">
        <h2 className="font-display text-3xl tracking-tight text-zinc-900 sm:text-4xl md:text-5xl">
          Simple pricing per venue
        </h2>
        <p className="mt-6 text-lg tracking-tight text-zinc-600">
          Start with one venue and upgrade as you grow. No setup fees, cancel anytime.
        </p>
      </div>

      {/* Toggle */}
      <div className="mx-auto flex-row space-x-2 justify-center items-center border rounded-3xl border-gray-100 flex mt-20 overflow-hidden w-fit">
        <button
          className={twMerge(
            'text-sm px-4 py-2 inline-flex relative',
            type === 'monthly' && 'bg-gray-50',
          )}
          onClick={() => setType('monthly')}
        >
          Monthly
          {type === 'monthly' && (
            <motion.span
              animate={{ x: -10 }}
              transition={{ duration: 0.5 }}
              className="absolute bottom-0 h-px inset-x-0 bg-gradient-to-r from-primary to-indigo-500 blur-[1px] z-50 mx-auto"
            />
          )}
        </button>
        <button
          className={twMerge(
            'text-sm px-4 py-2 inline-flex relative',
            type === 'yearly' && 'bg-gray-50',
          )}
          onClick={() => setType('yearly')}
        >
          Yearly
          {type === 'yearly' && (
            <motion.span
              animate={{ x: 10 }}
              transition={{ duration: 0.5 }}
              className="absolute bottom-0 h-px inset-x-0 bg-gradient-to-r from-primary to-indigo-500 blur-[1px] z-50 mx-auto"
            />
          )}
        </button>
      </div>

      <p className="mt-4 text-center text-xs text-gray-500">
        {/* tweak this text later if you decide discount % */}
        Save with yearly billing compared to paying month by month.
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto mt-20">
        <PricingCard {...packages.starter} type={type} />
        <PricingCard {...packages.growth} type={type} highlight />
        <PricingCard {...packages.pro} type={type} />
      </div>
    </section>
  );
};

const PricingCard = (props: Package) => {
  const {
    title,
    description,
    monthly,
    yearly,
    features,
    className,
    type = 'monthly',
    highlight,
  } = props;

  const price = type === 'monthly' ? monthly : yearly;

  return (
    <div
      className={twMerge(
        'bg-white rounded-2xl px-8 py-12 relative border border-gray-100',
        highlight && 'bg-primary text-white border-transparent shadow-xl',
        className,
      )}
    >
      <h3
        className={twMerge(
          'leading-6 font-medium text-gray-900 text-2xl',
          highlight && 'text-white',
        )}
      >
        {title}
      </h3>
      <p className={twMerge('mt-4 text-sm text-gray-500', highlight && 'text-white/80')}>
        {description}
      </p>

      <p className="mt-8">
        <span
          className={twMerge('text-5xl font-extrabold text-gray-900', highlight && 'text-white')}
        >
          ${price}
        </span>
        <span
          className={twMerge(
            'text-base font-medium text-gray-500 ml-1',
            highlight && 'text-white/80',
          )}
        >
          {type === 'monthly' ? '/mo' : '/yr'}
        </span>
      </p>
      <p className={twMerge('mt-2 text-xs text-gray-500', highlight && 'text-white/80')}>
        Price per active venue, billed {type === 'monthly' ? 'monthly' : 'yearly'}.
      </p>

      <Button
        as="button"
        variant="large"
        className={twMerge(
          'rounded-2xl py-2 w-full mt-8',
          highlight && 'bg-white text-primary hover:bg-zinc-100',
        )}
      >
        {/* TODO: later point this to your real platform signup */}
        <Link href="/signup">Start free trial</Link>
      </Button>

      <div className="mt-8">
        <ul className="mt-6 space-y-4 relative">
          {!highlight && <div className="absolute w-px h-[90%] inset-y-4 bg-gray-200 left-2" />}
          {features.map((feature) => (
            <li key={feature} className="flex items-center relative z-10">
              <div className="flex-shrink-0">
                <BsArrowRightCircle
                  className={twMerge(
                    'text-gray-500 bg-white',
                    highlight && 'text-primary bg-transparent',
                  )}
                />
              </div>
              <p className={twMerge('ml-3 text-sm text-gray-600', highlight && 'text-white')}>
                {feature}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
