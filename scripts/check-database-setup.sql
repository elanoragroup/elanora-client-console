-- =============================================
-- CHECK DATABASE SETUP AND USER EXISTENCE
-- =============================================
-- Run this in your Supabase SQL Editor to check if everything is set up correctly

-- Step 1: Check if the users table exists and has data
SELECT 
  'Users Table Check' as check_type,
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'users' AND table_schema = 'public') 
    THEN '✅ Users table exists'
    ELSE '❌ Users table does not exist'
  END as result
UNION ALL
SELECT 
  'Users Count' as check_type,
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'users' AND table_schema = 'public')
    THEN 'Found ' || COUNT(*)::text || ' users'
    ELSE 'Table does not exist'
  END as result
FROM public.users
UNION ALL
SELECT 
  'Service Requests Table' as check_type,
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'service_requests' AND table_schema = 'public') 
    THEN '✅ Service requests table exists'
    ELSE '❌ Service requests table does not exist'
  END as result
UNION ALL
SELECT 
  'RLS Enabled on Users' as check_type,
  CASE 
    WHEN EXISTS (SELECT 1 FROM pg_class WHERE relname = 'users' AND relrowsecurity = true) 
    THEN '✅ RLS enabled on users table'
    ELSE '❌ RLS not enabled on users table'
  END as result
UNION ALL
SELECT 
  'RLS Enabled on Service Requests' as check_type,
  CASE 
    WHEN EXISTS (SELECT 1 FROM pg_class WHERE relname = 'service_requests' AND relrowsecurity = true) 
    THEN '✅ RLS enabled on service_requests table'
    ELSE '❌ RLS not enabled on service_requests table'
  END as result;

-- Step 2: Check RLS policies
SELECT 
  'RLS Policies Check' as check_type,
  'Found ' || COUNT(*)::text || ' policies on service_requests table' as result
FROM pg_policies 
WHERE tablename = 'service_requests';

-- Step 3: List all policies on service_requests table
SELECT 
  policyname,
  cmd as operation,
  CASE WHEN permissive = true THEN 'Permissive' ELSE 'Restrictive' END as policy_type,
  qual as condition
FROM pg_policies 
WHERE tablename = 'service_requests'
ORDER BY policyname;

-- Step 4: Check if there are any users in auth.users
SELECT 
  'Auth Users Count' as check_type,
  'Found ' || COUNT(*)::text || ' users in auth.users' as result
FROM auth.users;

-- Step 5: Check if there are any users in public.users
SELECT 
  'Public Users Count' as check_type,
  'Found ' || COUNT(*)::text || ' users in public.users' as result
FROM public.users;
