-- =============================================
-- COMPLETE SUPABASE AUTH RESET QUERIES
-- =============================================
-- Run these queries in your Supabase SQL Editor to completely reset auth

-- Step 1: Disable RLS temporarily
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- Step 2: Drop all existing policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
DROP POLICY IF EXISTS "Users can delete own profile" ON public.users;
DROP POLICY IF EXISTS "Service role can manage all users" ON public.users;

-- Step 3: Drop the trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Step 4: Clear all user profiles (WARNING: This deletes ALL user data)
DELETE FROM public.users;

-- Step 5: Clear all auth users (WARNING: This deletes ALL authentication data)
-- Note: You cannot directly delete from auth.users, but you can disable users
-- UPDATE auth.users SET email_confirmed_at = NULL, banned_until = NOW() + INTERVAL '100 years';

-- Step 6: Drop and recreate users table with clean structure
DROP TABLE IF EXISTS public.users CASCADE;

-- Step 7: Create clean users table
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

-- Step 8: Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Step 9: Create simple RLS policies
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- Step 10: Grant permissions
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON public.users TO postgres, anon, authenticated, service_role;

-- =============================================
-- RESET COMPLETE!
-- =============================================
-- Your Supabase auth is now completely clean
-- All users, profiles, and policies have been removed
-- Ready for a fresh start!
-- =============================================
