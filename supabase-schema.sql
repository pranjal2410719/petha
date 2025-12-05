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

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE collaboration_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE banned_users ENABLE ROW LEVEL SECURITY;

-- RLS Policies
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
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'projects' AND policyname = 'Users can update own projects') THEN
    CREATE POLICY "Users can update own projects" ON projects FOR UPDATE USING (auth.uid() = author_id);
  END IF;
END $$;

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

-- Create function to increment views
CREATE OR REPLACE FUNCTION increment_views(project_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE projects SET views = views + 1 WHERE id = project_id;
END;
$$ LANGUAGE plpgsql;