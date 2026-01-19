# Time Tracker - Frontend

A modern, responsive time tracking application built with Next.js, React, and TailwindCSS.

## 🚀 Live Deployment

**Frontend URL:** [https://time-tracker-frontend-five.vercel.app/](https://time-tracker-frontend-five.vercel.app/)

## 📋 Overview

This is the frontend interface for the Time Tracker application, providing an intuitive user experience for tracking time, managing tasks, and viewing productivity metrics.

## 🛠️ Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **UI Library:** React 18
- **Styling:** TailwindCSS 3
- **CSS Processing:** PostCSS & Autoprefixer
- **Deployment:** Vercel

## 📁 Project Structure

```
frontend/
├── app/
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout component
│   └── page.tsx            # Home page
├── components/
│   └── ui/
│       ├── button.tsx      # Button component
│       └── card.tsx        # Card component
├── .next/                  # Next.js build output (not in git)
├── .env.local              # Environment variables (not in git)
├── .env.example            # Example environment variables
├── next.config.js          # Next.js configuration
├── tailwind.config.ts      # TailwindCSS configuration
├── postcss.config.js       # PostCSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Project dependencies
```

## 🔧 Environment Variables

Create a `.env.local` file in the frontend directory with the following variables:

```env
# API Configuration
NEXT_PUBLIC_API_URL=https://time-tracker-backend-xi.vercel.app
```

See `.env.example` for more details.

## 📦 Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file based on `.env.example` and configure your environment variables.

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```
This will start the development server at `http://localhost:3000`

### Production Build
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## ✨ Features

- **Time Tracking:** Log and manage time entries for various tasks
- **Responsive Design:** Optimized for desktop and mobile devices
- **Modern UI:** Clean, intuitive interface built with TailwindCSS
- **TypeScript:** Type-safe development experience
- **Server-Side Rendering:** Fast initial page loads with Next.js SSR

## 🎨 UI Components

### Custom Components
- **Button:** Reusable button component with variants
- **Card:** Card component for content organization

### Styling
- TailwindCSS for utility-first styling
- Global styles for consistent theming
- Responsive design patterns

## 🌐 Deployment

This frontend is deployed on Vercel. The live application is available at:
**https://time-tracker-frontend-five.vercel.app/**

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🔗 API Integration

The frontend connects to the backend API at:
**https://time-tracker-backend-xi.vercel.app/**

Configure the API URL in your `.env.local` file using the `NEXT_PUBLIC_API_URL` environment variable.

## 🛠️ Development

This project uses:
- **Next.js App Router** for routing and page management
- **TypeScript** for type safety
- **TailwindCSS** for styling
- **React Server Components** for optimal performance

## 📄 License

This project is part of the EOD Maker time tracking application.

## 🤝 Related Projects

- **Backend API:** [https://time-tracker-backend-xi.vercel.app/](https://time-tracker-backend-xi.vercel.app/)
