'use client';

import * as React from 'react';
import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote';
import Link from 'next/link';

/**
 * Minimal MDX components map.
 * You can extend this later (for custom buttons, callouts, etc.).
 */
const components = {
  // Make MDX <a> use Next.js <Link> where possible
  a: (props: React.ComponentProps<'a'>) => {
    const href = props.href ?? '#';
    // External links go out normally
    if (href.startsWith('http')) {
      return (
        <a {...props} href={href} target="_blank" rel="noreferrer">
          {props.children}
        </a>
      );
    }

    // Internal links use Next Link
    return (
      <Link href={href}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a>{props.children}</a>
      </Link>
    );
  },
};

export function RenderMDX({ mdxSource }: { mdxSource: MDXRemoteSerializeResult }) {
  return <MDXRemote {...mdxSource} components={components} />;
}
