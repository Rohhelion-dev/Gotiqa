import { useState } from 'react';

export default function AuthContainer({ setUser, onSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (error) setError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (error) setError('');
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      if (email === 'farmer@gotiqa.com' && password === 'password') {
        setUser({ email, role: 'admin' });
        onSuccess();
      } else {
        setError('Invalid credentials. Please check your email and password.');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred during login.';
      setError(message);
      console.error('[AuthContainer] Login failed:', err);
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
          <div className="mb-5">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
            <input 
              type="email" 
              placeholder="farmer@gotiqa.com"
              value={email}
              onChange={handleEmailChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1b4332] outline-none transition"
            />
          </div>
          
          <div className="mb-8">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={handlePasswordChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1b4332] outline-none transition"
            />
          </div>
          
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