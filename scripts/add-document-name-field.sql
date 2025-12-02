-- Add document_name field to documents table
-- This allows users to set custom names for their documents

ALTER TABLE public.documents 
ADD COLUMN document_name TEXT;

-- Update existing records to use original_filename as document_name
UPDATE public.documents 
SET document_name = original_filename 
WHERE document_name IS NULL;

-- Make document_name NOT NULL after updating existing records
ALTER TABLE public.documents 
ALTER COLUMN document_name SET NOT NULL;

-- Add index for better performance when searching by document name
CREATE INDEX idx_documents_document_name ON public.documents(document_name);

-- Add comment to document the field
COMMENT ON COLUMN public.documents.document_name IS 'Custom name given by user for the document';
