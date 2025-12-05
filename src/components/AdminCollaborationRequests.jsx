'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function AdminCollaborationRequests({ projectId }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
    
    // Subscribe to real-time updates
    const subscription = supabase
      .channel('collaboration_requests')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'collaboration_requests', filter: `project_id=eq.${projectId}` },
        () => fetchRequests()
      )
      .subscribe();

    return () => subscription.unsubscribe();
  }, [projectId]);

  const fetchRequests = async () => {
    try {
      let query = supabase
        .from('collaboration_requests')
        .select('*');
      
      if (projectId) {
        query = query.eq('project_id', projectId);
      } else {
        // Get all requests for user's projects
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: userProjects } = await supabase
            .from('projects')
            .select('id')
            .eq('author_id', user.id);
          
          if (userProjects && userProjects.length > 0) {
            const projectIds = userProjects.map(p => p.id);
            query = query.in('project_id', projectIds);
          }
        }
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      setRequests(data || []);
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRequest = async (requestId, status) => {
    try {
      // Direct update without triggers
      const { error } = await supabase
        .from('collaboration_requests')
        .update({ status })
        .eq('id', requestId);

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      fetchRequests();
      alert(`Request ${status} successfully!`);
    } catch (error) {
      console.error('Error updating request:', error);
      alert('Error: ' + (error?.message || 'Failed to update request'));
    }
  };

  if (loading) return <div className="text-center py-4">Loading requests...</div>;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-900">Collaboration Requests</h3>
      
      {requests.length === 0 ? (
        <p className="text-gray-500">No collaboration requests yet.</p>
      ) : (
        <div className="space-y-4">
          {requests.map((request) => (
            <div key={request.id} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-semibold text-gray-900">{request.user_name}</h4>
                  <p className="text-sm text-gray-600">{request.user_email}</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    request.status === 'approved' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {request.status}
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(request.created_at).toLocaleDateString()}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Skills:</p>
                  <p className="text-sm text-gray-600">{request.skills}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Domain:</p>
                  <p className="text-sm text-gray-600">{request.domain}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700">Experience:</p>
                  <p className="text-sm text-gray-600">{request.experience}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700">Why they want to join:</p>
                <p className="text-sm text-gray-600">{request.reason}</p>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700">LinkedIn:</p>
                <a href={request.linkedin_profile} target="_blank" rel="noopener noreferrer" 
                   className="text-sm text-blue-600 hover:underline">
                  {request.linkedin_profile}
                </a>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700">Availability:</p>
                <p className="text-sm text-gray-600">{request.availability}</p>
              </div>

              {request.status === 'pending' && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleRequest(request.id, 'approved')}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleRequest(request.id, 'rejected')}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}