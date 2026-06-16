import React, { useState } from 'react';
// Assuming you will create these two components next
import LoginForm from './LoginForm'; 
import SignUpForm from './SignUpForm';

export default function AuthContainer() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa] p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-100 p-8 space-y-6">
        
        {/* Toggle Header */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black text-[#1e3f20]">
            {isLogin ? 'Welcome Back to Gotiqa' : 'Join the Gotiqa Community'}
          </h2>
          <p className="text-sm text-gray-500">
            {isLogin ? 'Enter your credentials to access the farm dashboard.' : 'Register to manage your livestock and farm data.'}
          </p>
        </div>

        {/* Dynamic Form Rendering */}
        <div className="py-2">
          {isLogin ? <LoginForm /> : <SignUpForm />}
        </div>

        {/* Toggle Switch */}
        <div className="text-center pt-4 border-t border-gray-50">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-[#2d6a4f] font-bold hover:underline"
          >
            {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    </div>
  );
}