// lib/mdx.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { serialize } from 'next-mdx-remote/serialize';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';

const root = process.cwd();

type ContentType = 'blogs' | string;

type FrontMatterBase = {
  wordCount: number;
  readingTime: ReturnType<typeof readingTime>;
  slug: string | null;
  [key: string]: any; // allows title, description, image, etc.
};

/**
 * Returns the list of MDX filenames for a given content type.
 * Example: getFiles("blogs") -> ["what-is-a-blog-anyway.mdx", ...]
 */
export function getFiles(type: ContentType): string[] {
  const dir = path.join(root, 'data', type);
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir).filter((file) => file.toLowerCase().endsWith('.mdx'));
}

/**
 * Reads a single MDX file by type and slug.
 * - If slug is provided: reads data/<type>/<slug>.mdx
 * - If slug is omitted: reads data/<type>.mdx
 */
export async function getFileBySlug(
  type: ContentType,
  slug?: string,
): Promise<{
  mdxSource: MDXRemoteSerializeResult;
  frontMatter: FrontMatterBase;
}> {
  const filePath = slug
    ? path.join(root, 'data', type, `${slug}.mdx`)
    : path.join(root, 'data', `${type}.mdx`);

  const source = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(source);

  const mdxSource = await serialize(content);

  return {
    mdxSource,
    frontMatter: {
      // no "u" flag here – safe for older targets
      wordCount: content.trim().split(/\s+/g).length,
      readingTime: readingTime(content),
      slug: slug || null,
      ...data,
    },
  };
}

/**
 * Returns front matter for all MDX files of a type.
 * Used in /blogs to list all blog cards.
 */
export async function getAllFilesFrontMatter(type: ContentType): Promise<FrontMatterBase[]> {
  const dir = path.join(root, 'data', type);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((file) => file.toLowerCase().endsWith('.mdx'));

  const allPosts = files.reduce<FrontMatterBase[]>((posts, postSlug) => {
    const source = fs.readFileSync(path.join(dir, postSlug), 'utf8');
    const { data, content } = matter(source);

    const frontMatter: FrontMatterBase = {
      wordCount: content.trim().split(/\s+/g).length,
      readingTime: readingTime(content),
      slug: postSlug.replace(/\.mdx$/i, ''),
      ...data,
    };

    return [frontMatter, ...posts];
  }, []);

  return allPosts;
}
