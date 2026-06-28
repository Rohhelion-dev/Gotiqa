import React from "react";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const phoneNumber = "254111771886";

  const message =
    "Hello Gotiqa SmartFarm, I would like to inquire about your goats and livestock products.";

  const whatsappLink =
    `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 group"
    >
      {/* Pulse Ring */}
      <span
        className="
          absolute
          inset-0
          rounded-full
          bg-[#25D366]
          opacity-40
          animate-ping
        "
      />

      {/* Main Button */}
      <div
        className="
          relative
          w-16
          h-16
          rounded-full
          bg-[#25D366]
          flex
          items-center
          justify-center
          shadow-2xl
          border-4
          border-white
          transition-all
          duration-300
          group-hover:scale-110
        "
      >
        <MessageCircle
          size={30}
          strokeWidth={2.5}
          className="text-white"
        />
      </div>

      {/* Tooltip */}
      <div
        className="
          absolute
          right-20
          top-1/2
          -translate-y-1/2
          bg-[#1b4332]
          text-white
          text-sm
          px-4
          py-2
          rounded-xl
          whitespace-nowrap
          opacity-0
          group-hover:opacity-100
          transition
          duration-300
          pointer-events-none
        "
      >
        Chat with us on WhatsApp
      </div>
    </a>
  );
}