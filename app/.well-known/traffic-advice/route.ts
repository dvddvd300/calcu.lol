import { NextResponse } from 'next/server';

export async function GET() {
  const content = `# Traffic Advice for calcu.lol
# This file provides hints to Chrome for prefetching and preloading
# For more information: https://github.com/WICG/traffic-advice

# High priority pages for prefetching
# These are the most commonly accessed calculators
/en/time/age-calculator
/en/math/percentage-calculator
/en/ti/speed-calculator
/en/finance/tip-calculator
/en/conversion/distance-converter
/en/conversion/temperature-converter
/en/conversion/weight-converter
/en/conversion/speed-converter
/en/time/date-calculator
/en/time/time-calculator
/en/ti/storage-calculator

# Medium priority pages
/en/calculators
/en

# Low priority pages (less frequently accessed)
# These can be prefetched with lower priority

# Resource hints for critical assets
# CSS and JS files that are essential for the site to function
/globals.css
/_next/static/css/
/_next/static/js/

# API endpoints that might be called
/api/calculate

# Static assets that are commonly used
/icon-192x192.png
/icon-512x512.png
/favicon.ico

# Language-specific versions of high-priority pages
/es/time/age-calculator
/fr/time/age-calculator
/de/time/age-calculator
/es/math/percentage-calculator
/fr/math/percentage-calculator
/de/math/percentage-calculator

# Note: This file helps Chrome optimize prefetching behavior
# by providing hints about which pages and resources are most important
# for the user experience on calcu.lol

# Last updated: ${new Date().toISOString().split('T')[0]}`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
