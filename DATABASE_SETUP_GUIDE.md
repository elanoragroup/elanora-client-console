# 🗄️ **Database Setup Guide - Run in Supabase**

## 🎯 **Quick Setup (5 minutes)**

### **Step 1: Open Supabase SQL Editor**
1. Go to: https://supabase.com/dashboard/project/nktdpsurdshvvmyoqznk/sql
2. Click on "New Query" or the SQL Editor tab

### **Step 2: Copy and Paste the Setup Script**
1. Open the file: `scripts/setup-database.sql` in your project
2. Copy the **entire contents** of the file
3. Paste it into the Supabase SQL Editor

### **Step 3: Execute the Script**
1. Click the **"Run"** button in the SQL Editor
2. Wait for all queries to complete (should take 10-30 seconds)
3. You should see "Success" messages for each step

### **Step 4: Verify Setup**
1. Go to **Table Editor** in your Supabase dashboard
2. You should see these tables created:
   - ✅ `users`
   - ✅ `service_categories`
   - ✅ `services`
   - ✅ `service_requests`
   - ✅ `documents`
   - ✅ `compliance_items`
   - ✅ `projects`
   - ✅ `invoices`
   - ✅ `reports`
   - ✅ `messages`
   - ✅ `feedback`

## 🔧 **What the Script Does**

### **Creates 10 Database Tables:**
1. **Users** - User profiles and authentication
2. **Service Categories** - Service type classifications
3. **Services** - Active services with progress tracking
4. **Service Requests** - Client service requests
5. **Documents** - File storage and metadata
6. **Compliance Items** - Compliance tracking with due dates
7. **Projects** - Project management
8. **Invoices** - Billing and payments
9. **Reports** - Generated reports
10. **Messages** - Communication system
11. **Feedback** - Client feedback and ratings

### **Sets Up Security:**
- ✅ **Row Level Security (RLS)** - Users can only see their own data
- ✅ **Access Policies** - Secure data access rules
- ✅ **Indexes** - Fast database queries
- ✅ **Foreign Keys** - Data integrity

### **Adds Default Data:**
- ✅ **Service Categories** - Income Tax, GST, Accounting, MCA/ROC, Other Services

## 🚀 **After Database Setup**

### **Step 5: Set Up Storage**
1. Go to **Storage** in your Supabase dashboard
2. Click **"New Bucket"**
3. Name: `documents`
4. Set to **Public** (if you want public file access)
5. Click **"Create Bucket"**

### **Step 6: Test Your Application**
1. Restart your development server: `npm run dev`
2. Navigate to `/login` to test authentication
3. Try creating a service request
4. Check your Supabase dashboard to see the data

## 📊 **Database Schema Overview**

```
Users (1) ──→ (Many) Services
Users (1) ──→ (Many) Service Requests  
Users (1) ──→ (Many) Documents
Users (1) ──→ (Many) Compliance Items
Users (1) ──→ (Many) Projects
Users (1) ──→ (Many) Invoices
Users (1) ──→ (Many) Messages
Users (1) ──→ (Many) Feedback

Services (1) ──→ (Many) Documents
Services (1) ──→ (Many) Compliance Items
Services (1) ──→ (Many) Invoices

Projects (1) ──→ (Many) Invoices
```

## 🎉 **You're All Set!**

After running the database setup script, your Elanora client console will have:

- ✅ **Complete database schema**
- ✅ **Secure data access**
- ✅ **User authentication**
- ✅ **Service management**
- ✅ **File storage**
- ✅ **Communication system**
- ✅ **Compliance tracking**
- ✅ **Project management**
- ✅ **Billing system**

**Your backend is now fully functional!** 🚀
