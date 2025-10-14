import { routing } from '@/i18n/routing';
import fs from 'fs';
import path from 'path';

export interface SitemapUrl {
  url: string;
  lastModified: Date;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
  alternates?: {
    languages: Record<string, string>;
  };
}

/**
 * Automatically discover all routes from the app directory
 */
export function discoverRoutes(): string[] {
  const routes: string[] = [];
  const appDir = path.join(process.cwd(), 'app');
  
  function scanDirectory(dir: string, basePath: string = '') {
    try {
      const items = fs.readdirSync(dir, { withFileTypes: true });
      
      for (const item of items) {
        if (item.isDirectory()) {
          // Skip special directories
          if (item.name.startsWith('[') || item.name.startsWith('(') || item.name === 'api') {
            continue;
          }
          
          const newBasePath = basePath ? `${basePath}/${item.name}` : `/${item.name}`;
          scanDirectory(path.join(dir, item.name), newBasePath);
        } else if (item.name === 'page.tsx') {
          // Found a page route
          if (basePath) {
            routes.push(basePath);
          } else {
            routes.push('/');
          }
        }
      }
    } catch (error) {
      // Directory doesn't exist or can't be read
      console.warn(`Could not scan directory ${dir}:`, error);
    }
  }
  
  scanDirectory(appDir);
  return routes;
}

/**
 * Get all routes that exist in the file system but might not be in routing config
 */
export function getFileSystemRoutes(): string[] {
  const routes: string[] = [];
  const appDir = path.join(process.cwd(), 'app', '[locale]');
  
  function scanDirectory(dir: string, basePath: string = '') {
    try {
      const items = fs.readdirSync(dir, { withFileTypes: true });
      
      for (const item of items) {
        if (item.isDirectory()) {
          // Skip special directories
          if (item.name.startsWith('[') || item.name.startsWith('(')) {
            continue;
          }
          
          const newBasePath = basePath ? `${basePath}/${item.name}` : `/${item.name}`;
          scanDirectory(path.join(dir, item.name), newBasePath);
        } else if (item.name === 'page.tsx') {
          // Found a page route
          if (basePath) {
            routes.push(basePath);
          } else {
            routes.push('/');
          }
        }
      }
    } catch (error) {
      // Directory doesn't exist or can't be read
      console.warn(`Could not scan directory ${dir}:`, error);
    }
  }
  
  scanDirectory(appDir);
  return routes;
}

/**
 * Get all routes from routing configuration
 */
export function getConfiguredRoutes(): string[] {
  return Object.keys(routing.pathnames);
}

/**
 * Generate sitemap URLs for all discovered routes
 */
export function generateSitemapUrls(): SitemapUrl[] {
  const urls: SitemapUrl[] = [];
  
  // Get all configured routes from routing.ts
  const configuredRoutes = getConfiguredRoutes();
  
  // Add homepage
  urls.push({
    url: 'https://calcu.lol/en',
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 1.0,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map(l => [l, `https://calcu.lol/${l}`])
      )
    }
  });
  
  // Add all configured routes
  for (const route of configuredRoutes) {
    if (route === '/') continue; // Skip homepage as it's already added
    
    const pathnameKey = route as keyof typeof routing.pathnames;
    const pathnameConfig = routing.pathnames[pathnameKey];
    
    if (!pathnameConfig) continue;
    
    // Use English as the primary URL
    const primaryPath = pathnameConfig['en' as keyof typeof pathnameConfig] || route;
    
    // Get route metadata
    const metadata = getRouteMetadata(route);
    
    urls.push({
      url: `https://calcu.lol/en${primaryPath}`,
      lastModified: new Date(),
      changeFrequency: metadata.changeFrequency,
      priority: metadata.priority,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map(l => {
            const translatedPath = pathnameConfig[l as keyof typeof pathnameConfig] || route;
            return [l, `https://calcu.lol/${l}${translatedPath}`];
          })
        )
      }
    });
  }
  
  // Add file system routes that might not be in routing config
  const fileSystemRoutes = getFileSystemRoutes();
  const configuredRoutePaths = new Set(configuredRoutes);
  
  for (const route of fileSystemRoutes) {
    // Skip if already handled by configured routes
    if (configuredRoutePaths.has(route)) continue;
    
    // Get route metadata
    const metadata = getRouteMetadata(route);
    
    urls.push({
      url: `https://calcu.lol/en${route}`,
      lastModified: new Date(),
      changeFrequency: metadata.changeFrequency,
      priority: metadata.priority,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map(l => [l, `https://calcu.lol/${l}${route}`])
        )
      }
    });
  }
  
  // Add special static routes that might not be in routing config
  const specialRoutes = [
    { path: '/about', priority: 0.6, changeFrequency: 'yearly' as const },
    { path: '/contact', priority: 0.6, changeFrequency: 'yearly' as const },
    { path: '/privacy', priority: 0.5, changeFrequency: 'yearly' as const },
    { path: '/terms', priority: 0.5, changeFrequency: 'yearly' as const }
  ];
  
  for (const specialRoute of specialRoutes) {
    // Check if this route exists in the file system
    if (validateRoute(specialRoute.path)) {
      urls.push({
        url: `https://calcu.lol/en${specialRoute.path}`,
        lastModified: new Date(),
        changeFrequency: specialRoute.changeFrequency,
        priority: specialRoute.priority,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map(l => [l, `https://calcu.lol/${l}${specialRoute.path}`])
          )
        }
      });
    }
  }
  
  return urls;
}

/**
 * Get route metadata for better sitemap generation
 */
export function getRouteMetadata(route: string) {
  const metadata: Record<string, any> = {
    changeFrequency: 'monthly' as const,
    priority: 0.8
  };
  
  // Set specific metadata based on route patterns
  if (route === '/' || route.includes('calculators')) {
    metadata.priority = 1.0;
    metadata.changeFrequency = 'weekly';
  } else if (route.includes('/math/') || route.includes('/finance/')) {
    metadata.priority = 0.9;
    metadata.changeFrequency = 'monthly';
  } else if (route.includes('/time/') || route.includes('/conversion/')) {
    metadata.priority = 0.8;
    metadata.changeFrequency = 'monthly';
  } else if (route.includes('/ti/')) {
    metadata.priority = 0.7;
    metadata.changeFrequency = 'monthly';
  }
  
  return metadata;
}

/**
 * Validate that a route exists in the file system
 */
export function validateRoute(route: string): boolean {
  const appDir = path.join(process.cwd(), 'app');
  
  // Handle root route
  if (route === '/') {
    return fs.existsSync(path.join(appDir, '[locale]', 'page.tsx'));
  }
  
  // Handle other routes
  const routePath = route.startsWith('/') ? route.slice(1) : route;
  const fullPath = path.join(appDir, '[locale]', routePath, 'page.tsx');
  
  return fs.existsSync(fullPath);
}
