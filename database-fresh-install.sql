-- =====================================================
-- DOPO by BStudios - FRESH DATABASE INSTALLATION
-- WARNING: This will DELETE ALL existing data
-- =====================================================

-- =====================================================
-- STEP 1: DROP ALL EXISTING TABLES AND DATA
-- =====================================================

-- Drop all tables (this will delete all data)
DROP TABLE IF EXISTS public.audit_log CASCADE;
DROP TABLE IF EXISTS collaboration_requests CASCADE;
DROP TABLE IF EXISTS banned_users CASCADE;
DROP TABLE IF EXISTS projects CASCADE;

-- Drop all functions
DROP FUNCTION IF EXISTS increment_views(UUID) CASCADE;
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;
DROP FUNCTION IF EXISTS handle_project_changes() CASCADE;
DROP FUNCTION IF EXISTS handle_collaboration_approval() CASCADE;
DROP FUNCTION IF EXISTS update_collaboration_status(VARCHAR, UUID) CASCADE;

-- =====================================================
-- STEP 2: CREATE FRESH TABLES
-- =====================================================

-- Create projects table
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR NOT NULL,
  description TEXT NOT NULL,
  author VARCHAR NOT NULL,
  author_id UUID REFERENCES auth.users(id),
  category VARCHAR NOT NULL,
  likes INTEGER DEFAULT 0,
  collaborators INTEGER DEFAULT 1,
  views INTEGER DEFAULT 0,
  technologies TEXT[] DEFAULT '{}',
  budget VARCHAR DEFAULT 'Free',
  status VARCHAR DEFAULT 'Development',
  start_date DATE,
  team TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create collaboration_requests table
CREATE TABLE collaboration_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES projects(id),
  project_name VARCHAR NOT NULL,
  project_author_id UUID REFERENCES auth.users(id),
  requester_id UUID REFERENCES auth.users(id),
  requester_email VARCHAR NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  user_email VARCHAR NOT NULL,
  user_name VARCHAR NOT NULL,
  skills TEXT NOT NULL,
  reason TEXT NOT NULL,
  linkedin_profile VARCHAR NOT NULL,
  domain VARCHAR NOT NULL,
  tech_stack TEXT DEFAULT '',
  experience VARCHAR NOT NULL,
  availability VARCHAR NOT NULL,
  status VARCHAR DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create banned_users table
CREATE TABLE banned_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES projects(id),
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create audit log table
CREATE TABLE public.audit_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  table_name TEXT NOT NULL,
  operation TEXT NOT NULL,
  old_data JSONB,
  new_data JSONB,
  user_id UUID REFERENCES auth.users(id),
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- STEP 3: ENABLE ROW LEVEL SECURITY
-- =====================================================

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE banned_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

-- Disable RLS for collaboration_requests to avoid update issues
ALTER TABLE collaboration_requests DISABLE ROW LEVEL SECURITY;

-- =====================================================
-- STEP 4: CREATE RLS POLICIES
-- =====================================================

-- Projects policies
CREATE POLICY "Projects are viewable by everyone" ON projects FOR SELECT USING (true);
CREATE POLICY "Users can create projects" ON projects FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Users can update own projects" ON projects FOR UPDATE USING (auth.uid() = author_id) WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Users can delete own projects" ON projects FOR DELETE USING (auth.uid() = author_id);

-- Banned users policies
CREATE POLICY "Banned users viewable by project author" ON banned_users FOR SELECT USING (auth.uid() IN (SELECT author_id FROM projects WHERE id = project_id));
CREATE POLICY "Project authors can ban users" ON banned_users FOR INSERT WITH CHECK (auth.uid() IN (SELECT author_id FROM projects WHERE id = project_id));

-- Audit log policy
CREATE POLICY "Users can view own audit logs" ON public.audit_log FOR SELECT USING (auth.uid() = user_id);

-- =====================================================
-- STEP 5: CREATE FUNCTIONS
-- =====================================================

-- Function to increment views
CREATE OR REPLACE FUNCTION increment_views(project_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE projects SET views = views + 1 WHERE id = project_id;
END;
$$ LANGUAGE plpgsql;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- =====================================================
-- STEP 6: CREATE TRIGGERS
-- =====================================================

-- Trigger for projects updated_at
CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- STEP 7: ENABLE REALTIME
-- =====================================================

ALTER PUBLICATION supabase_realtime ADD TABLE projects;
ALTER PUBLICATION supabase_realtime ADD TABLE collaboration_requests;
ALTER PUBLICATION supabase_realtime ADD TABLE audit_log;

-- =====================================================
-- INSTALLATION COMPLETE
-- Fresh database ready for DOPO by BStudios
-- =====================================================