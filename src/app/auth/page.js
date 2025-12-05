'use client';
import { useState } from 'react';
import LoginForm from '../../components/auth/LoginForm';
import SignupForm from '../../components/auth/SignupForm';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = (user) => {
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-gray-600">
            {isLogin ? 'Sign in to your creator dashboard' : 'Join our creator community'}
          </p>
        </div>

        {isLogin ? (
          <LoginForm 
            onLogin={handleAuth}
            onSwitchToSignup={() => setIsLogin(false)}
          />
        ) : (
          <SignupForm 
            onSignup={handleAuth}
            onSwitchToLogin={() => setIsLogin(true)}
          />
        )}
      </div>
    </div>
  );
}