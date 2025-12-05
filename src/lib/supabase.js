import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://iauvjdrqeasydbjrnaey.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlhdXZqZHJxZWFzeWRianJuYWV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5NDE0NDUsImV4cCI6MjA4MDUxNzQ0NX0.Dewor4_zgqpbJCMjv_60llOuJ_vP5l4jp36lzTxCpeI';

export const supabase = createClient(supabaseUrl, supabaseKey);