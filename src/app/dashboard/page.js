'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import CardNav from '../../components/CardNav';
import ProjectStats from '../../components/dashboard/ProjectStats';
import MyProjects from '../../components/dashboard/MyProjects';
import CollaborationRequests from '../../components/CollaborationRequests';

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        window.location.href = '/auth';
      } else {
        setUser(user.email);
      }
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };



  if (!user) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">Loading...</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CardNav />
      
      <main className="pt-32 p-6">
        <ProjectStats user={user} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-20rem)]">
          <MyProjects user={user} />
          <CollaborationRequests projectAuthor={user} />
        </div>
      </main>
    </div>
  );
}