-- Enable realtime for projects table (skip if already exists)
DO $$ 
BEGIN
    BEGIN
        ALTER PUBLICATION supabase_realtime ADD TABLE projects;
    EXCEPTION
        WHEN duplicate_object THEN
            -- Table already in publication, skip
            NULL;
    END;
    
    BEGIN
        ALTER PUBLICATION supabase_realtime ADD TABLE collaboration_requests;
    EXCEPTION
        WHEN duplicate_object THEN
            -- Table already in publication, skip
            NULL;
    END;
END $$;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for projects table
DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create trigger for collaboration_requests table  
DROP TRIGGER IF EXISTS update_collaboration_requests_updated_at ON collaboration_requests;
CREATE TRIGGER update_collaboration_requests_updated_at
    BEFORE UPDATE ON collaboration_requests
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Ensure RLS is enabled and policies exist
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE collaboration_requests ENABLE ROW LEVEL SECURITY;

-- Update RLS policies to allow updates
DROP POLICY IF EXISTS "Users can update own projects" ON projects;
CREATE POLICY "Users can update own projects" ON projects
    FOR UPDATE USING (auth.uid() = author_id)
    WITH CHECK (auth.uid() = author_id);

DROP POLICY IF EXISTS "Users can delete own projects" ON projects;
CREATE POLICY "Users can delete own projects" ON projects
    FOR DELETE USING (auth.uid() = author_id);

-- Create function to handle real-time CRUD operations
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

-- Enable RLS on audit_log
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

-- Create policy for audit_log
CREATE POLICY "Users can view own audit logs" ON public.audit_log
    FOR SELECT USING (auth.uid() = user_id);

-- Create triggers for real-time CRUD operations
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

-- Enable realtime on audit_log for live updates
DO $$ 
BEGIN
    BEGIN
        ALTER PUBLICATION supabase_realtime ADD TABLE audit_log;
    EXCEPTION
        WHEN duplicate_object THEN
            -- Table already in publication, skip
            NULL;
    END;
END $$;

-- Create function to increment collaborators when request is approved
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

-- Create trigger for collaboration approval
DROP TRIGGER IF EXISTS collaboration_approval_trigger ON collaboration_requests;
CREATE TRIGGER collaboration_approval_trigger
    AFTER UPDATE ON collaboration_requests
    FOR EACH ROW
    EXECUTE FUNCTION handle_collaboration_approval();