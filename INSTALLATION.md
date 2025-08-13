# Installation and Setup Guide

## Prerequisites

### System Requirements
- **Operating System**: Windows 10/11, macOS 10.15+, or Ubuntu 18.04+
- **Memory**: Minimum 4GB RAM (8GB recommended)
- **Storage**: 500MB free disk space
- **Browser**: Chrome 90+, Firefox 88+, Safari 14+, or Edge 90+

### Required Software

#### 1. Node.js (Required)
**Download and Install:**
1. Visit [nodejs.org](https://nodejs.org/)
2. Download the LTS version (recommended)
3. Run the installer and follow the setup wizard
4. Restart your computer after installation

**Verify Installation:**
```bash
node --version
npm --version
```

#### 2. Git (Optional but Recommended)
**Download and Install:**
1. Visit [git-scm.com](https://git-scm.com/)
2. Download for your operating system
3. Install with default settings

**Verify Installation:**
```bash
git --version
```

## Quick Start (Windows)

### Option 1: Automatic Setup
1. **Download the project** (if you haven't cloned it yet)
2. **Navigate to project folder**: `Grade6MathsTutor`
3. **Double-click** `start.bat`
4. **Wait for setup** to complete automatically
5. **Browser opens** at `http://localhost:3000`

### Option 2: Manual Setup
1. **Open PowerShell or Command Prompt**
2. **Navigate to project directory:**
   ```cmd
   cd "C:\Users\YourName\Path\To\Grade6MathsTutor"
   ```
3. **Install dependencies:**
   ```cmd
   npm install
   ```
4. **Start development server:**
   ```cmd
   npm run dev
   ```
5. **Open browser** to `http://localhost:3000`

## Detailed Setup Instructions

### Step 1: Clone or Download Project
```bash
# If using Git:
git clone https://github.com/sidk-cloud/Grade6MathsTutor.git
cd Grade6MathsTutor

# Or download ZIP file and extract
```

### Step 2: Install Dependencies
```bash
# Install all required packages
npm install

# This installs:
# - Next.js (React framework)
# - React and React DOM
# - Tailwind CSS (styling)
# - Lucide React (icons)
# - TypeScript (type safety)
# - And other dependencies
```

### Step 3: Start Development Server
```bash
# Start the development server
npm run dev

# Or alternatively:
npm start
```

### Step 4: Access the Application
- **Local URL**: http://localhost:3000
- **Network URL**: http://[your-ip]:3000 (for other devices on same network)

## Available Scripts

### Development
```bash
npm run dev          # Start development server with hot reload
npm run build        # Build production version
npm run start        # Start production server
npm run lint         # Run ESLint for code quality checks
```

### Useful Commands
```bash
npm run type-check   # Check TypeScript types
npm run format       # Format code with Prettier
npm run analyze      # Analyze bundle size
```

## Troubleshooting

### Common Issues

#### 1. "npm is not recognized"
**Problem**: Node.js/npm not installed or not in PATH
**Solution**:
- Reinstall Node.js from nodejs.org
- Restart computer after installation
- Verify with `node --version`

#### 2. "Port 3000 is already in use"
**Problem**: Another application is using port 3000
**Solution**:
- Stop other applications using port 3000
- Or use different port: `npm run dev -- -p 3001`

#### 3. Dependencies Installation Fails
**Problem**: Network issues or permissions
**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules
npm install

# Or use npm ci for clean install
npm ci
```

#### 4. TypeScript Errors
**Problem**: Type checking issues
**Solution**:
```bash
# Check TypeScript configuration
npx tsc --noEmit

# Update TypeScript
npm update typescript
```

#### 5. Permission Errors (macOS/Linux)
**Problem**: Permission denied errors
**Solution**:
```bash
# Fix npm permissions
sudo chown -R $(whoami) ~/.npm

# Or use Node Version Manager (nvm)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

### Browser Issues

#### 1. Voice Features Not Working
**Problem**: Browser doesn't support Web Speech API
**Solution**:
- Use Chrome, Edge, or Safari (Firefox has limited support)
- Ensure microphone permissions are granted
- Try HTTPS instead of HTTP (for some browsers)

#### 2. Interactive Elements Not Responsive
**Problem**: JavaScript disabled or browser compatibility
**Solution**:
- Enable JavaScript in browser settings
- Update to latest browser version
- Clear browser cache and cookies

### Performance Issues

#### 1. Slow Loading
**Problem**: Large bundle size or slow network
**Solution**:
```bash
# Analyze bundle size
npm run analyze

# Enable development mode for faster builds
npm run dev
```

#### 2. Memory Issues
**Problem**: High memory usage
**Solution**:
- Close other tabs/applications
- Restart browser
- Use production build: `npm run build && npm start`

## Development Setup

### IDE Configuration

#### Visual Studio Code (Recommended)
**Extensions**:
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- TypeScript Importer
- Prettier - Code formatter
- ESLint

**Settings** (`.vscode/settings.json`):
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative"
}
```

#### Environment Setup
**Create `.env.local`** (optional):
```env
# Custom environment variables
NEXT_PUBLIC_APP_NAME="Grade 6 Maths Tutor"
NEXT_PUBLIC_API_URL="http://localhost:3000/api"
```

### Code Organization
```
src/
├── app/                 # Next.js App Router
├── components/          # React components
├── lib/                 # Utility functions and data
├── public/              # Static assets
└── styles/              # Global styles
```

## Production Deployment

### Build for Production
```bash
# Create optimized production build
npm run build

# Test production build locally
npm run start
```

### Deployment Options

#### 1. Vercel (Recommended for Next.js)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts for configuration
```

#### 2. Netlify
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Deploy automatically on push

#### 3. Traditional Hosting
```bash
# Build static export (if needed)
npm run build
npm run export

# Upload 'out' folder to web server
```

## Getting Help

### Resources
- **Documentation**: README.md and FEATURES.md
- **Issues**: GitHub Issues page
- **Community**: Discussion forums
- **Support**: Email support team

### Before Asking for Help
1. **Check this guide** for common solutions
2. **Search existing issues** on GitHub
3. **Provide details**: OS, Node version, error messages
4. **Include steps** to reproduce the problem

### Reporting Bugs
**Include**:
- Operating system and version
- Node.js version (`node --version`)
- Browser and version
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

---

## Success! 🎉

If you've followed this guide successfully, you should now have:
- ✅ Node.js and npm installed
- ✅ Project dependencies installed
- ✅ Development server running
- ✅ Application accessible at http://localhost:3000
- ✅ All features working correctly

**Next Steps**: Explore the curriculum, try the interactive features, and start learning Grade 6 mathematics!

For additional help, refer to the FEATURES.md file for detailed feature explanations.
