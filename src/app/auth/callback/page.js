'use client';
import { useEffect } from 'react';
import { supabase } from '../../../lib/supabase';

export default function AuthCallback() {
  useEffect(() => {
    const handleAuthCallback = async () => {
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Auth error:', error);
        window.location.href = '/auth?error=auth_failed';
        return;
      }
      
      if (data.session) {
        // Successfully authenticated, redirect to dashboard
        window.location.href = '/dashboard';
      } else {
        // No session, redirect back to auth
        window.location.href = '/auth';
      }
    };

    handleAuthCallback();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Completing authentication...</p>
      </div>
    </div>
  );
}