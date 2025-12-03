-- =====================================================
-- ELANORA BLOG DATABASE SETUP
-- Run this in Supabase SQL Editor
-- =====================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- TABLE: blog_posts
-- =====================================================
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image TEXT NOT NULL,
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  author_id UUID REFERENCES auth.users(id),
  author_name TEXT NOT NULL,
  author_avatar TEXT,
  author_role TEXT DEFAULT 'Author',
  read_time TEXT NOT NULL,
  featured BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  published_at TIMESTAMPTZ
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts(created_at DESC);

-- =====================================================
-- TABLE: blog_categories
-- =====================================================
CREATE TABLE IF NOT EXISTS blog_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default categories
INSERT INTO blog_categories (name, slug, description) VALUES
  ('Accounting', 'accounting', 'Accounting tips and insights'),
  ('Tax', 'tax', 'Tax planning and strategies'),
  ('Legal', 'legal', 'Legal compliance and advice'),
  ('HR', 'hr', 'Human resources management'),
  ('Technology', 'technology', 'Tech solutions for business'),
  ('Business', 'business', 'General business strategies')
ON CONFLICT (slug) DO NOTHING;

-- =====================================================
-- TABLE: blog_images
-- =====================================================
CREATE TABLE IF NOT EXISTS blog_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  filename TEXT NOT NULL,
  url TEXT NOT NULL,
  size INTEGER,
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_images ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public can read published posts" ON blog_posts;
DROP POLICY IF EXISTS "Admin can manage posts" ON blog_posts;
DROP POLICY IF EXISTS "Public can read categories" ON blog_categories;
DROP POLICY IF EXISTS "Admin can manage images" ON blog_images;

-- blog_posts policies
CREATE POLICY "Public can read published posts"
  ON blog_posts FOR SELECT
  TO public
  USING (published = true);

CREATE POLICY "Admin can manage posts"
  ON blog_posts FOR ALL
  TO authenticated
  USING (
    auth.jwt() ->> 'email' = 'admin@elanoragroup.in'
  );

-- blog_categories policies
CREATE POLICY "Public can read categories"
  ON blog_categories FOR SELECT
  TO public
  USING (true);

-- blog_images policies
CREATE POLICY "Admin can manage images"
  ON blog_images FOR ALL
  TO authenticated
  USING (
    auth.jwt() ->> 'email' = 'admin@elanoragroup.in'
  );

-- =====================================================
-- STORAGE BUCKET SETUP
-- =====================================================

-- Create bucket for blog images (run this in Supabase Dashboard > Storage)
-- Or use this SQL:
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
DROP POLICY IF EXISTS "Public can read blog images" ON storage.objects;
DROP POLICY IF EXISTS "Admin can upload blog images" ON storage.objects;
DROP POLICY IF EXISTS "Admin can delete blog images" ON storage.objects;

CREATE POLICY "Public can read blog images"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'blog-images');

CREATE POLICY "Admin can upload blog images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'blog-images' AND
    auth.jwt() ->> 'email' = 'admin@elanoragroup.in'
  );

CREATE POLICY "Admin can delete blog images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'blog-images' AND
    auth.jwt() ->> 'email' = 'admin@elanoragroup.in'
  );

-- =====================================================
-- FUNCTIONS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to auto-update updated_at
DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON blog_posts;
CREATE TRIGGER update_blog_posts_updated_at
    BEFORE UPDATE ON blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- SAMPLE DATA (Optional - for testing)
-- =====================================================

-- You can uncomment this to insert sample data
/*
INSERT INTO blog_posts (
  slug, title, excerpt, content, cover_image, category, tags,
  author_name, author_avatar, author_role, read_time, featured, published
) VALUES (
  'getting-started-with-accounting',
  'Getting Started with Modern Accounting',
  'Learn the fundamentals of modern accounting practices for your business.',
  '<h2>Introduction</h2><p>Modern accounting has evolved...</p>',
  'https://images.unsplash.com/photo-1554224155-9d4d54619dca?w=800&h=500&fit=crop',
  'Accounting',
  ARRAY['Accounting', 'Business', 'Finance'],
  'Admin User',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
  'Chief Accountant',
  '5 min read',
  true,
  true
);
*/

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================

-- Check if tables were created
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('blog_posts', 'blog_categories', 'blog_images');

-- Check categories
SELECT * FROM blog_categories;

-- Check RLS is enabled
SELECT tablename, rowsecurity FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('blog_posts', 'blog_categories', 'blog_images');

-- =====================================================
-- NOTES
-- =====================================================
-- 1. Make sure to create an admin user in Supabase Auth with email: admin@elanoragroup.in
-- 2. The storage bucket 'blog-images' needs to be created in Supabase Dashboard > Storage
-- 3. Update the admin email in policies if you want to use a different email
-- 4. Test the RLS policies by trying to query as different users
