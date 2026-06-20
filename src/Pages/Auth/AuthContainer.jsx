import React, { useState } from 'react';
import { FormField } from '../../components/Shared';

const authInputClass = 'w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1b4332] outline-none transition';

export default function AuthContainer({ setUser, onSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
  
    if (email === 'farmer@gotiqa.com' && password === 'password') {
      setUser({ email, role: 'admin' });
      onSuccess();
    } else {
      setError('Invalid credentials.');
    }
  };

  return (
    <div className="flex justify-center items-center py-20 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md border border-gray-100">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Welcome Back to Gotiqa</h2>
          <p className="text-slate-500">Enter your credentials to access the farm dashboard.</p>
        </div>

        {error && <p className="text-red-500 mb-4 text-center text-sm">{error}</p>}

        <form onSubmit={handleLogin}>
          <FormField
            label="Email"
            name="email"
            type="email"
            placeholder="farmer@gotiqa.com"
            onChange={(e) => setEmail(e.target.value)}
            inputClassName={authInputClass}
            className="mb-5"
          />
          <FormField
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
            onChange={(e) => setPassword(e.target.value)}
            inputClassName={authInputClass}
            className="mb-8"
          />
          
          <button 
            type="submit" 
            className="w-full text-white py-3 rounded-lg font-bold hover:opacity-90 transition duration-200"
            style={{ backgroundColor: '#1b4332' }}
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <p className="text-slate-600">Don't have an account? <span className="font-bold text-[#1b4332] cursor-pointer">Sign Up</span></p>
        </div>
      </div>
    </div>
  );
}
