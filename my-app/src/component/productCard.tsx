import React from 'react';
import Link from 'next/link';
import { Expand } from 'lucide-react';

export default function ProductCard({ product }: { product: { id: number; title: string; description: string; category: string; price: number; image: string; rating: { rate: number; count: number } } }) {

    return (
        <>
            <Link href={`/products/${product.id}`} className="bg-[#fff0dfd9] flex flex-col gap-1 rounded-2xl cursor-pointer hover:shadow-2xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300">
                <div className="relative h-[15rem] md:h-[12rem] lg:h-[15rem] bg-gray-50 rounded-t-2xl group">
                    <img className="h-full w-full object-contain rounded-t-2xl" src={product.image} alt="product" />
                </div>
                <div className="flex flex-col justify-between h-[11rem] md:h-[8rem] lg:h-[10rem] px-3 pt-1 pb-2">
                    <div className='flex flex-col gap-1'>
                        <div className="flex flex-row justify-between items-start">
                            <div className="hidden md:flex lg:flex flex-col">
                                <span className="text-md md:text-md lg:text-[1.15rem] font-bold">
                                    {product.title.slice(0, 20)}
                                </span>
                            </div>

                            <div className=" flex flex-col md:hidden lg:hidden">
                                <span className="text-md md:text-md lg:text-[1.15rem] font-bold">
                                    {product.title.slice(0, 15)}
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-row">
                            <span className="text-sm md:text-xs lg:text-[0.9rem] text-gray-500"><strong className='font-semibold'>Category: </strong>{product.category}</span>
                        </div>
                        <div className="flex flex-row items-center justify-between mt-1">
                            <h2 className="flex flex-col items-start text-sm md:text-xs lg:text-base text-gray-500">
                                <strong className='font-semibold mr-2 text-[0.9rem]'>Rating: </strong>
                                <div className='flex flex-row'>
                                {product.rating && product.rating.rate === 0 ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="#CA7373" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star">
                                        <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                                    </svg>
                                ) : (
                                    Array.from({ length: Math.round(product.rating?.rate || 0) }, (_, i) => (
                                        <svg key={i} xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="#CA7373" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star">
                                            <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                                        </svg>
                                    ))
                                )}
                                </div>
                            </h2>
                            <span className="h-fit bg-blue-100 text-blue-800 font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3 text-xs md:text-[0.75rem] lg:text-sm">
                                {product.rating?.count} reviews
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between items-center gap-4">
                        <span className="font-extrabold text-green-900 text-lg md:text-md lg:text-[1.2rem]"> ${product.price} </span>
                        <div className="group relative flex justify-center items-center text-zinc-900 text-sm font-bold">
                            <div className="shadow-md flex items-center group-hover:gap-2 bg-[#FFDAB3] p-3 rounded-full cursor-pointer duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-baggage-claim"><path d="M22 18H6a2 2 0 0 1-2-2V7a2 2 0 0 0-2-2"/><path d="M17 14V4a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v10"/><rect width="13" height="8" x="8" y="6" rx="1"/><circle cx="18" cy="20" r="2"/><circle cx="9" cy="20" r="2"/></svg>
                                <span className="text-[0px] group-hover:text-xs md:group-hover:text-sm font-semibold duration-300">Add to Cart</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    );
};
