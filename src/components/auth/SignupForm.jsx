'use client';
import { useState } from 'react';
import { supabase } from '../../lib/supabase';

const SignupForm = ({ onSignup, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          name: formData.name,
        }
      }
    });
    if (error) {
      alert(error.message);
    } else {
      onSignup(data.user.email);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
        <input
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700">
        Sign Up
      </button>
      <p className="text-center text-sm text-gray-600">
        Already have an account?{' '}
        <button type="button" onClick={onSwitchToLogin} className="text-blue-600 hover:underline">
          Login
        </button>
      </p>
    </form>
  );
};

export default SignupForm;