/**
 * SUPABASE SETUP INSTRUCTIONS
 * 
 * Step 1: Run this SQL in Supabase SQL Editor
 * Go to your Supabase Dashboard → SQL Editor → New Query, then paste and run:
 */

const SQL_SCHEMA = `
-- Create result_projects table
CREATE TABLE result_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Transitions', 'Organization')),
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  location TEXT,
  sort_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create result_media table
CREATE TABLE result_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES result_projects(id) ON DELETE CASCADE,
  kind TEXT NOT NULL CHECK (kind IN ('before_image', 'after_image', 'before_video', 'after_video')),
  order_index INTEGER NOT NULL DEFAULT 0,
  url TEXT NOT NULL,
  alt TEXT,
  caption TEXT,
  is_vertical BOOLEAN DEFAULT false,
  is_main BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create testimonials table
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('Loved One', 'Resident', 'Referral Partner', 'Client')),
  name TEXT,
  city TEXT,
  category TEXT CHECK (category IN ('Transitions', 'Organization', NULL)),
  featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_result_projects_published ON result_projects(is_published, sort_date DESC);
CREATE INDEX idx_result_media_project ON result_media(project_id, order_index);
CREATE INDEX idx_testimonials_published ON testimonials(is_published, order_index DESC);

-- Enable Row Level Security
ALTER TABLE result_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE result_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Public read access for published content
CREATE POLICY "Public can read published projects" ON result_projects
  FOR SELECT USING (is_published = true);

CREATE POLICY "Public can read project media" ON result_media
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM result_projects 
      WHERE id = result_media.project_id AND is_published = true
    )
  );

CREATE POLICY "Public can read published testimonials" ON testimonials
  FOR SELECT USING (is_published = true);

-- Admin write access (authenticated users can do everything)
CREATE POLICY "Authenticated users can manage projects" ON result_projects
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage media" ON result_media
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage testimonials" ON testimonials
  FOR ALL USING (auth.role() = 'authenticated');
`;

/**
 * Step 2: Create Storage Bucket
 * 
 * 1. Go to Storage in Supabase Dashboard
 * 2. Create a new bucket called 'results-media'
 * 3. Make it PUBLIC (so images show on the website)
 * 4. Under bucket policies, run this SQL:
 */

const STORAGE_POLICIES = `
-- Allow public read access
CREATE POLICY "Public can view results media" ON storage.objects
  FOR SELECT USING (bucket_id = 'results-media');

-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload results media" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'results-media' AND auth.role() = 'authenticated');

-- Allow authenticated users to delete
CREATE POLICY "Authenticated users can delete results media" ON storage.objects
  FOR DELETE USING (bucket_id = 'results-media' AND auth.role() = 'authenticated');
`;

/**
 * Step 3: Setup Authentication
 * 
 * 1. Go to Authentication → Providers in Supabase Dashboard
 * 2. Enable 'Email' provider
 * 3. Disable email confirmations: Settings → Auth → Email Auth → Disable "Confirm email"
 * 4. Add your mom as a user:
 *    - Go to Authentication → Users
 *    - Click "Invite user"
 *    - Enter her email
 *    - She'll get a magic link to set her password
 * 
 * Step 4: Insert Sample Data (Optional)
 */

const SAMPLE_DATA = `
-- Insert a sample project
INSERT INTO result_projects (title, category, slug, description, location)
VALUES ('Kitchen Reorganization', 'Organization', 'kitchen-reorg', 'Complete kitchen transformation with custom storage solutions', 'Dayton, OH');

-- Insert a sample testimonial
INSERT INTO testimonials (quote, role, name, city, featured, category)
VALUES ('Amy made our transition so smooth and stress-free. Highly recommend!', 'Loved One', 'Sarah M.', 'Springfield', true, 'Transitions');
`;

/**
 * DONE!
 * 
 * Your database is ready. The /admin page is live at: yourdomain.com/admin
 * 
 * To use this file: Copy the SQL from SQL_SCHEMA constant above and paste into Supabase SQL Editor
 */

export { SQL_SCHEMA, STORAGE_POLICIES, SAMPLE_DATA };