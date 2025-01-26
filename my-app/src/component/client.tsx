// components/ClientsSlider.js
"use client"; // Mark as a Client Component in Next.js

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ClientsSlider = () => {
   const clients = [
      { id: 1, logo: "/client/client-1.webp", alt: "Client 1" },
      { id: 2, logo: "/client/client-2.webp", alt: "Client 2" },
      { id: 3, logo: "/client/client-3.webp", alt: "Client 3" },
      { id: 4, logo: "/client/client-4.webp", alt: "Client 4" },
      { id: 5, logo: "/client/client-5.webp", alt: "Client 5" },
      { id: 6, logo: "/client/client-6.webp", alt: "Client 6" },
   ];

   const settings = {
      dots: false,
      infinite: true,
      slidesToShow: 4, 
      slidesToScroll: 1, 
      autoplay: true, 
      autoplaySpeed: 2000, 
      speed: 1000, 
      pauseOnHover: true, 
      arrows: false,
      responsive: [
         {
            breakpoint: 1024, // For screens smaller than 1024px
            settings: {
               slidesToShow: 8,
            },
         },
         {
            breakpoint: 768, // For screens smaller than 768px
            settings: {
               slidesToShow: 3,
            },
         },
         {
            breakpoint: 480, // For screens smaller than 480px
            settings: {
               slidesToShow: 2,
            },
         },
      ],
   };

   return (
      <div className="w-full bg-gray-100">
         <Slider {...settings}>
            {clients.map((client) => (
               <div key={client.id} className="px-4">
                  <div className="flex items-center justify-center">
                     <img
                        src={client.logo}
                        alt={client.alt}
                        className="w-28 h-28 object-contain"
                     />
                  </div>
               </div>
            ))}
         </Slider>
      </div>
   );
};

export default ClientsSlider;