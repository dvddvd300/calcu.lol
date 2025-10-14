import { generateSitemapUrls } from '@/lib/sitemap';

export const dynamic = 'force-static';

export default function sitemap() {
  // Automatically generate sitemap URLs from routing configuration
  return generateSitemapUrls();
}
