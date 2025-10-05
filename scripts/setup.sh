#!/bin/bash

echo "🚀 Setting up calcu.lol - Free Online Calculators"
echo "=================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Create .env.local file
echo "🔧 Creating environment file..."
cat > .env.local << EOF
# Environment variables for calcu.lol
NEXT_PUBLIC_SITE_URL=https://calcu.lol
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
EOF

echo "✅ Environment file created"

# Run build to check for errors
echo "🔨 Running build check..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi

echo "✅ Build successful"

echo ""
echo "🎉 Setup complete! You can now:"
echo "   • Run 'npm run dev' to start the development server"
echo "   • Visit http://localhost:3000 to see your app"
echo "   • Deploy to Cloudflare Pages for production"
echo ""
echo "📚 Available commands:"
echo "   • npm run dev     - Start development server"
echo "   • npm run build  - Build for production"
echo "   • npm run start  - Start production server"
echo "   • npm run lint   - Run ESLint"
echo ""
echo "🌍 Your app supports:"
echo "   • English (en) - /en/"
echo "   • Spanish (es) - /es/"
echo "   • German (de) - /de/"
echo "   • French (fr) - /fr/"
echo ""
echo "Happy coding! 🚀"
