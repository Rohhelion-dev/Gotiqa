import React from "react";

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
      className="
        fixed
        bottom-6
        right-6
        z-50
        group
      "
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="w-8 h-8 fill-white"
        >
          <path d="M19.11 17.24c-.27-.13-1.61-.79-1.86-.88-.25-.09-.43-.13-.61.13-.18.27-.7.88-.86 1.06-.16.18-.31.2-.58.07-.27-.13-1.13-.42-2.15-1.35-.8-.71-1.34-1.59-1.5-1.86-.16-.27-.02-.41.12-.54.12-.12.27-.31.4-.47.13-.16.18-.27.27-.45.09-.18.04-.34-.02-.47-.07-.13-.61-1.48-.84-2.03-.22-.53-.45-.46-.61-.47h-.52c-.18 0-.47.07-.72.34-.25.27-.95.93-.95 2.27s.97 2.63 1.11 2.81c.13.18 1.91 2.92 4.62 4.09.65.28 1.16.45 1.56.57.66.21 1.25.18 1.72.11.53-.08 1.61-.66 1.84-1.29.23-.63.23-1.18.16-1.29-.07-.11-.25-.18-.52-.31z"/>
          <path d="M16.02 3C8.84 3 3 8.84 3 16c0 2.52.72 4.96 2.09 7.06L3 29l6.11-2.01A12.9 12.9 0 0016.02 29C23.18 29 29 23.16 29 16S23.18 3 16.02 3zm0 23.64c-2.08 0-4.11-.56-5.89-1.62l-.42-.25-3.63 1.19 1.21-3.54-.27-.44a10.56 10.56 0 01-1.63-5.68c0-5.85 4.77-10.62 10.63-10.62 2.84 0 5.51 1.11 7.52 3.11a10.56 10.56 0 013.11 7.51c0 5.86-4.77 10.64-10.63 10.64z"/>
        </svg>
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