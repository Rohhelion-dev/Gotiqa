import React from "react";
import { Phone, MessageCircle, Mail, MapPin } from "lucide-react";

export default function Footer({ setCurrentView }) {
  const links = [
    { label: "Home", view: "home" },
    { label: "About Us", view: "about" },
    { label: "Products", view: "products" },
    { label: "Contact", view: "contact" },
  ];

  return (
    <footer className="bg-[#163020] text-white rounded-t-3xl mt-10">
      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-4 gap-10">

          <div>
            <h2 style={{ color: "#ffffff" }} className="text-2xl font-bold mb-4">
              Gotiqa SmartFarm
            </h2>

            <p style={{ color: "#ffffff" }} className="leading-relaxed">
              Smart livestock management powered by technology,
              transparency, and sustainable farming practices.
            </p>
          </div>

          <div>
            <h3 style={{ color: "#ffffff" }} className="font-bold text-lg mb-4">
              Quick Links
            </h3>

            <div className="grid gap-3">
              {links.map((link) => (
                <button
                  key={link.view}
                  onClick={() => setCurrentView(link.view)}
                  className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white font-semibold transition hover:bg-white hover:text-emerald-900"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 style={{ color: "#ffffff" }} className="font-bold text-lg mb-4">
              Products
            </h3>

            <ul className="space-y-2 text-white">
              <li>Live Goats</li>
              <li>Breeding Stock</li>
              <li>Goat Kids</li>
              <li>Premium Goat Meat</li>
            </ul>
          </div>

          <div>
            <h3 style={{ color: "#ffffff" }} className="font-bold text-lg mb-4">
              Contact Us
            </h3>

            <div className="space-y-4 text-white">

              <div className="flex items-center gap-3">
                <Phone size={18} className="text-emerald-400" />
                <span>0111 771 886</span>
              </div>

              <div className="flex items-center gap-3">
                <MessageCircle size={18} className="text-emerald-400" />
                <span>0111 771 886</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={18} className="text-emerald-400" />
                <span>kirorei04@gmail.com</span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-emerald-400" />
                <span>Nairobi, Kenya</span>
              </div>

            </div>
          </div>

        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">

          <p style={{ color: "#ffffff" }} className="text-sm">
            © {new Date().getFullYear()} Gotiqa SmartFarm. All rights reserved.
          </p>

          <p style={{ color: "#ffffff" }} className="text-sm">
            Building the future of livestock farming.
          </p>

        </div>

      </div>
    </footer>
  );
}
