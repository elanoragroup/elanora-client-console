-- =============================================
-- COMPLETE DATABASE SETUP FOR ELANORA AUTH
-- =============================================
-- Run this script in your Supabase SQL Editor
-- Go to: https://supabase.com/dashboard/project/YOUR_PROJECT_ID/sql

-- Step 1: Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Step 2: Drop existing users table if it exists (to start fresh)
DROP TABLE IF EXISTS public.users CASCADE;

-- Step 3: Create Users table (extends Supabase auth.users)
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  company_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'client' CHECK (role IN ('client', 'admin', 'ca')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 4: Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Step 5: Create RLS policies
-- Users can view their own profile
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

-- Users can insert their own profile
CREATE POLICY "Users can insert own profile" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- Service role can manage all users (for admin operations)
CREATE POLICY "Service role can manage all users" ON public.users
  FOR ALL USING (auth.role() = 'service_role');

-- Step 6: Create function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert a new row into public.users with basic data only
  -- Profile completion will happen later via the app
  INSERT INTO public.users (id, email, role, created_at, updated_at)
  VALUES (
    NEW.id,
    NEW.email,
    'client', -- default role
    NOW(),
    NOW()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 7: Create the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Step 8: Grant necessary permissions
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON public.users TO postgres, anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO postgres, anon, authenticated, service_role;

-- Step 9: Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);

-- =============================================
-- SETUP COMPLETE!
-- =============================================
-- Your database is now properly configured:
-- ✅ Users table created with proper foreign key to auth.users
-- ✅ RLS policies configured for security
-- ✅ Database trigger automatically creates profiles
-- ✅ Proper permissions granted
-- =============================================

-- Test the setup by checking if everything is working:
SELECT 
  'Users table exists' as check_name,
  CASE WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'users' AND table_schema = 'public') 
       THEN '✅ PASS' 
       ELSE '❌ FAIL' 
  END as result
UNION ALL
SELECT 
  'Trigger exists' as check_name,
  CASE WHEN EXISTS (SELECT 1 FROM information_schema.triggers WHERE trigger_name = 'on_auth_user_created') 
       THEN '✅ PASS' 
       ELSE '❌ FAIL' 
  END as result
UNION ALL
SELECT 
  'RLS enabled' as check_name,
  CASE WHEN EXISTS (SELECT 1 FROM pg_class WHERE relname = 'users' AND relrowsecurity = true) 
       THEN '✅ PASS' 
       ELSE '❌ FAIL' 
  END as result;
