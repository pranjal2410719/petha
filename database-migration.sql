-- =====================================================
-- BRAYNIX STUDIOS DATABASE MIGRATION
-- Complete database setup for creator-collaboration platform
-- =====================================================

-- =====================================================
-- 1. CREATE TABLES
-- =====================================================

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
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
CREATE TABLE IF NOT EXISTS collaboration_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES projects(id),
  project_name VARCHAR NOT NULL,
  project_author_id UUID REFERENCES auth.users(id),
  requester_id UUID REFERENCES auth.users(id),
  requester_email VARCHAR NOT NULL,
  status VARCHAR DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create banned_users table
CREATE TABLE IF NOT EXISTS banned_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES projects(id),
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create audit log table for tracking changes
CREATE TABLE IF NOT EXISTS public.audit_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  table_name TEXT NOT NULL,
  operation TEXT NOT NULL,
  old_data JSONB,
  new_data JSONB,
  user_id UUID REFERENCES auth.users(id),
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 2. ENABLE ROW LEVEL SECURITY
-- =====================================================

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE collaboration_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE banned_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 3. CREATE RLS POLICIES
-- =====================================================

-- Projects policies
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'projects' AND policyname = 'Projects are viewable by everyone') THEN
    CREATE POLICY "Projects are viewable by everyone" ON projects FOR SELECT USING (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'projects' AND policyname = 'Users can create projects') THEN
    CREATE POLICY "Users can create projects" ON projects FOR INSERT WITH CHECK (auth.uid() = author_id);
  END IF;
END $$;

DROP POLICY IF EXISTS "Users can update own projects" ON projects;
CREATE POLICY "Users can update own projects" ON projects
    FOR UPDATE USING (auth.uid() = author_id)
    WITH CHECK (auth.uid() = author_id);

DROP POLICY IF EXISTS "Users can delete own projects" ON projects;
CREATE POLICY "Users can delete own projects" ON projects
    FOR DELETE USING (auth.uid() = author_id);

-- Collaboration requests policies
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'collaboration_requests' AND policyname = 'Collaboration requests viewable by project author') THEN
    CREATE POLICY "Collaboration requests viewable by project author" ON collaboration_requests FOR SELECT USING (auth.uid() = project_author_id);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'collaboration_requests' AND policyname = 'Users can create collaboration requests') THEN
    CREATE POLICY "Users can create collaboration requests" ON collaboration_requests FOR INSERT WITH CHECK (auth.uid() = requester_id);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'collaboration_requests' AND policyname = 'Project authors can update requests') THEN
    CREATE POLICY "Project authors can update requests" ON collaboration_requests FOR UPDATE USING (auth.uid() = project_author_id);
  END IF;
END $$;

-- Banned users policies
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'banned_users' AND policyname = 'Banned users viewable by project author') THEN
    CREATE POLICY "Banned users viewable by project author" ON banned_users FOR SELECT USING (auth.uid() IN (SELECT author_id FROM projects WHERE id = project_id));
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'banned_users' AND policyname = 'Project authors can ban users') THEN
    CREATE POLICY "Project authors can ban users" ON banned_users FOR INSERT WITH CHECK (auth.uid() IN (SELECT author_id FROM projects WHERE id = project_id));
  END IF;
END $$;

-- Audit log policy
CREATE POLICY "Users can view own audit logs" ON public.audit_log
    FOR SELECT USING (auth.uid() = user_id);

-- =====================================================
-- 4. CREATE FUNCTIONS
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

-- Function to handle real-time CRUD operations
CREATE OR REPLACE FUNCTION handle_project_changes()
RETURNS TRIGGER AS $$
BEGIN
    -- Log the operation for debugging
    INSERT INTO public.audit_log (table_name, operation, old_data, new_data, user_id, timestamp)
    VALUES (
        TG_TABLE_NAME,
        TG_OP,
        CASE WHEN TG_OP = 'DELETE' THEN row_to_json(OLD) ELSE NULL END,
        CASE WHEN TG_OP != 'DELETE' THEN row_to_json(NEW) ELSE NULL END,
        auth.uid(),
        NOW()
    );
    
    -- Return appropriate record
    IF TG_OP = 'DELETE' THEN
        RETURN OLD;
    ELSE
        RETURN NEW;
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to increment collaborators when request is approved
CREATE OR REPLACE FUNCTION handle_collaboration_approval()
RETURNS TRIGGER AS $$
BEGIN
    -- If status changed to 'approved', increment collaborators and add to team
    IF NEW.status = 'approved' AND OLD.status != 'approved' THEN
        UPDATE projects 
        SET 
            collaborators = collaborators + 1,
            team = array_append(team, NEW.requester_email)
        WHERE id = NEW.project_id;
    END IF;
    
    -- If status changed from 'approved' to something else, decrement
    IF OLD.status = 'approved' AND NEW.status != 'approved' THEN
        UPDATE projects 
        SET 
            collaborators = GREATEST(1, collaborators - 1),
            team = array_remove(team, NEW.requester_email)
        WHERE id = NEW.project_id;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- 5. CREATE TRIGGERS
-- =====================================================

-- Trigger for projects updated_at
DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger for collaboration_requests updated_at
DROP TRIGGER IF EXISTS update_collaboration_requests_updated_at ON collaboration_requests;
CREATE TRIGGER update_collaboration_requests_updated_at
    BEFORE UPDATE ON collaboration_requests
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Triggers for real-time CRUD operations
DROP TRIGGER IF EXISTS projects_audit_trigger ON projects;
CREATE TRIGGER projects_audit_trigger
    AFTER INSERT OR UPDATE OR DELETE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION handle_project_changes();

DROP TRIGGER IF EXISTS collaboration_requests_audit_trigger ON collaboration_requests;
CREATE TRIGGER collaboration_requests_audit_trigger
    AFTER INSERT OR UPDATE OR DELETE ON collaboration_requests
    FOR EACH ROW
    EXECUTE FUNCTION handle_project_changes();

-- Trigger for collaboration approval
DROP TRIGGER IF EXISTS collaboration_approval_trigger ON collaboration_requests;
CREATE TRIGGER collaboration_approval_trigger
    AFTER UPDATE ON collaboration_requests
    FOR EACH ROW
    EXECUTE FUNCTION handle_collaboration_approval();

-- =====================================================
-- 6. ENABLE REALTIME
-- =====================================================

-- Enable realtime for tables (skip if already exists)
DO $$ 
BEGIN
    BEGIN
        ALTER PUBLICATION supabase_realtime ADD TABLE projects;
    EXCEPTION
        WHEN duplicate_object THEN
            NULL;
    END;
    
    BEGIN
        ALTER PUBLICATION supabase_realtime ADD TABLE collaboration_requests;
    EXCEPTION
        WHEN duplicate_object THEN
            NULL;
    END;
    
    BEGIN
        ALTER PUBLICATION supabase_realtime ADD TABLE audit_log;
    EXCEPTION
        WHEN duplicate_object THEN
            NULL;
    END;
END $$;

-- =====================================================
-- 7. INSERT SAMPLE DATA (OPTIONAL)
-- =====================================================

-- Insert dummy projects using existing user IDs (only if table is empty)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM auth.users) AND NOT EXISTS (SELECT 1 FROM projects) THEN
    INSERT INTO projects (name, description, author, author_id, category, likes, collaborators, views, technologies, budget, status, start_date, team)
    SELECT 
      'Sample Project ' || generate_series,
      'This is a sample project created for demonstration purposes.',
      COALESCE(raw_user_meta_data->>'name', email),
      id,
      'Technology',
      floor(random() * 100)::int,
      1,
      floor(random() * 500)::int,
      ARRAY['React', 'Node.js', 'Supabase'],
      'Free',
      'Development',
      CURRENT_DATE,
      ARRAY[COALESCE(raw_user_meta_data->>'name', email)]
      
    FROM auth.users, generate_series(1, 3)
    LIMIT 3;
  END IF;
END $$;

-- =====================================================
-- MIGRATION COMPLETE
-- =====================================================