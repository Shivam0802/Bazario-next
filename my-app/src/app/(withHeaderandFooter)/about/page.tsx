"use client"

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/layout/navbar";
import { Footer } from "@/layout/footer";
import { ChevronRight, ChevronLeft, ArrowBigUpDash } from 'lucide-react';
import Team from "@/component/team";
import { sustainableBlogs, testimonials } from "@/assets/data";
import Testimonial from "@/component/testimonial";
import Stats from "@/component/stats";
import Client from "@/component/client";


export default function Home() {

   const [currentIndex, setCurrentIndex] = useState(0);
   const handleNext = () => {
      if (currentIndex < sustainableBlogs.length - 1) {
         setCurrentIndex(currentIndex + 1);
      }
   };

   const handlePrev = () => {
      if (currentIndex > 0) {
         setCurrentIndex(currentIndex - 1);
      }
   };

   const scrollToTopButton = document.getElementById('scrollToTopButton');
   if (scrollToTopButton) {
      window.addEventListener('scroll', () => {
         if (window.scrollY > 200) {
            scrollToTopButton.classList.remove('opacity-0');
            scrollToTopButton.classList.add('opacity-100');
         } else {
            scrollToTopButton.classList.remove('opacity-100');
            scrollToTopButton.classList.add('opacity-0');
         }
      });
   }

   return (
      <>
         <Navbar />
         <section className="flex flex-col md:flex-row lg:flex-row items-center justify-between m-6 bg-gradient-to-b from-[#fdfbfb] to-[#ebedee] rounded-[2.5rem] md:p-10 lg:p-10">
            <div className="flex flex-col my-5 md:w-[50%] lg:w-[50%] md:mx-20 lg:mx-20">
               <h1 className="text-[2.5rem] md:text-[4.5rem] px-2 md:px-0 lg:px-0 lg:text-[4.5rem] font-bold text-start text-justify text-[#3C3D37]">
                  The Bazario Group
               </h1>
               <p className="text-md font-medium text-justify text-slate-900 pr-3 pl-3 md:my-4 lg:my-4 md:pr-10 lg:pr-10 md:pl-2 lg:pl-2 leading-5 mt-4 md:mt-0 lg:mt-0">
                  Bazario is poised to become a cornerstone of India's digital commerce landscape. Launched on January 1, 2025, Bazario aims to revolutionize online shopping by providing a seamless and accessible platform for both sellers and customers.
                  <br />
                  <br />
                  With a vision to empower local businesses and entrepreneurs, Bazario offers a diverse marketplace featuring millions of products across numerous categories. In just a short span, Bazario has attracted thousands of sellers, creating a vibrant and dynamic ecosystem.
                  <br />
                  <br />
                  Bazario's innovative services, such as Instant Delivery, Flexible Payment Options, and Hassle-free Returns, ensure a superior shopping experience for all users. Our commitment to technology and customer satisfaction drives us to continually enhance our platform, making it easier and more affordable for everyone to shop online. Bazario is not just a marketplace; it is a movement towards a more connected and prosperous future for all Indians.
               </p>
            </div>
            <img src="/about.webp" alt="about" className="md:w-[40%] lg:w-[40%] md:mr-20 lg:mr-20" />
         </section>
         <section className="flex flex-col items-center justify-between m-6 bg-gradient-to-t from-[#fdfbfb] to-[#ebedee] rounded-[2.5rem] p-3 md:p-10 lg:p-10">
            <h1 className="text-[2rem] md:text-[4rem] lg:text-[4rem] font-bold text-start text-[#1E201E] mt-6 md:mt-0 lg:mt-0">
               Ethics and Compliance
            </h1>
            <img src="/ethics.webp" alt="about" className="md:w-[60%] lg:w-[60%] mt-4 md:mt-10 lg:mt-10 rounded-[2rem] shadow-slate-900 shadow-lg md:shadow-2xl lg:shadow-2xl" />
            <h2 className="text-[1.7rem] md:text-[2.5rem] lg:text-[2.5rem] uppercase font-semibold text-start text-justify text-[#251E1E] mt-12">
               Our Values
            </h2>
            <p className="text-[1rem] md:text-lg lg:text-lg font-medium text-justify text-slate-900 my-4 md:mx-52 lg:mx-52 leading-5">
               At Bazario, we are committed to upholding the highest standards of ethics and compliance. Our core values guide our actions and decisions, ensuring that we operate with integrity, transparency, and respect for all stakeholders.
               <br />
               <br />
               We believe in fostering a culture of trust and accountability, where every employee is empowered to speak up and raise concerns. Our commitment to ethical conduct extends to our relationships with customers, partners, and the communities we serve. We strive to create a safe and inclusive environment for all, promoting diversity, equity, and inclusion in everything we do.
            </p>
         </section>
         <section className="flex flex-col md:flex-row lg:flex-row items-center justify-between m-6 bg-gradient-to-b from-[#fdfbfb] to-[#ebedee] rounded-[2.5rem] p-3 md:p-10 lg:p-10">
            <img src="/innovation.webp" alt="about" className="md:w-[40%] lg:w-[40%] md:ml-16 lg:ml-16" />
            <div className="flex flex-col my-5 md:w-[50%] lg:w-[50%] md:mx-20 lg:mx-20">
               <h2 className="text-[1.15rem] md:text-[2rem] lg:text-[2rem] uppercase font-normal text-start text-justify text-[#5E686D]">
                  Technology at Bazario
               </h2>
               <h1 className="text-[2rem] md:text-[4rem] lg:text-[4rem] font-semibold text-start text-justify text-[#3C3D37]">
                  Innovation at the Core
               </h1>

               <p className="text-[1rem] md:text-md lg:text-lg font-medium text-justify text-slate-900 my-4 pr-3 md:pr-10 lg:pr-10 pl-2 leading-5">
                  At Bazario, we believe in the power of technology to transform lives and businesses. Our commitment to innovation is evident in every aspect of our platform, from the user interface to the backend infrastructure.
               </p>

               <Link href="/blog" className="bg-[#ffe5c9d9] text-gray-900 text-center font-semibold md:text-[1.15rem] lg:text-[1.15rem] uppercase py-3 px-4 rounded-md mt-4 md:mt-10 lg:mt-10 md:w-[60%] lg:w-[60%] hover:bg-[#FFDAB3]">
                  Read the latest tech blog posts
               </Link>
            </div>
         </section>
         <section className="flex flex-col items-center justify-between m-6 bg-gradient-to-t from-[#fdfbfb] to-[#ebedee] rounded-[2.5rem] p-3 md:p-10 lg:p-10">
            <div className="flex flex-col md:flex-row lg:flex-row items-center justify-between w-full">
               <div className="flex flex-col my-5 md:w-[50%] lg:w-[50%] md:mx-20 lg:mx-20">
                  <h2 className="text-[1.2rem] md:text-[2rem] lg:text-[2rem] uppercase font-medium text-start text-justify text-[#5E686D]">
                     Our Mission
                  </h2>
                  <h1 className="text-[2.45rem] md:text-[4rem] lg:text-[4rem] font-bold text-start text-justify text-[#3C3D37]">
                     Sustainablity
                  </h1>

                  <p className="text-md font-medium text-justify text-slate-900 my-4 pr-2 md:pr-10 lg:pr-10 pl-2 leading-5">
                     At Bazario, we are committed to harnessing the power of our platform for the benefit of both people and the planet. Our mission is to integrate sustainability into every facet of our business while creating value for the Indian consumer. As a new entrant in the e-commerce space, we are dedicated to embedding sustainable practices across our operations, striving for long-term impact through innovation and collaboration.
                     <br />
                     <br />
                     By forming impactful partnerships with communities, civil society organizations, and industry coalitions, we aim to drive positive change, encourage cross-learning, and contribute to a sustainable future for everyone.
                     <br />
                     <br />
                     We understand that this journey will be challenging, but we believe in fostering a culture of sustainability, bringing together all stakeholders to make a meaningful difference. At Bazario, we are not just building a marketplace—we are building a movement toward a greener and more sustainable tomorrow.
                  </p>
               </div>
               <img src="/sustainablity.webp" alt="about" className="md:w-[40%] lg:w-[40%] md:mr-20 lg:mr-20 rounded-[2rem] shadow-slate-800 shadow-2xl" />
            </div>
            <div className="flex flex-col items-center justify-between w-full mt-16">
               <h1 className="text-[2rem] md:text-[4rem] lg:text-[4rem] font-semibold text-start text-justify text-[#3C3D37]">
                  Together for the Future
               </h1>
               <div className="relative w-full md:p-6 lg:p-6 md:max-w-[75rem] lg:max-w-[75rem] md:mx-40 lg:mx-40 md:mt-10 lg:mt-10 md:mb-6 lg:mb-6">
                  <div className="flex flex-col md:flex-row lg:flex-row w-full bg-white">
                     <div className="flex flex-col justify-between gap-[0.8rem] h-auto w-full md:w-[100%] py-8 px-4 md:pl-20 lg:pl-20 md:pr-24 lg:pr-24 bg-white">
                        <div className="flex flex-col justify-start">
                           <h3 className="text-[1.5rem] md:text-[2.8rem] lg:text-[2.8rem] font-medium text-gray-800 mb-4 text-left leading-tight">
                              {sustainableBlogs[currentIndex].title}
                           </h3>
                           <p className="text-md text-gray-600 mb-4">
                              {sustainableBlogs[currentIndex].date}
                           </p>
                           <a href={sustainableBlogs[currentIndex].link || "#"} className="bg-[#ffe5c9d9] text-gray-900 font-semibold text-[1rem] text-center uppercase py-2 px-3 rounded-md mt-6 w-[40%] hover:bg-[#FFDAB3]">
                              READ MORE
                           </a>
                        </div>
                        <div className="flex gap-4 items-center mt-4">
                           <button onClick={handlePrev} className={`p-1 bg-gray-300 text-gray-800 font-semibold rounded-full hover:bg-gray-400 transition ${currentIndex === 0 && "opacity-50 cursor-not-allowed"}`} disabled={currentIndex === 0}>
                              <ChevronLeft size={36} />
                           </button>
                           <button onClick={handleNext} className={`p-1 bg-gray-300 text-gray-800 font-semibold rounded-full hover:bg-gray-400 transition ${currentIndex === sustainableBlogs.length - 1 && "opacity-50 cursor-not-allowed"}`} disabled={currentIndex === sustainableBlogs.length - 1}>
                              <ChevronRight size={36} />
                           </button>
                        </div>
                     </div>
                     <div className="md:w-full lg:w-full md:w-[40%] lg:w-[40%] flex justify-center items-center">
                        <img src={sustainableBlogs[currentIndex].image} alt={sustainableBlogs[currentIndex].title} className="md:w-[90%] lg:w-[90%] md:h-[28.9rem] lg:h-[28.9rem] object-cover" />
                     </div>
                  </div>

               </div>
            </div>
         </section>

         <section className="flex flex-col items-center justify-between bg-slate-200/30 backdrop-blur-sm">
            <div className="w-full md:h-[20rem] lg:h-[20rem] mt-20 md:mt-10 lg:mt-10 mb-16 md:mb-6 lg:mb-6">
               <div className="w-full h-full flex flex-row items-center justify-evenly">
                  <Stats />
               </div>
            </div>
         </section>


         <section className="flex flex-col md:flex-row lg:flex-row items-start justify-evenly mx-4 md:mx-10 lg:mx-10 my-20 p-3 md:p-10 lg:p-10">
            <div className="flex flex-col my-5 md:w-[40%] lg:w-[40%] mx-2 md:mx-20 lg:mx-20 text-left">
               <h1 className="text-[1.7rem] md:text-[3rem] lg:text-[3rem] font-extrabold text-start text-gray-600 uppercase leading-tight">
                  Testimonial
               </h1>
               <h2 className="text-[1rem] font-semibold text-start text-gray-600 uppercase mt-2">
                  What our customers say about us
               </h2>
               <p className="text-md font-medium text-justify text-slate-900 my-4 pr-2 md:pr-10 lg:pr-10 mt-4 leading-5">
                  At Bazario, we are committed to providing the best shopping experience for our customers.
                  We take pride in our exceptional customer service and strive to exceed expectations with every interaction.
                  <br />
                  <br />
                  <strong>Here's what some of our customers have to say about us:</strong>
               </p>
            </div>
            <Testimonial
               testimonials={testimonials}
            />
         </section>
         <section className="flex flex-col items-center justify-between m-6 bg-gradient-to-b from-[#fdfbfb] to-[#ebedee] rounded-[2.5rem] p-3 md:p-10 lg:p-10">
            <h1 className="text-[2rem] md:text-[4rem] lg:text-[4rem] font-bold text-start text-[#1E201E]">
               Our Team
            </h1>
            <h2 className="md:text-[2rem] lg:text-[2rem] uppercase font-normal text-start text-justify text-[#5E686D] md:mt-6 lg:mt-6">
               Meet the faces behind Bazario
            </h2>
            <div className="flex flex-wrap justify-center gap-4 mt-4 w-full">
               <Team />
            </div>

            <div className="flex flex-col items-center justify-center mt-16">
               <h2 className="text-[1.5rem] font-bold text-center text-[#5E686D] uppercase">
                  Our Team Philosophy
               </h2>
               <p className="md:text-[1.12rem] lg:text-[1.12rem] font-medium text-justify md:text-center lg:text-center text-slate-900 my-4 md:pr-10 lg:pr-10 pl-2 md:mx-56 lg:mx-56 leading-5">
                  At Bazario, we believe in the power of collaboration and diversity. Our team is a reflection of our values, with members from diverse backgrounds and experiences coming together to drive innovation and growth. We foster a culture of respect, trust, and inclusivity, where every team member is valued and empowered to contribute their best. Together, we are building a brighter future for all.
               </p>
            </div>
         </section>

         <Client />
         <button id="scrollToTopButton" className="bg-[#3C3D37] rounded-full w-12 h-12 flex justify-center items-center fixed bottom-10 right-10 z-50 cursor-pointer hover:shadow-2xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <ArrowBigUpDash size="28" className="text-white" />
         </button>
         <Footer />
      </>
   );
}

