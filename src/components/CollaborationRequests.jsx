'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { getCollaborationRequests, updateCollaborationRequest } from '../lib/database';

const CollaborationRequests = ({ projectAuthor }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRequests = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await getCollaborationRequests(user.id);
        if (!error) {
          setRequests(data || []);
        }
      }
      setLoading(false);
    };
    
    loadRequests();
    
    // Subscribe to realtime changes
    const subscription = supabase
      .channel('collaboration_requests')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'collaboration_requests' }, () => {
        loadRequests();
      })
      .subscribe();
    
    return () => {
      subscription.unsubscribe();
    };
  }, [projectAuthor]);

  const handleRequest = async (requestId, action) => {
    const { error } = await updateCollaborationRequest(requestId, action);
    if (!error) {
      setRequests(requests.filter(req => req.id !== requestId));
    }
  };



  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-full overflow-y-auto">
      <h3 className="text-lg font-semibold mb-4">Collaboration Requests</h3>
      {loading ? (
        <div className="text-center py-4">
          <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
        </div>
      ) : requests.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No pending requests</p>
      ) : (
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {requests.map(request => (
            <div key={request.id} className="border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-medium">{request.requester_email}</h4>
                  <p className="text-sm text-gray-600">wants to collaborate on "{request.project_name}"</p>
                  <p className="text-xs text-gray-400">{new Date(request.created_at).toLocaleString()}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleRequest(request.id, 'accepted')}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleRequest(request.id, 'rejected')}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
                >
                  Reject
                </button>
                <button
                  onClick={() => handleRequest(request.id, 'banned')}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                >
                  Ban
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CollaborationRequests;