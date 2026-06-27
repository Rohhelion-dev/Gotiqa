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
  className="
    fixed
    bottom-6
    right-6
    z-50
    w-16
    h-16
    rounded-full
    bg-[#25D366]
    text-white
    flex
    items-center
    justify-center
    shadow-xl
    hover:scale-110
    transition
    duration-300
  "
>

  <span className="text-3xl">
    💬
  </span>

</a>


);

}
