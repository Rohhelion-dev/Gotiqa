import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ 
    name: '', 
    contactInfo: '', // Added contactInfo field
    message: '' 
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you! Your inquiry has been received.');
  };

  return (
    <section className="max-w-lg mx-auto py-12 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-slate-800">Get in Touch</h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Full Name Field */}
          <div className="relative">
            <input 
              type="text" 
              placeholder=" " 
              required 
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="peer w-full p-2 border-b-2 border-gray-300 bg-transparent outline-none transition focus:border-[var(--accent-primary)] placeholder-transparent" 
            />
            <label className="absolute left-0 -top-3.5 text-sm text-gray-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[var(--accent-primary)]">
              Full Name
            </label>
          </div>

          {/* Email or Phone Field */}
          <div className="relative">
            <input 
              type="text" 
              placeholder=" " 
              required 
              onChange={(e) => setFormData({...formData, contactInfo: e.target.value})}
              className="peer w-full p-2 border-b-2 border-gray-300 bg-transparent outline-none transition focus:border-[var(--accent-primary)] placeholder-transparent" 
            />
            <label className="absolute left-0 -top-3.5 text-sm text-gray-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[var(--accent-primary)]">
              Email or Phone Number
            </label>
          </div>

          {/* Message Field */}
          <div className="relative">
            <textarea 
              placeholder=" " 
              required 
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="peer w-full p-2 border-b-2 border-gray-300 bg-transparent outline-none transition focus:border-[var(--accent-primary)] placeholder-transparent h-24" 
            />
            <label className="absolute left-0 -top-3.5 text-sm text-gray-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[var(--accent-primary)]">
              Your Message/Inquiry
            </label>
          </div>

          <button 
            type="submit"
            className="w-full text-white py-3 rounded-xl font-bold hover:scale-[1.02] active:scale-[0.98] transition" 
            style={{ backgroundColor: 'var(--accent-primary)' }}
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}