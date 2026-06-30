import React, { useState } from "react";
import { Mail, MessageCircle, Phone, Send } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    contactInfo: "",
    message: "",
  });

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setStatus({ type: "", message: "" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to send message");
      }

      setStatus({
        type: "success",
        message: "Message sent successfully. We will get back to you shortly.",
      });

      setFormData({
        name: "",
        contactInfo: "",
        message: "",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error.message ||
          "Unable to send message. Please try WhatsApp or call us directly.",
      });
    } finally {
      setLoading(false);
    }
  };

  const contactCards = [
    {
      title: "Call Us",
      value: "0111 771 886",
      icon: Phone,
    },
    {
      title: "WhatsApp",
      value: "Chat on WhatsApp",
      href: "https://wa.me/254111771886",
      icon: MessageCircle,
    },
    {
      title: "Email",
      value: "kirorei04@gmail.com",
      icon: Mail,
    },
  ];

  return (
    <div className="bg-[#f7faf5]">
      <section className="mx-auto max-w-6xl px-4 py-10 text-center md:py-14">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
          Contact Gotiqa
        </p>

        <h1 className="mb-4 text-4xl font-extrabold text-emerald-950 md:text-5xl">
          Let’s Talk Livestock
        </h1>

        <p className="mx-auto max-w-2xl text-slate-600">
          Interested in purchasing livestock, premium goat meat, or learning
          more about our farm? Reach out and we’ll respond shortly.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-10">
        <div className="grid gap-5 md:grid-cols-3">
          {contactCards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="rounded-2xl border border-emerald-900/10 bg-white/90 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800">
                  <Icon size={24} />
                </div>

                <h3 className="mb-2 text-lg font-bold text-emerald-950">
                  {card.title}
                </h3>

                {card.href ? (
                  <a
                    href={card.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-emerald-800 hover:text-emerald-950"
                  >
                    {card.value}
                  </a>
                ) : (
                  <p className="text-slate-600">{card.value}</p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-14 md:pb-20">
        <div className="rounded-2xl border border-emerald-900/10 bg-white p-6 shadow-lg md:p-8">
          <h2 className="mb-2 text-center text-2xl font-bold text-emerald-950 md:text-3xl">
            Send Us A Message
          </h2>

          <p className="mb-7 text-center text-sm text-slate-500">
            Your message will be sent directly to the Gotiqa team.
          </p>

          {status.message && (
            <div
              role="alert"
              className={`mb-5 rounded-xl border px-4 py-3 text-sm ${
                status.type === "success"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                  : "border-red-200 bg-red-50 text-red-700"
              }`}
            >
              {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-300 p-4 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/25"
            />

            <input
              type="text"
              name="contactInfo"
              placeholder="Email or Phone Number"
              value={formData.contactInfo}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-300 p-4 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/25"
            />

            <textarea
              name="message"
              rows="5"
              placeholder="Tell us how we can help..."
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full resize-none rounded-xl border border-slate-300 p-4 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/25"
            />

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-900 py-4 font-bold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Send size={18} />
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}