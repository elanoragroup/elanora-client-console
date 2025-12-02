# Installation Guide - Elanora Client Console

This guide will help you set up and run the Elanora Client Console on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18.x or higher)
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify installation: `node --version`
  
- **npm** (comes with Node.js) or **yarn**
  - Verify npm: `npm --version`
  - Or install yarn: `npm install -g yarn`

## Step-by-Step Installation

### 1. Navigate to Project Directory

Open your terminal/command prompt and navigate to the project folder:

```bash
cd "K:\elanora\client console"
```

### 2. Install Dependencies

Install all required packages using npm:

```bash
npm install
```

This will install:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React Icons
- Recharts
- date-fns
- And all other dependencies

The installation may take 2-5 minutes depending on your internet connection.

### 3. Verify Installation

After installation completes, verify that `node_modules` folder has been created:

```bash
dir node_modules
```

You should see hundreds of packages installed.

### 4. Start Development Server

Run the development server:

```bash
npm run dev
```

You should see output similar to:

```
- ready started server on 0.0.0.0:3000, url: http://localhost:3000
- event compiled client and server successfully in 2.5s
```

### 5. Open in Browser

Open your web browser and navigate to:

```
http://localhost:3000
```

The application will automatically redirect you to the Dashboard page.

## Development Commands

### Start Development Server
```bash
npm run dev
```
Starts the app in development mode with hot-reloading at http://localhost:3000

### Build for Production
```bash
npm run build
```
Creates an optimized production build in the `.next` folder

### Start Production Server
```bash
npm run build
npm start
```
Runs the production build

### Lint Code
```bash
npm run lint
```
Checks for code quality issues

## Troubleshooting

### Port 3000 Already in Use

If port 3000 is already in use, you can specify a different port:

```bash
npm run dev -- -p 3001
```

### Installation Errors

If you encounter installation errors:

1. Delete `node_modules` folder and `package-lock.json`:
   ```bash
   rmdir /s node_modules
   del package-lock.json
   ```

2. Clear npm cache:
   ```bash
   npm cache clean --force
   ```

3. Reinstall:
   ```bash
   npm install
   ```

### Module Not Found Errors

If you see "Module not found" errors:

1. Ensure all dependencies are installed:
   ```bash
   npm install
   ```

2. Restart the development server:
   ```bash
   # Press Ctrl+C to stop
   npm run dev
   ```

### TypeScript Errors

If you see TypeScript errors:

1. Delete `.next` folder:
   ```bash
   rmdir /s .next
   ```

2. Restart the server:
   ```bash
   npm run dev
   ```

## Project Structure

After installation, your project structure should look like:

```
elanora/client console/
├── node_modules/          (created after npm install)
├── .next/                 (created after running dev server)
├── app/                   (application pages)
├── components/            (reusable components)
├── public/                (static assets - create if needed)
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── README.md
```

## Accessing Different Pages

Once the server is running, you can access:

- **Dashboard:** http://localhost:3000/dashboard
- **Compliance Tracker:** http://localhost:3000/compliance
- **Profile:** http://localhost:3000/profile
- **Services:** http://localhost:3000/services
- **Projects:** http://localhost:3000/projects
- **Documents:** http://localhost:3000/documents
- **Invoices:** http://localhost:3000/invoices
- **Communication:** http://localhost:3000/communication
- **Reports:** http://localhost:3000/reports
- **Settings:** http://localhost:3000/settings
- **Feedback:** http://localhost:3000/feedback

## Features to Test

### Desktop Features
1. **Sidebar Navigation** - Click through all menu items
2. **Search Bar** - In the top navbar
3. **Notifications** - Click the bell icon
4. **User Menu** - Click on user avatar
5. **Cards and Tables** - Interactive elements throughout
6. **Modals** - Click "Upload" or "Request Service" buttons
7. **Charts** - View analytics on Reports page
8. **Filters** - Try filtering on Compliance and Invoices pages

### Mobile Features (Resize browser or use DevTools)
1. **Hamburger Menu** - Opens sidebar on mobile
2. **Responsive Layout** - All pages adapt to mobile
3. **Touch-Friendly** - Larger tap targets on mobile
4. **Scrollable Tables** - Horizontal scroll for wide tables

## Next Steps

After successful installation:

1. **Explore the Dashboard** - Overview of all features
2. **Check Compliance Tracker** - The hero feature of the portal
3. **Review Profile Page** - See client information layout
4. **Test Responsiveness** - Resize browser to test mobile view
5. **Examine Code Structure** - Understand the component architecture

## Support

For any installation issues:
- Check the console for error messages
- Ensure Node.js version is 18+
- Verify all files are properly copied
- Check that the working directory is correct

---

**Installation complete! Enjoy using Elanora Client Console** ✨

