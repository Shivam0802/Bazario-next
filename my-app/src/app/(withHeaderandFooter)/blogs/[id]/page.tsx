"use client"

import React from "react";
import { useParams } from "next/navigation";
import Navbar from "@/layout/navbar";
import { Footer } from "@/layout/footer";
import { blogPosts } from "@/assets/data";

export default function Blog() {

   const { id } = useParams();
   const filteredPost = blogPosts.filter(post => post.id === Number(id));

   return (
      <>
         <Navbar />
         <section className="flex flex-col items-center justify-center">
            {filteredPost.length > 0 ? (
               filteredPost.map((post, index) => (
                  <div key={post.id} className="w-full px-3 md:px-40 lg:px-40 py-10 md:py-28 lg:py-28 m-4 flex flex-col md:flex-row lg:flex-row items-start gap-4">
                     <img src={post.image} alt={post.title} className="md:w-[40%] lg:w-[40%] h-auto object-contain shadow-slate-900 shadow-2xl rounded-[1.5rem] mt-16" />
                     <div className="px-6 flex flex-col justify-between flex-grow md:w-[80%] lg:w-[60%]">
                        <h2 className="text-[2rem] md:text-[3.75rem] lg:text-[3.75rem] font-bold text-gray-800 mb-2 mt-8 md:mt-0 lg:mt-0">{post.title}</h2>
                        <div className="text-[0.9rem] text-gray-500 flex items-center gap-2 mb-4">
                           <span>By <span className="font-medium text-gray-700">{post.author}</span></span>
                           <span>|</span>
                           <span>{new Date(post.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-6 flex-wrap">
                           {post.tags.map((tag, idx) => (
                              <span
                                 key={idx}
                                 className="bg-gray-200 text-gray-700 font-bold px-2 py-1 rounded-[0.5rem] text-[0.75rem]"
                              >
                                 {tag}
                              </span>
                           ))}
                        </div>
                        <p className="text-[1rem] md:text-[1.15rem] lg:text-[1.15rem] text-gray-700 leading-6 mb-4 text-justify first-letter:text-7xl first-letter:font-medium first-letter:text-[#7C444F] first-letter:mr-2 first-letter:float-left">
                           {post.content.map((content: string, idx: number) => (
                              <span key={idx}>
                                 {content}
                                 <br />
                                 <br />
                              </span>
                           ))}
                        </p>
                        <p className="text-gray-600">{post.Conclusion}</p>
                     </div>
                  </div>
               ))
            ) : (
               <p>No blog post found.</p>
            )}
         </section>
         <Footer />
      </>
   );
};