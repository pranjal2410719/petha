-- Insert dummy projects using existing user IDs (only if table is empty)
-- This will use the first users from auth.users table
-- Only insert if there are users and no projects exist
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
      0,
      1,
      0,
      ARRAY['React', 'Node.js'],
      'Free',
      'Development',
      CURRENT_DATE,
      ARRAY[COALESCE(raw_user_meta_data->>'name', email)]
      
    FROM auth.users, generate_series(1, 3)
    LIMIT 3;
  END IF;
END $$;

-- This script automatically uses existing users from auth.users table
-- If no users exist, create some users first through Supabase Auth