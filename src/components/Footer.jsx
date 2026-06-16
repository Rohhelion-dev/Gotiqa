import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#1e3f20] text-white py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Gotiqa Smart Farm. All rights reserved.
        </p>
        <div className="flex gap-6 text-sm">
          <a href="#" className="hover:text-[#74c69d] transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-[#74c69d] transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-[#74c69d] transition-colors">Contact Support</a>
        </div>
      </div>
    </footer>
  );
}