# 🔧 Environment Setup Instructions

## ⚠️ **URGENT: Fix the Supabase Connection Error**

The application is currently failing because the Supabase environment variables are missing. Here's how to fix it:

### **Step 1: Create Environment File**

Create a file named `.env.local` in your project root with the following content:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://nktdpsurdshvvmyoqznk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_yKyXF_GXd9zTD3P8b6sIFQ_baUZiOBL
SUPABASE_SERVICE_ROLE_KEY=sb_secret_dpUvDE3jNceLyus29DeQXg_S0cWYvSs
```

### **Step 2: Restart Development Server**

After creating the `.env.local` file:

1. **Stop the current server** (Ctrl+C in terminal)
2. **Restart the development server**:
   ```bash
   npm run dev
   ```

### **Step 3: Verify Connection**

The error should disappear and you should see:
- ✅ No more Supabase connection errors
- ✅ Application loads successfully
- ✅ All pages work without errors

## 🎯 **What This Fixes**

The current error:
```
@supabase/ssr: Your project's URL and API key are required to create a Supabase client!
```

This happens because:
1. **Missing Environment Variables** - The app can't find your Supabase credentials
2. **Supabase Client Initialization** - The authentication context can't connect to Supabase
3. **Page Loading Failures** - All pages that use Supabase fail to load

## 🚀 **After Setup**

Once you create the `.env.local` file and restart the server:

1. **Database Setup** - Run the SQL schema in your Supabase dashboard
2. **Storage Setup** - Create the `documents` bucket in Supabase Storage
3. **Test Authentication** - Try the login/signup pages
4. **Full Backend Integration** - All features will work with real data

## 📋 **Quick Copy-Paste**

Copy this exact content into a new file called `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://nktdpsurdshvvmyoqznk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_yKyXF_GXd9zTD3P8b6sIFQ_baUZiOBL
SUPABASE_SERVICE_ROLE_KEY=sb_secret_dpUvDE3jNceLyus29DeQXg_S0cWYvSs
```

**That's it!** The application will work immediately after this.
