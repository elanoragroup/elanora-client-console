-- Fix Service Requests RLS Policies
-- Run this in your Supabase SQL Editor if service requests are failing

-- First, let's check if the policies exist
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'service_requests' 
ORDER BY policyname;

-- Drop existing policies if they exist (to recreate them properly)
DROP POLICY IF EXISTS "Users can view own service requests" ON public.service_requests;
DROP POLICY IF EXISTS "Users can insert own service requests" ON public.service_requests;
DROP POLICY IF EXISTS "Users can update own service requests" ON public.service_requests;

-- Recreate the policies with proper syntax
CREATE POLICY "Users can view own service requests" ON public.service_requests
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own service requests" ON public.service_requests
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own service requests" ON public.service_requests
  FOR UPDATE USING (auth.uid() = user_id);

-- Also ensure the table has RLS enabled
ALTER TABLE public.service_requests ENABLE ROW LEVEL SECURITY;

-- Verify the policies are created correctly
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'service_requests' 
ORDER BY policyname;
