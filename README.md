# calcu.lol - Free Online Calculators

A comprehensive collection of free online calculators with full internationalization support. Built with Next.js 15 and next-intl for optimal SEO and user experience.

## Features

- 🌍 **Multi-language Support**: English, Spanish, German, and French
- 🚀 **SEO Optimized**: Subdirectory URL structure with hreflang tags
- 📱 **Responsive Design**: Works perfectly on all devices
- ⚡ **Fast Performance**: Built with Next.js 15 and optimized for speed
- 🎯 **User-Friendly**: Intuitive interface with real-time calculations

## URL Structure

The application uses subdirectory-based internationalization:

- `calcu.lol/en/ti/speed-calculator/` - English
- `calcu.lol/es/ti/calculadora-velocidad/` - Spanish  
- `calcu.lol/de/ti/geschwindigkeit-rechner/` - German
- `calcu.lol/fr/ti/calculateur-vitesse/` - French

## Available Calculators

- **Speed Calculator** - Calculate download time based on file size and connection speed
- **Percentage Calculator** - Calculate percentages, increases, and decreases
- **Tip Calculator** - Calculate tip amounts and split bills
- **Age Calculator** - Calculate age in years, months, and days
- **Time Calculator** - Add and subtract time values
- **Date Calculator** - Calculate differences between dates
- **Unit Converter** - Convert between different units of measurement
- **Currency Converter** - Convert between different currencies
- **Temperature Converter** - Convert between temperature scales

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Internationalization**: next-intl
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Deployment**: Optimized for Cloudflare Pages

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
calcu.lol/
├── app/
│   ├── [locale]/                 # Internationalized routes
│   │   ├── layout.tsx           # Locale-specific layout
│   │   ├── page.tsx             # Homepage
│   │   └── speed-calculator/   # Calculator pages
│   ├── api/                     # API routes
│   └── sitemap.ts              # Multi-locale sitemap
├── components/                  # Reusable components
├── i18n/                       # Internationalization config
│   ├── routing.ts              # Locale routing configuration
│   ├── request.ts              # Message loading logic
│   └── messages/               # Translation files
│       ├── en.json
│       ├── es.json
│       ├── de.json
│       └── fr.json
└── middleware.ts                # Locale detection & routing
```

## SEO Features

- **Hreflang Tags**: Automatic generation for all pages
- **Canonical URLs**: Proper canonical URL structure
- **Meta Tags**: Optimized for each language
- **Sitemap**: Multi-locale XML sitemap
- **Open Graph**: Social media optimization
- **Twitter Cards**: Twitter-specific meta tags

## Deployment

The application is optimized for deployment on Cloudflare Pages:

1. **Build Command**: `npm run build`
2. **Output Directory**: `.next`
3. **Node Version**: 18.x or higher

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For support, email support@calcu.lol or create an issue on GitHub.