"use client"

import React from 'react';
import Link from 'next/link';
import Navbar from '@/layout/navbar';
import { Footer } from '@/layout/footer';
import { blogPosts } from '@/assets/data';
import { ArrowBigUpDash } from 'lucide-react';


export default function Home() {
    return (
        <>
            <Navbar />
            <section className="flex flex-col items-center justify-between my-6 md:m-6 lg:m-6 bg-gradient-to-b from-[#fdfbfb] to-[#ebedee] rounded-[2.5rem] md:p-10 lg:p-10">
                <h1 className="text-[1.7rem] md:text-[4rem] lg:text-[4rem] text-center font-bold text-[#3C3D37] mb-6 mx-2">
                    Bazario Insights: Trends, Tips, and Tales
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 row-span-1 gap-6 p-6">
                    {blogPosts.map((blog) => (
                        <div
                            key={blog.id}
                            className="bg-[#EFF3EA] shadow-slate-900 shadow-2xl flex flex-col maxHeight-[18rem] justify-between "
                        >
                            <img
                                src={blog.image}
                                alt="blog post"
                                className="h-[20rem] object-cover mb-4 "
                            />
                            <div className="flex flex-col flex-grow p-4">
                                <h2 className="text-[1.15rem] md:text-[1.65rem] lg:text-[1.65rem] font-bold text-gray-700 mb-4">
                                    {blog.title}
                                </h2>
                                <h4 className="text-[0.8rem] md:text-[1rem] lg:text-[1rem] font-medium text-[#4C585B] font-manrope">
                                    <span className="text-[#1B1833] font-semibold">Date : </span>
                                    {blog.date}
                                </h4>
                                <h4 className="text-[0.9rem] md:text-[1rem] lg:text-[1rem] font-semibold text-[#4B4376] font-manrope mb-4">
                                    <span className="text-[#1B1833] font-semibold">Author : </span>
                                    {blog.author}
                                </h4>

                                <div className='flex items-center gap-2'>
                                    {blog.tags.length > 0 && (
                                        <div className='flex flex-wrap items-center gap-2'>
                                            {blog.tags.map((tag, index) => (
                                                <span key={index} className="bg-[#CBD6D8] text-[#3C3D37] rounded-md px-[0.6rem] py-1 text-[0.85rem] font-bold">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="flex-grow flex justify-end items-end mt-4">
                                    <Link
                                        href={`/blogs/${blog.id}`}
                                        className="bg-[#FFDAB3] font-semibold rounded w-full h-10 flex justify-center items-center cursor-pointer hover:shadow-2xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                                    >
                                        Read More
                                    </Link>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </section>
            <button id="scrollToTopButton" className="bg-[#3C3D37] rounded-full w-12 h-12 flex justify-center items-center fixed bottom-10 right-10 cursor-pointer hover:shadow-2xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                <ArrowBigUpDash size="28" className="text-white" />
            </button>
            <Footer />
        </>
    );
}