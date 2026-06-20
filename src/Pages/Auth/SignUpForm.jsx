import React from 'react';
import { FormField } from '../../components/Shared';

const authInputClass = 'w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#2d6a4f] outline-none';

export default function SignUpForm() {
  return (
    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
      <FormField
        label="Full Name"
        name="fullName"
        type="text"
        placeholder="John Doe"
        inputClassName={authInputClass}
      />
      <FormField
        label="Email"
        name="email"
        type="email"
        placeholder="farmer@gotiqa.com"
        inputClassName={authInputClass}
      />
      <FormField
        label="Password"
        name="password"
        type="password"
        placeholder="••••••••"
        inputClassName={authInputClass}
      />
      <button className="w-full bg-[#2d6a4f] text-white py-2.5 rounded-lg font-bold hover:bg-[#1e3f20] transition-colors">
        Sign Up
      </button>
    </form>
  );
}
