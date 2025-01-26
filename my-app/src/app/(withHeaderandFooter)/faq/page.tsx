"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/layout/navbar';
import { Footer } from '@/layout/footer';
import { FAQ } from '@/assets/data';
import { Plus, Minus, ArrowUp, HelpCircle } from 'lucide-react';

const Faq = () => {
    const [accordion, setAccordion] = useState<number | null>(null);
    const [showScrollButton, setShowScrollButton] = useState(false);

    // Handle accordion toggle
    const handleAccordion = (id: number) => {
        setAccordion(prevState => (prevState === id ? null : id));
    };

    // Show/hide scroll-to-top button
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setShowScrollButton(true);
            } else {
                setShowScrollButton(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Scroll to top function
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <Navbar />
            {/* Hero Section */}
            <section className="relative flex flex-col items-center justify-center w-full h-[400px] bg-cover bg-center" style={{ backgroundImage: 'url(/faqpage.webp)' }}>
                <div className="absolute inset-0 bg-black/70"></div>
                <div className="relative z-10 text-center max-w-4xl px-4">
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-lg md:text-xl text-gray-100">
                        Here are some of the most frequently asked questions. If you have any other questions, please feel free to contact us. We are here to help you.
                    </p>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="flex flex-col items-center justify-center w-full bg-gradient-to-t from-[#fdfbfb] to-[#ebedee] py-16 px-4 md:px-8">
                <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden">
                    {FAQ.map((item) => (
                        <div key={item.id} className="border-b border-gray-200 last:border-b-0">
                            <div
                                className="flex items-center justify-between p-6 cursor-pointer hover:bg-gradient-to-r from-orange-50 to-yellow-50 transition-all duration-300"
                                onClick={() => handleAccordion(item.id)}
                            >
                                <div className="flex items-center gap-4">
                                    <HelpCircle className="text-orange-500" size={24} />
                                    <h2 className="text-xl font-semibold text-gray-800">{item.question}</h2>
                                </div>
                                <div className="text-orange-500">
                                    {accordion === item.id ? (
                                        <Minus size={24} className="transform transition-transform duration-200" />
                                    ) : (
                                        <Plus size={24} className="transform transition-transform duration-200" />
                                    )}
                                </div>
                            </div>
                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                    accordion === item.id ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'
                                }`}
                            >
                                <p className="px-6 pb-6 text-lg text-gray-600 ml-12">{item.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Scroll-to-top Button */}
            {showScrollButton && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                >
                    <ArrowUp size={24} className="text-white" />
                </button>
            )}

            <Footer />
        </>
    );
};

export default Faq;