"use client"

import React, { useState } from "react";
import Navbar from "@/layout/navbar";
import { Footer } from "@/layout/footer";
import { PhoneCall, Mails, MapPinHouse, AlarmClock, Plus, Minus, ArrowBigUpDash } from "lucide-react";
import { FAQ } from "@/assets/data";

export default function Home() {

    const [accordian, setAccordian] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const handleAccordion = (id: any) => {
        setAccordian(prevState => (prevState === id ? null : id));
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
            <section className="flex flex-col items-center justify-between m-6 bg-gradient-to-b from-[#fdfbfb] to-[#ebedee] rounded-[2.5rem] p-3 md:p-10 lg:p-10 pb-20">
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-[2rem] md:text-[4rem] lg:text-[4rem] font-bold uppercase letter-spacing-2">Contact Us</h1>
                    <p className="text-[1rem] md:text-lg lg:text-lg font-medium text-gray-900 md:text-center lg:text-center text-justify mt-4 md:mt-10 lg:mt-10 mb-16 md:mx-80 lg:mx-80 leading-5">
                        Get in touch with us for any queries, feedback, or support. We are here to assist you and ensure you have the best experience possible.
                        Feel free to reach out to us through the contact form below, or via the provided phone number and email address. We look forward to hearing from you!
                    </p>
                </div>
                <section className="rounded-[2rem] lg:px-20 w-full flex items-center justify-center">
                    <div className="max-w-[90rem]">
                        <div className="flex lg:flex-row flex-col lg:gap-0 gap-10 shadow-slate-900 shadow-2xl rounded-[2rem]">
                            <div className="bg-gray-50 p-5 lg:p-11 w-full">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.389972775045!2d77.59346031508164!3d12.9715989908577!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae167f0b7d0e1b%3A0x3c7c0c9b3e8c8f4c!2sBangalore%20Palace - 560052!5e0!3m2!1sen!2sin!4v1633663660007!5m2!1sen!2sin"
                                    width="100%"
                                    height="40%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                ></iframe>

                                <div className="flex items-center justify-start mt-10">
                                    <MapPinHouse size={24} className="text-[#3C3D37]" />
                                    <p className="text-[1.15rem] font-semibold text-[#3C3D37] ml-2">Bangalore Palace, Bangalore - 560052</p>
                                </div>
                                <div className="flex items-center justify-start mt-5">
                                    <PhoneCall size={24} className="text-[#3C3D37]" />
                                    <p className="text-[1.15rem] font-semibold text-[#3C3D37] ml-2">
                                        <a href="tel: +91 1234567890" className="text-[#3C3D37]">
                                            +91 1234567890
                                        </a>
                                    </p>
                                </div>
                                <div className="flex items-center justify-start mt-5">
                                    <Mails size={24} className="text-[#3C3D37]" />
                                    <p className="text-[1.15rem] font-semibold text-[#3C3D37] ml-2">
                                        <a href="mailto: abc@yopmail.com" className="text-[#3C3D37]">
                                            abc@yopmail.com
                                        </a>
                                    </p>
                                </div>

                                <div className="flex items-center justify-start mt-5">
                                    <AlarmClock size={24} className="text-[#3C3D37]" />
                                    <p className="text-[1.15rem] font-semibold text-[#3C3D37] ml-2">Mon - Fri: 9:00 AM - 6:00 PM</p>
                                </div>

                                <div className="flex items-center justify-start mt-5">
                                    <ul className="flex justify-center items-center mt-5 gap-4">
                                        <li>
                                            <a className="text-gray-500 hover:text-[#155E95]">
                                                <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
                                                    <path
                                                        clipRule="evenodd"
                                                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                                        fillRule="evenodd"
                                                    ></path>
                                                </svg>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="text-gray-500 hover:text-[#872341]">
                                                <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
                                                    <path
                                                        clip-rule="evenodd"
                                                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                                                        fill-rule="evenodd"
                                                    ></path>
                                                </svg>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="text-gray-500 hover:text-[#6A80B9]" href="" aria-label="Find us on LinkedIn"
                                                target="_blank" rel="noopener">
                                                <svg className="h-8 w-8" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M44.45 0H3.55A3.5 3.5 0 0 0 0 3.46v41.07A3.5 3.5 0 0 0 3.54 48h40.9A3.51 3.51 0 0 0 48 44.54V3.46A3.5 3.5 0 0 0 44.45 0Zm-30.2 40.9H7.11V18h7.12v22.9Zm-3.57-26.03a4.13 4.13 0 1 1-.02-8.26 4.13 4.13 0 0 1 .02 8.26ZM40.9 40.9H33.8V29.77c0-2.66-.05-6.08-3.7-6.08-3.7 0-4.27 2.9-4.27 5.89V40.9h-7.1V18h6.82v3.12h.1c.94-1.8 3.26-3.7 6.72-3.7 7.21 0 8.54 4.74 8.54 10.91V40.9Z"
                                                        fill="currentColor"></path>
                                                </svg>

                                            </a>
                                        </li>
                                        <li>
                                            <a className="text-gray-500 hover:text-[#16404D]">
                                                <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
                                                    <path
                                                        d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
                                                    ></path>
                                                </svg>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="text-gray-500 hover:text-orange-600" aria-label="Visit TrendyMinds YouTube" href="" target="_blank"><svg
                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="h-8">
                                                <path fill="currentColor"
                                                    d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z">
                                                </path>
                                            </svg>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="text-gray-500 hover:text-[#118B50]">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" className="w-8 h-8">
                                                    <path d="M16 0C7.163 0 0 7.163 0 16c0 2.863.748 5.577 2.054 7.952L0 32l8.414-2.043A15.915 15.915 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm8.543 23.357c-.369.998-2.163 1.896-2.956 1.896-.793 0-1.55-.24-2.185-.535-2.957-1.336-4.825-3.068-6.735-5.456-1.565-1.935-2.718-4.154-3.204-6.572-.364-1.775.426-3.692 2.025-4.583.551-.3.924-.44 1.482-.44.557 0 1.005.074 1.457.148.452.074 1.045-.26 1.312.517.426 1.217 1.01 2.377 1.826 3.404.573.718.011 1.152-.39 1.52-.613.553-1.06.822-.555 1.612.801 1.268 1.716 2.233 2.857 3.166.55.442 1.093.893 1.805.569.726-.336 1.229-.963 1.877-1.37.622-.392 1.31-.25 1.7.36.615.974 1.036 2.06 1.126 3.245.075 1.022-.406 1.658-1.12 2.392z" />
                                                </svg>

                                            </a>
                                        </li>
                                    </ul>

                                </div>
                            </div>
                            <div className="bg-gray-50 px-3 py-5 lg:p-11 w-full">
                                <h2 className="text-[#3C3D37] text-[1.5rem] md:text-[2.5rem] lg:text-[2.5rem] font-semibold leading-10 mb-11 ml-6">
                                    Contact Us Now !
                                </h2>
                                <form className="px-1 grid items-center">
                                    <div className="grid gap-1" id="form">
                                        <div className="relative mb-6">
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                className="peer block w-full border-2 border-gray-300 bg-transparent px-3 pt-[1.5rem] pb-1 text-[1rem] text-gray-900 font-medium focus:border-[#f0a75b] focus:outline-none"
                                            />
                                            <label
                                                htmlFor="name"
                                                className="absolute left-3 top-2 text-[0.8rem] text-gray-700 font-semibold uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:text-gray-600"
                                            >
                                                Your Name
                                            </label>
                                        </div>

                                        <div className="flex flex-col md:flex-row lg:flex-row space-x-0 md:space-x-4 lg:space-x-4">
                                            <div className="relative mb-6 w-full md:w-2/3 lg:w-2/3">
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    className="peer block w-full border-2 border-gray-300 bg-transparent px-3 pt-[1.5rem] pb-1 text-[1rem] text-gray-900 font-medium focus:border-[#f0a75b] focus:outline-none"
                                                />
                                                <label
                                                    htmlFor="email"
                                                    className="absolute left-3 top-2 text-[0.8rem] text-gray-700 font-semibold uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:text-gray-600"
                                                >
                                                    Your Email
                                                </label>
                                            </div>

                                            <div className="relative mb-6 md:w-1/2 lg:w-1/2">
                                                <input
                                                    type="tel"
                                                    id="phone"
                                                    name="phone"
                                                    className="peer block w-full border-2 border-gray-300 bg-transparent px-3 pt-[1.5rem] pb-1 text-[1rem] text-gray-900 font-medium focus:border-[#f0a75b] focus:outline-none"
                                                    maxLength={12}
                                                    value={formData.phone}
                                                    onChange={(e) => {
                                                        const formattedPhoneNumber = e.target.value
                                                            .replace(/\D/g, '')
                                                            .replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
                                                        setFormData({ ...formData, phone: formattedPhoneNumber });
                                                    }}
                                                />
                                                <label
                                                    htmlFor="phone"
                                                    className="absolute left-3 top-2 text-[0.8rem] text-gray-700 font-semibold uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:text-gray-600"
                                                >
                                                    Phone
                                                </label>
                                            </div>
                                        </div>

                                        <div className="relative mb-6">
                                            <textarea
                                                id="address"
                                                name="address"
                                                rows={3}
                                                className="peer block w-full border-2 border-gray-300 bg-transparent px-3 pt-[1.5rem] pb-2 text-[1rem] text-gray-900 font-medium focus:border-[#f0a75b] focus:outline-none"
                                            ></textarea>
                                            <label
                                                htmlFor="address"
                                                className="absolute left-3 top-2 text-[0.8rem] text-gray-700 font-semibold uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:text-gray-600"
                                            >
                                                Write your message here . . .
                                            </label>
                                        </div>

                                        <button className="relative px-10 py-3.5 overflow-hidden group bg-gradient-to-r from-gray-700 to-black relative hover:bg-gradient-to-r hover:from-gray-600 hover:to-black text-white transition-all ease-out duration-300">
                                            <span className="absolute right-0 w-10 h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-36 ease"></span>
                                            <span className="relative text-[1.25rem] font-medium uppercase tracking-widest">Submit</span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section >
            </section >
            <section className="flex flex-col md:flex-row lg:flex-row items-center justify-between m-6 bg-gradient-to-r from-[#f4f4f4] via-[#f4f4f4] to-[#ebedee] rounded-[2.5rem] p-3 md:p-10 lg:p-10 pb-20">
                <img src="/faq.webp" alt="FAQ" className="md:w-[40%] lg:w-[40%] h-auto" />
                <div className="flex flex-col items-center justify-around w-full">
                    <h1 className="text-[1.7rem] md:text-[4rem] lg:text-[4rem] font-bold ">Frequently asked question</h1>
                    <p className="text-lg font-normal text-gray-900 text-center mt-4 md:mt-10 lg:mt-10 mb-16 md:mx-40 lg:mx-40 leading-5">
                        Here are some of the most frequently asked questions.
                    </p>
                    <div className="flex flex-col items-center justify-center md:w-[90%] lg:w-[90%] md:pl-20 lg:pl-20">
                        {
                            FAQ.slice(0, 5).map((item) => (
                                <div key={item.id} className="flex flex-col items-start justify-center w-full bg-white shadow-slate-900 shadow-2xl mb-5">
                                    <div className="flex items-center justify-between w-full py-3 px-5">
                                        <h1 className="md:text-[1.25rem] lg:text-[1.25rem] font-semibold text-[#3C3D37] pl-2">{item.question}</h1>
                                        {
                                            accordian === item.id ? <Minus color="#3C3D37" size={24} onClick={() => handleAccordion(item.id)} className="cursor-pointer" /> : <Plus color="#3C3D37" size={24} onClick={() => handleAccordion(item.id)} className="cursor-pointer" />
                                        }
                                    </div>
                                    <div className={`bg-gradient-to-t from-[#fdfbfb] to-[#ebedee] transition-all duration-300 ease-in-out overflow-hidden ${accordian === item.id ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                        <p className="text-[0.9rem] md:text-[1rem] lg:text-[1.10rem] text-justify font-medium text-[#3C3D37] pl-2 pb-2 mx-6 mt-2 md:m-4 lg:m-4 leading-4 md:leading-6 lg:leading-6">{item.answer}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>
            <button id="scrollToTopButton" className="bg-[#3C3D37] rounded-full w-12 h-12 flex justify-center items-center fixed bottom-10 right-10 cursor-pointer hover:shadow-2xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                <ArrowBigUpDash size="28" className="text-white" />
            </button>
            <Footer />
        </>
    );
};
