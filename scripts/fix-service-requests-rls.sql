-- =============================================
-- FIX SERVICE REQUESTS RLS POLICIES
-- =============================================
-- Run this in your Supabase SQL Editor to fix the RLS policy issue
-- Project: https://supabase.com/dashboard/project/xbnqbzqiehjwevkavwbf/sql

-- Step 1: Check current policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'service_requests' 
ORDER BY policyname;

-- Step 2: Drop existing policies if they exist (to recreate them properly)
DROP POLICY IF EXISTS "Users can view own service requests" ON public.service_requests;
DROP POLICY IF EXISTS "Users can insert own service requests" ON public.service_requests;
DROP POLICY IF EXISTS "Users can update own service requests" ON public.service_requests;
DROP POLICY IF EXISTS "Users can delete own service requests" ON public.service_requests;

-- Step 3: Ensure RLS is enabled
ALTER TABLE public.service_requests ENABLE ROW LEVEL SECURITY;

-- Step 4: Recreate the policies with proper syntax
CREATE POLICY "Users can view own service requests" ON public.service_requests
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own service requests" ON public.service_requests
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own service requests" ON public.service_requests
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own service requests" ON public.service_requests
  FOR DELETE USING (auth.uid() = user_id);

-- Step 5: Add service role policy for admin operations
CREATE POLICY "Service role can manage all service requests" ON public.service_requests
  FOR ALL USING (auth.role() = 'service_role');

-- Step 6: Verify the policies are created correctly
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'service_requests' 
ORDER BY policyname;

-- Step 7: Test the policy by checking if a user can insert (this should work if user is authenticated)
-- Note: This is just to verify the policy exists, actual testing happens in the app
SELECT 
  'Policy Check Complete' as status,
  'Service requests policies have been recreated' as message
UNION ALL
SELECT 
  'Policies Count' as status,
  COUNT(*)::text || ' policies created' as message
FROM pg_policies 
WHERE tablename = 'service_requests';
