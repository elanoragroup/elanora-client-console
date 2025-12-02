-- Test Documents API Setup
-- Run this in your Supabase SQL Editor to verify everything is set up correctly

-- 1. Check if documents table exists and has correct structure
SELECT 
  column_name, 
  data_type, 
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'documents' 
  AND table_schema = 'public'
ORDER BY ordinal_position;

-- 2. Check if RLS is enabled
SELECT 
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables 
WHERE tablename = 'documents' AND schemaname = 'public';

-- 3. Check RLS policies
SELECT 
  policyname,
  cmd,
  permissive,
  roles,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'documents';

-- 4. Check if documents storage bucket exists
SELECT 
  id,
  name,
  public,
  created_at
FROM storage.buckets 
WHERE name = 'documents';

-- 5. Check storage policies for documents bucket
SELECT 
  policyname,
  cmd,
  permissive,
  roles,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'objects' 
  AND policyname LIKE '%documents%';

-- 6. Test insert a sample document (replace with your actual user ID)
-- INSERT INTO public.documents (
--   user_id,
--   filename,
--   original_filename,
--   file_size,
--   mime_type,
--   document_type,
--   uploaded_by
-- ) VALUES (
--   '2bcfd030-6a8d-426b-a12f-d95a87ea120d', -- Replace with your user ID
--   'test-file.pdf',
--   'test-file.pdf',
--   1024,
--   'application/pdf',
--   'other',
--   '2bcfd030-6a8d-426b-a12f-d95a87ea120d' -- Replace with your user ID
-- );

-- 7. Check if the test document was inserted
-- SELECT * FROM public.documents WHERE filename = 'test-file.pdf';

-- 8. Clean up test data (uncomment if you ran the test insert)
-- DELETE FROM public.documents WHERE filename = 'test-file.pdf';
