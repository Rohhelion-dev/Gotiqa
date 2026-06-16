import React from 'react';

export default function SignUpForm() {
  return (
    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
        <input type="text" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#2d6a4f] outline-none" placeholder="John Doe" />
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
        <input type="email" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#2d6a4f] outline-none" placeholder="farmer@gotiqa.com" />
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
        <input type="password" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#2d6a4f] outline-none" placeholder="••••••••" />
      </div>
      <button className="w-full bg-[#2d6a4f] text-white py-2.5 rounded-lg font-bold hover:bg-[#1e3f20] transition-colors">
        Sign Up
      </button>
    </form>
  );
}