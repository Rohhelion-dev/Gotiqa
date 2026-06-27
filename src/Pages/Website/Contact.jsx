import React, { useState } from 'react';

export default function Contact() {
const [formData, setFormData] = useState({
name: '',
contactInfo: '',
message: '',
});

const handleSubmit = (e) => {
e.preventDefault();


console.log(formData);

alert(
  'Thank you for contacting Gotiqa. We will get back to you shortly.'
);

setFormData({
  name: '',
  contactInfo: '',
  message: '',
});


};

return ( <div className="bg-[#f4f7f5]">


  {/* Hero */}
  <section className="max-w-6xl mx-auto px-4 py-16 text-center">

    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4">
      Contact Gotiqa
    </h1>

    <p className="text-slate-600 max-w-2xl mx-auto">
      Interested in purchasing livestock, premium goat meat,
      or learning more about our farm?
      We'd love to hear from you.
    </p>

  </section>

  {/* Contact Cards */}
  <section className="max-w-6xl mx-auto px-4 mb-16">

    <div className="grid md:grid-cols-3 gap-6">

      <div className="bg-white p-8 rounded-2xl shadow-sm">
        <div className="text-4xl mb-4">📞</div>

        <h3 className="font-bold text-xl mb-2">
          Call Us
        </h3>

        <p className="text-slate-600">
          0111771886
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm">
        <div className="text-4xl mb-4">💬</div>

        <h3 className="font-bold text-xl mb-2">
          WhatsApp
        </h3>

        <a
          href="https://wa.me/254111771886"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#1b4332] font-semibold"
        >
          Chat on WhatsApp
        </a>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm">
        <div className="text-4xl mb-4">📧</div>

        <h3 className="font-bold text-xl mb-2">
          Email
        </h3>

        <p className="text-slate-600">
          kirorei04@gmail.com
        </p>
      </div>

    </div>

  </section>

  {/* Contact Form */}
  <section className="max-w-3xl mx-auto px-4 pb-20">

    <div className="bg-white p-10 rounded-3xl shadow-lg">

      <h2 className="text-3xl font-bold mb-8 text-center">
        Send Us A Message
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        <input
          type="text"
          placeholder="Full Name"
          value={formData.name}
          onChange={(e) =>
            setFormData({
              ...formData,
              name: e.target.value,
            })
          }
          required
          className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]"
        />

        <input
          type="text"
          placeholder="Email or Phone Number"
          value={formData.contactInfo}
          onChange={(e) =>
            setFormData({
              ...formData,
              contactInfo: e.target.value,
            })
          }
          required
          className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]"
        />

        <textarea
          rows="6"
          placeholder="Tell us how we can help..."
          value={formData.message}
          onChange={(e) =>
            setFormData({
              ...formData,
              message: e.target.value,
            })
          }
          required
          className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]"
        />

        <button
          type="submit"
          className="w-full bg-[#1b4332] hover:bg-[#153426] text-white py-4 rounded-xl font-bold transition"
        >
          Send Message
        </button>

      </form>

    </div>

  </section>

</div>


);
}
