# BankIt - Read-Only Banking Web Application

A production-ready, secure read-only banking application built with React, TypeScript, and Tailwind CSS.

## Features

- Secure JWT cookie-based authentication
- Customer dashboard with account summaries
- View all accounts (Savings & Fixed Deposits)
- Detailed account information
- Customer profile management
- Responsive mobile-first design
- Professional banking UI

## Tech Stack

- React 18 with TypeScript
- Tailwind CSS for styling
- Axios for API communication
- React Router for navigation
- Lucide React for icons

## Architecture

```
src/
├── api/
│   └── apiClient.ts          # Centralized API client with cookie support
├── services/
│   ├── authService.ts        # Authentication service
│   ├── customerService.ts    # Customer data service
│   └── accountService.ts     # Account data service
├── context/
│   └── AuthContext.tsx       # Authentication state management
├── pages/
│   ├── Login.tsx             # Login page
│   ├── Dashboard.tsx         # Main dashboard
│   ├── Accounts.tsx          # Accounts list page
│   ├── AccountDetail.tsx     # Account detail page
│   └── Profile.tsx           # Customer profile page
├── components/
│   ├── Navbar.tsx            # Navigation bar
│   ├── AccountCard.tsx       # Account card component
│   └── ProtectedRoute.tsx    # Route protection wrapper
└── types/
    └── index.ts              # TypeScript type definitions
```

## Setup

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Configure your API base URL in `.env`:
```
VITE_API_BASE_URL=http://your-backend-url/api
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
```

## Backend API Endpoints

The application expects the following API endpoints:

- `POST /login` - User authentication (sets JWT cookie)
- `GET /customers/{customerId}` - Get customer profile
- `GET /customers/{customerId}/accounts` - Get customer accounts
- `GET /customers/{customerId}/summary` - Get dashboard summary
- `GET /accounts/{accountNo}` - Get account details

## Security

- JWT stored as HttpOnly, Secure cookie
- No JWT handling in JavaScript
- All requests use `withCredentials: true`
- Automatic 401 redirect to login
- Protected routes with authentication check

## Pages

- **Login** - Secure authentication with professional design
- **Dashboard** - Overview with balance summaries and recent accounts
- **Accounts** - Filterable list of all accounts (Savings/Fixed Deposits)
- **Account Detail** - Complete account information
- **Profile** - Customer personal information

## Mobile Support

The application is fully responsive and mobile-first, ready for PWA conversion using Capacitor.
