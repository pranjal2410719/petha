import { supabase } from './supabase';

// Projects
export const createProject = async (project) => {
  const { data, error } = await supabase
    .from('projects')
    .insert([project])
    .select();
  return { data, error };
};

export const getProjects = async () => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });
  return { data, error };
};

export const getUserProjects = async (userId) => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('author_id', userId);
  return { data, error };
};

// Collaboration Requests
export const createCollaborationRequest = async (request) => {
  const { data, error } = await supabase
    .from('collaboration_requests')
    .insert([request])
    .select();
  return { data, error };
};

export const getCollaborationRequests = async (authorId) => {
  const { data, error } = await supabase
    .from('collaboration_requests')
    .select('*')
    .eq('project_author_id', authorId)
    .eq('status', 'pending');
  return { data, error };
};

export const updateCollaborationRequest = async (id, status) => {
  const { data, error } = await supabase
    .from('collaboration_requests')
    .update({ status })
    .eq('id', id)
    .select();
  return { data, error };
};

export const updateProjectLikes = async (projectId, likes) => {
  const { data, error } = await supabase
    .from('projects')
    .update({ likes })
    .eq('id', projectId)
    .select();
  return { data, error };
};

export const updateProjectViews = async (projectId) => {
  const { data, error } = await supabase
    .rpc('increment_views', { project_id: projectId });
  return { data, error };
};

export const getProjectAnalytics = async (projectId) => {
  const { data, error } = await supabase
    .from('projects')
    .select('likes, views, collaborators, created_at')
    .eq('id', projectId)
    .single();
  return { data, error };
};

export const getTotalAnalytics = async (userId) => {
  const { data, error } = await supabase
    .from('projects')
    .select('likes, views, collaborators')
    .eq('author_id', userId);
  return { data, error };
};

export const getTopGrowingProjects = async () => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('likes', { ascending: false })
    .order('collaborators', { ascending: false });
  return { data, error };
};

export const getProjectById = async (id) => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();
  return { data, error };
};