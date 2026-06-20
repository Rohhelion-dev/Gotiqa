import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ 
    name: '', 
    contactInfo: '',
    message: '' 
  });
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitError, setSubmitError] = useState('');

  const validateForm = () => {
    if (!formData.name.trim()) return 'Name is required.';
    if (!formData.contactInfo.trim()) return 'Email or phone number is required.';
    if (!formData.message.trim()) return 'Message is required.';
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactInfo);
    const isPhone = /^[+]?[\d\s()-]{7,}$/.test(formData.contactInfo);
    if (!isEmail && !isPhone) return 'Please enter a valid email address or phone number.';
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitStatus(null);
    setSubmitError('');

    const validationError = validateForm();
    if (validationError) {
      setSubmitError(validationError);
      return;
    }

    try {
      // Placeholder for API integration
      console.log('Form Submitted:', formData);
      setSubmitStatus('success');
      setFormData({ name: '', contactInfo: '', message: '' });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to send your message. Please try again.';
      setSubmitError(message);
      setSubmitStatus('error');
      console.error('[Contact] Submission failed:', error);
    }
  };

  return (
    <section className="max-w-lg mx-auto py-12 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-slate-800">Get in Touch</h2>

        {submitError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700" role="alert">
            {submitError}
          </div>
        )}

        {submitStatus === 'success' && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700" role="status">
            Thank you! Your inquiry has been received.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Full Name Field */}
          <div className="relative">
            <input 
              type="text" 
              placeholder=" " 
              required 
              onChange={(e) => { setFormData({...formData, name: e.target.value}); if (submitError) setSubmitError(''); }}
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
              onChange={(e) => { setFormData({...formData, contactInfo: e.target.value}); if (submitError) setSubmitError(''); }}
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
              onChange={(e) => { setFormData({...formData, message: e.target.value}); if (submitError) setSubmitError(''); }}
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