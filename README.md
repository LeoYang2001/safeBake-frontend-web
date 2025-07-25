# SafeBake Frontend Web Application

A modern Single Page Application (SPA) built with React, TypeScript, and Tailwind CSS for SafeBake - innovative baking solutions company.

## 🚀 Features

- **Modern SPA Architecture**: Built with React Router for seamless navigation
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **TypeScript**: Full type safety and better developer experience
- **Component Architecture**: Reusable UI components and layouts
- **Performance Optimized**: Built with Vite for fast development and builds

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Navigation header
│   ├── Footer.tsx      # Site footer
│   └── UI.tsx          # Common UI components
├── pages/              # Page components
│   ├── HomePage.tsx    # Landing page
│   ├── AboutPage.tsx   # About us page
│   ├── ProductsPage.tsx # Products catalog
│   ├── ContactPage.tsx # Contact form
│   └── NotFoundPage.tsx # 404 error page
├── apis/               # API service layer
├── config/             # App configuration
├── hooks/              # Custom React hooks
├── store/              # State management (future)
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── assets/             # Static assets
├── MainLayout.tsx      # Main layout wrapper
├── App.tsx             # Root app component
└── main.tsx           # App entry point
```

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy environment variables:

   ```bash
   cp .env.example .env
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 🎨 Design System

The application uses a consistent design system with:

- **Colors**: Blue primary theme with supporting grays
- **Typography**: System fonts with carefully chosen sizes
- **Components**: Reusable Button, Alert, and LoadingSpinner components
- **Layout**: Responsive grid system using Tailwind CSS

## 🧭 Navigation

The SPA includes the following routes:

- `/` - Home page with hero section and features
- `/about` - About page with company story and team
- `/products` - Products catalog with filtering
- `/contact` - Contact form with company information
- `*` - 404 page for unmatched routes

## 🔧 Configuration

Environment variables can be configured in `.env`:

- `VITE_API_BASE_URL` - Backend API base URL
- `VITE_APP_TITLE` - Application title

## 🏗️ Architecture

- **Layout**: `MainLayout` component wraps all pages with header/footer
- **Routing**: React Router with nested routes for consistent layout
- **State**: React hooks for local state, expandable to Redux/Zustand
- **Styling**: Tailwind CSS with utility-first approach
- **API**: Centralized API service layer for backend communication

## 🚀 Deployment

Build the application for production:

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary and confidential.
{
files: ['**/*.{ts,tsx}'],
extends: [
// Other configs...
// Enable lint rules for React
reactX.configs['recommended-typescript'],
// Enable lint rules for React DOM
reactDom.configs.recommended,
],
languageOptions: {
parserOptions: {
project: ['./tsconfig.node.json', './tsconfig.app.json'],
tsconfigRootDir: import.meta.dirname,
},
// other options...
},
},
])

```

```
