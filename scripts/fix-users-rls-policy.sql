-- Fix RLS policy for users table to allow INSERT during signup
-- This script adds the missing INSERT policy for the users table

-- Add INSERT policy for users table
-- Users can insert their own profile (when id matches auth.uid())
CREATE POLICY "Users can insert own profile" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Optional: Add DELETE policy if needed (users can delete their own profile)
-- CREATE POLICY "Users can delete own profile" ON public.users
--   FOR DELETE USING (auth.uid() = id);

-- Verify the policies are created
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'users' 
ORDER BY policyname;


