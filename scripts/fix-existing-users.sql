-- =============================================
-- FIX EXISTING USERS - CREATE MISSING PROFILES
-- =============================================
-- Run this script AFTER running complete-database-setup.sql
-- This will create public.users entries for existing auth.users

-- Step 1: Check which auth users don't have profiles
SELECT 
  au.id,
  au.email,
  au.created_at as auth_created,
  CASE WHEN pu.id IS NULL THEN 'Missing Profile' ELSE 'Profile Exists' END as status
FROM auth.users au
LEFT JOIN public.users pu ON au.id = pu.id
ORDER BY au.created_at DESC;

-- Step 2: Create profiles for users who are missing them
-- This will insert profiles for all auth.users who don't have public.users entries
INSERT INTO public.users (id, email, role, created_at, updated_at)
SELECT 
  au.id,
  au.email,
  'client' as role,
  au.created_at,
  NOW() as updated_at
FROM auth.users au
LEFT JOIN public.users pu ON au.id = pu.id
WHERE pu.id IS NULL;

-- Step 3: Verify the fix worked
SELECT 
  'Total auth users' as metric,
  COUNT(*) as count
FROM auth.users
UNION ALL
SELECT 
  'Total public profiles' as metric,
  COUNT(*) as count
FROM public.users
UNION ALL
SELECT 
  'Missing profiles' as metric,
  COUNT(*) as count
FROM auth.users au
LEFT JOIN public.users pu ON au.id = pu.id
WHERE pu.id IS NULL;

-- Step 4: Show all users with their profiles
SELECT 
  au.id,
  au.email,
  pu.full_name,
  pu.company_name,
  pu.role,
  au.created_at as auth_created,
  pu.created_at as profile_created
FROM auth.users au
LEFT JOIN public.users pu ON au.id = pu.id
ORDER BY au.created_at DESC;

-- =============================================
-- EXISTING USERS FIXED!
-- =============================================
-- All existing auth.users now have corresponding public.users profiles
-- New signups will automatically get profiles via the database trigger
-- =============================================
