-- ==============================================================================
-- Mahbub College Website: Supabase Schema & Storage Configuration
-- Exact table names and storage folders mapped to Figma section titles:
-- 1. "Former Students Who Made Us Proud"  -> table: former_students,  storage: former-students/
-- 2. "Our Heritage, Our Pride"            -> table: heritage,         storage: heritage/
-- 3. "The People Who Built Our Legacy"    -> table: legacy_builders,  storage: legacy-builders/
-- 4. "The Leaders Who Shaped Our Inst..." -> table: leaders,          storage: leaders/
-- 5. "News and Updates"                   -> table: news_and_updates, storage: news-and-updates/
-- 6. "Gallery"                            -> table: gallery,          storage: gallery/
-- 7. Alumni Registration Form             -> table: registrations
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 1. "Former Students Who Made Us Proud"
-- Storage bucket folder: media/former-students/
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.former_students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    designation VARCHAR(255) NOT NULL,
    batch_or_era VARCHAR(100),
    description TEXT,
    photo_url TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ------------------------------------------------------------------------------
-- 2. "Our Heritage, Our Pride" (Archival milestones & historical photos)
-- Storage bucket folder: media/heritage/
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.heritage (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(300) NOT NULL,
    year_or_era VARCHAR(100),
    caption TEXT,
    photo_url TEXT NOT NULL,
    category VARCHAR(100) DEFAULT 'Heritage',
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ------------------------------------------------------------------------------
-- 3. "The People Who Built Our Legacy" (Founders, Philanthropists & Royal Patrons)
-- Storage bucket folder: media/legacy-builders/
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.legacy_builders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    title_role VARCHAR(255) NOT NULL,
    period VARCHAR(100),
    description TEXT,
    photo_url TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ------------------------------------------------------------------------------
-- 4. "The Leaders Who Shaped Our Institution" (Committee, Principals & Leaders)
-- Storage bucket folder: media/leaders/
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.leaders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    role VARCHAR(200) NOT NULL,
    tenure_or_year VARCHAR(100),
    photo_url TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ------------------------------------------------------------------------------
-- 5. "News and Updates"
-- Storage bucket folder: media/news-and-updates/
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.news_and_updates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(300) NOT NULL,
    secondary_text TEXT,
    photo_url TEXT,
    published_date DATE DEFAULT CURRENT_DATE,
    external_link TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ------------------------------------------------------------------------------
-- 6. "Gallery" (Full Gallery Artboard & Home Highlights)
-- Storage bucket folder: media/gallery/
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.gallery (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(300) NOT NULL,
    caption TEXT,
    year_or_era VARCHAR(100),
    category VARCHAR(100) DEFAULT 'Campus',
    photo_url TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ------------------------------------------------------------------------------
-- 7. "Reconnect. Relive. Support & Save." (Alumni Registrations)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.registrations (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    full_name TEXT NOT NULL,
    relative_name TEXT,
    dob TEXT,
    branch TEXT,
    batch_year TEXT,
    phone TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ------------------------------------------------------------------------------
-- 8. "Branches / Institutions" (Configurable dropdown list for Join Form)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.branches (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true
);

-- ------------------------------------------------------------------------------
-- Row Level Security (RLS) Policies
-- ------------------------------------------------------------------------------
ALTER TABLE public.former_students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.heritage ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.legacy_builders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leaders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_and_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.branches ENABLE ROW LEVEL SECURITY;

-- Public read access for website visitors
CREATE POLICY "Allow public read access on former_students" ON public.former_students FOR SELECT USING (is_active = true);
CREATE POLICY "Allow public read access on heritage" ON public.heritage FOR SELECT USING (is_active = true);
CREATE POLICY "Allow public read access on legacy_builders" ON public.legacy_builders FOR SELECT USING (is_active = true);
CREATE POLICY "Allow public read access on leaders" ON public.leaders FOR SELECT USING (is_active = true);
CREATE POLICY "Allow public read access on news_and_updates" ON public.news_and_updates FOR SELECT USING (is_active = true);
CREATE POLICY "Allow public read access on gallery" ON public.gallery FOR SELECT USING (is_active = true);
CREATE POLICY "Allow public read access on branches" ON public.branches FOR SELECT USING (is_active = true);

-- Public insert access for alumni registration form
CREATE POLICY "Allow public registration insert" ON public.registrations FOR INSERT WITH CHECK (true);

-- Authenticated (Supabase Studio Admin) full access
CREATE POLICY "Allow authenticated full access on former_students" ON public.former_students FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated full access on heritage" ON public.heritage FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated full access on legacy_builders" ON public.legacy_builders FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated full access on leaders" ON public.leaders FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated full access on news_and_updates" ON public.news_and_updates FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated full access on gallery" ON public.gallery FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated full access on registrations" ON public.registrations FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated full access on branches" ON public.branches FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Indexes for performance & ordering
CREATE INDEX IF NOT EXISTS idx_former_students_order ON public.former_students(display_order);
CREATE INDEX IF NOT EXISTS idx_heritage_order ON public.heritage(display_order);
CREATE INDEX IF NOT EXISTS idx_legacy_builders_order ON public.legacy_builders(display_order);
CREATE INDEX IF NOT EXISTS idx_leaders_order ON public.leaders(display_order);
CREATE INDEX IF NOT EXISTS idx_news_and_updates_date ON public.news_and_updates(published_date DESC);
CREATE INDEX IF NOT EXISTS idx_gallery_order ON public.gallery(display_order);
CREATE INDEX IF NOT EXISTS idx_registrations_created ON public.registrations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_branches_order ON public.branches(display_order);

-- ------------------------------------------------------------------------------
-- Storage Setup Instructions (Run or configure in Supabase Storage dashboard)
-- Bucket: 'media' (Public)
-- Folder structure:
--   media/former-students/
--   media/heritage/
--   media/legacy-builders/
--   media/leaders/
--   media/news-and-updates/
--   media/gallery/
-- ------------------------------------------------------------------------------
