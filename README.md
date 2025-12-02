# Elanora Client Console

A premium, production-grade client portal for Elanora Chartered Accountancy and business advisory firm. Built with modern web technologies and thoughtful design principles.

## Features

### 🎯 Core Functionality
- **Dashboard** - Comprehensive overview with KPIs, upcoming deadlines, and quick actions
- **Compliance Tracker** - Hero feature for managing statutory compliance deadlines
- **Profile Management** - Client information and assigned CA details
- **Services** - Track active and completed services
- **Projects** - Monitor project progress with timelines and milestones
- **Documents** - Organized document management with categories
- **Invoices & Payments** - Complete billing and payment history
- **Communication** - Real-time messaging with assigned CAs
- **Reports & Analytics** - Visual insights with charts and graphs
- **Settings** - Account preferences, security, and activity logs
- **Feedback** - Submit testimonials and service feedback

### 🎨 Design System
- **Primary Color:** #0E2F5A (Elanora Navy Blue)
- **Accent Color:** #F5B400 (Soft Gold)
- **Typography:** Inter & Poppins font families
- **Components:** Modern, rounded corners with subtle shadows
- **Animations:** Smooth Framer Motion transitions
- **Icons:** Lucide React (professional stroke icons)

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Charts:** Recharts
- **State Management:** React Hooks
- **Date Handling:** date-fns

## Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

The application will automatically redirect to the dashboard.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
elanora-client-console/
├── app/                      # Next.js app directory
│   ├── dashboard/           # Dashboard page
│   ├── compliance/          # Compliance tracker (hero feature)
│   ├── profile/             # Client profile
│   ├── services/            # Services management
│   ├── projects/            # Projects & engagements
│   ├── documents/           # Document management
│   ├── invoices/            # Invoices & payments
│   ├── communication/       # Messaging interface
│   ├── reports/             # Reports & analytics
│   ├── settings/            # Account settings
│   ├── feedback/            # Feedback & testimonials
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home (redirects to dashboard)
│   └── globals.css          # Global styles
├── components/
│   ├── layout/              # Layout components
│   │   ├── AppLayout.tsx
│   │   ├── Sidebar.tsx
│   │   └── Navbar.tsx
│   └── ui/                  # Reusable UI components
│       ├── Card.tsx
│       ├── Button.tsx
│       ├── Badge.tsx
│       ├── Table.tsx
│       ├── Modal.tsx
│       ├── StatCard.tsx
│       └── ProgressBar.tsx
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies

```

## Design Philosophy

### Authentic & Professional
- No template or generic dashboard patterns
- Purposeful hierarchy and spacing
- Thoughtfully crafted components
- Premium B2B SaaS aesthetic (inspired by Stripe, Linear)

### User Experience
- Data readability over aesthetics
- Consistent 8px grid system
- Subtle but smooth interactions
- Fast loading and performance
- Fully responsive (desktop, tablet, mobile)

### Compliance-Centric
The Compliance Tracker is the heart of the portal:
- Color-coded status indicators
- Countdown timers for deadlines
- Quick action buttons
- Comprehensive history
- Analytics widgets

## Future Integration Points

The application includes placeholder integration points for:
- **Firebase** - Authentication and real-time database
- **Razorpay** - Payment processing
- **File Upload** - Document management
- **Email/SMS** - Notifications
- **WebSocket** - Real-time messaging

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Proprietary - Elanora Chartered Accountancy

## Contact

For support or inquiries, contact your assigned CA through the Communication Center.

---

**Built with ❤️ for Elanora clients**

