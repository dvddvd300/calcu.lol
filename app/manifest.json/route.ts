import { NextResponse } from 'next/server';

export async function GET() {
  const manifest = {
    "name": "calcu.lol - Free Online Calculators",
    "short_name": "calcu.lol",
    "description": "Free online calculators for speed, time, BMI, percentages, and more. Calculate anything with our comprehensive collection of tools.",
    "start_url": "/",
    "display": "standalone",
    "background_color": "#ffffff",
    "theme_color": "#3b82f6",
    "orientation": "portrait-primary",
    "scope": "/",
    "lang": "en",
    "categories": ["utilities", "productivity", "education"],
    "icons": [
      {
        "src": "/icon-192x192.png",
        "sizes": "192x192",
        "type": "image/png",
        "purpose": "any maskable"
      },
      {
        "src": "/icon-512x512.png",
        "sizes": "512x512",
        "type": "image/png",
        "purpose": "any maskable"
      }
    ],
    "shortcuts": [
      {
        "name": "Age Calculator",
        "short_name": "Age Calc",
        "description": "Calculate your age in years, months, days, and more",
        "url": "/en/time/age-calculator",
        "icons": [
          {
            "src": "/icon-192x192.png",
            "sizes": "192x192"
          }
        ]
      },
      {
        "name": "Percentage Calculator",
        "short_name": "Percentage",
        "description": "Calculate percentages, percentage change, and more",
        "url": "/en/math/percentage-calculator",
        "icons": [
          {
            "src": "/icon-192x192.png",
            "sizes": "192x192"
          }
        ]
      },
      {
        "name": "Speed Calculator",
        "short_name": "Speed",
        "description": "Calculate speed, distance, and time",
        "url": "/en/ti/speed-calculator",
        "icons": [
          {
            "src": "/icon-192x192.png",
            "sizes": "192x192"
          }
        ]
      },
      {
        "name": "Tip Calculator",
        "short_name": "Tip",
        "description": "Calculate tips and split bills",
        "url": "/en/finance/tip-calculator",
        "icons": [
          {
            "src": "/icon-192x192.png",
            "sizes": "192x192"
          }
        ]
      }
    ],
    "screenshots": [
      {
        "src": "/screenshot-desktop.png",
        "sizes": "1280x720",
        "type": "image/png",
        "form_factor": "wide",
        "label": "calcu.lol desktop view"
      },
      {
        "src": "/screenshot-mobile.png",
        "sizes": "375x667",
        "type": "image/png",
        "form_factor": "narrow",
        "label": "calcu.lol mobile view"
      }
    ],
    "related_applications": [],
    "prefer_related_applications": false,
    "edge_side_panel": {
      "preferred_width": 400
    },
    "launch_handler": {
      "client_mode": "navigate-existing"
    }
  };

  return new NextResponse(JSON.stringify(manifest, null, 2), {
    headers: {
      'Content-Type': 'application/manifest+json',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
