-- Documents Table Diagnostic Script
-- Run this in your Supabase SQL Editor to check the documents table

-- 1. Check if documents table exists
SELECT 
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'documents' AND table_schema = 'public') 
    THEN 'Documents table exists'
    ELSE 'Documents table does NOT exist - this is the problem!'
  END as table_status;

-- 2. Check table structure
SELECT 
  column_name, 
  data_type, 
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'documents' 
  AND table_schema = 'public'
ORDER BY ordinal_position;

-- 3. Check if RLS is enabled
SELECT 
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables 
WHERE tablename = 'documents' AND schemaname = 'public';

-- 4. Check RLS policies
SELECT 
  policyname,
  cmd,
  permissive,
  roles,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'documents';

-- 5. Test insert (replace with your actual user ID)
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
--   'test-file.txt',
--   'test-file.txt',
--   100,
--   'text/plain',
--   'other',
--   '2bcfd030-6a8d-426b-a12f-d95a87ea120d' -- Replace with your user ID
-- );

-- 6. Check if test insert worked
-- SELECT * FROM public.documents WHERE filename = 'test-file.txt';

-- 7. Clean up test data
-- DELETE FROM public.documents WHERE filename = 'test-file.txt';
