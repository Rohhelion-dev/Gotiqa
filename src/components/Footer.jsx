import React from "react";
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#163020] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Gotiqa SmartFarm
            </h2>

            <p className="text-gray-300 leading-relaxed">
              Smart livestock management powered by technology,
              transparency, and sustainable farming practices.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">
              Quick Links
            </h3>

            <ul className="space-y-2 text-gray-300">
              <li>Home</li>
              <li>About Us</li>
              <li>Products</li>
              <li>Contact</li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-bold text-lg mb-4">
              Products
            </h3>

            <ul className="space-y-2 text-gray-300">
              <li>Live Goats</li>
              <li>Breeding Stock</li>
              <li>Goat Kids</li>
              <li>Premium Goat Meat</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">
              Contact Us
            </h3>

            <div className="space-y-4 text-gray-300">
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-emerald-400" />
                <span>0111 771 886</span>
              </div>

              <div className="flex items-center gap-3">
                <MessageCircle
                  size={18}
                  className="text-emerald-400"
                />
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

        {/* Divider */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Gotiqa SmartFarm.
            All rights reserved.
          </p>

          <p className="text-gray-500 text-sm">
            Building the future of livestock farming.
          </p>
        </div>
      </div>
    </footer>
  );
}