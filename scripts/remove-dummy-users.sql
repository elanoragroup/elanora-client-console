-- =============================================
-- REMOVE DUMMY USERS FROM DATABASE
-- =============================================
-- Run this script in your Supabase SQL Editor to remove any dummy users
-- Go to: https://supabase.com/dashboard/project/nktdpsurdshvvmyoqznk/sql

-- Remove any users with dummy/test data
DELETE FROM public.users 
WHERE email LIKE '%acme%' 
   OR email LIKE '%test%' 
   OR email LIKE '%dummy%'
   OR company_name LIKE '%Acme%'
   OR company_name LIKE '%Test%'
   OR company_name LIKE '%Dummy%';

-- Remove any auth users with dummy emails
DELETE FROM auth.users 
WHERE email LIKE '%acme%' 
   OR email LIKE '%test%' 
   OR email LIKE '%dummy%';

-- =============================================
-- CLEANUP COMPLETE!
-- =============================================
-- This script removes any dummy users from both the auth.users table
-- and the public.users table to ensure a clean database.
-- =============================================

