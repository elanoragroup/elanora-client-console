-- Documents Storage Bucket Setup (Safe Version)
-- Run this in your Supabase SQL Editor after creating the bucket manually

-- First, manually create the 'documents' bucket in Supabase Dashboard:
-- 1. Go to Storage in your Supabase dashboard
-- 2. Click "New bucket"
-- 3. Name: "documents"
-- 4. Public: false (private bucket)
-- 5. Click "Create bucket"

-- Then run this SQL to set up the storage policies (safe version that handles existing policies):

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can upload their own documents" ON storage.objects;
DROP POLICY IF EXISTS "Users can view their own documents" ON storage.objects;
DROP POLICY IF EXISTS "Users can download their own documents" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own documents" ON storage.objects;

-- Policy for uploading documents (users can upload their own documents)
CREATE POLICY "Users can upload their own documents" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'documents' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Policy for viewing documents (users can view their own documents)
CREATE POLICY "Users can view their own documents" ON storage.objects
FOR SELECT USING (
  bucket_id = 'documents' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Policy for downloading documents (users can download their own documents)
CREATE POLICY "Users can download their own documents" ON storage.objects
FOR SELECT USING (
  bucket_id = 'documents' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Policy for deleting documents (users can delete their own documents)
CREATE POLICY "Users can delete their own documents" ON storage.objects
FOR DELETE USING (
  bucket_id = 'documents' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Verify the policies were created
SELECT policyname, cmd FROM pg_policies WHERE tablename = 'objects' AND policyname LIKE '%documents%';
