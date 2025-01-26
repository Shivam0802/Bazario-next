"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';

const DealOfTheDay = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
   const targetDate = new Date().getTime() + 48 * 60 * 60 * 1000; 
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  return (
    <div className="bg-white shadow-slate-800 shadow-2xl rounded-lg p-6 md:w-[65%] lg:w-[65%] md:h-[30rem] lg:h-[30rem] mx-4 my-4 md:mx-0 lg:mx-0 md:my-0 lg:my-0">
      <div className="flex flex-col md:flex-row lg:flex-row gap-2">
        <div className="w-full md:w-1/3 lg:w-1/3 md:h-full lg:h-full">
          <img src="/Product/dealoftheday.webp" alt="deal of the day" className="w-full h-full object-cover rounded-lg" />
        </div>
        <div className="md:w-2/3 lg:w-2/3 pl-4">
          <div className="flex items-center mb-2">
            <span className="text-yellow-500 mr-2 text-[1.12rem]">★★★★☆</span>
          </div>
          <h3 className="text-xl font-semibold">
            Shampoo, Conditioner & Facewash Packs
          </h3>
          <p className="text-gray-600 text-sm mb-2">
            Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor
          </p>
          <div className="text-[#9F8383] text-2xl font-bold mb-2 mt-8 flex items-center gap-6">
            $150.00 <span className="line-through text-gray-500">$200.00</span>
          </div>
          <button className="bg-[#FFDAB3] text-gray-800 font-medium px-6 py-2 rounded mt-4 hover:bg-[#ecaf6f]">Add to Cart</button>
          <div className="mt-6">
            <div className="flex items-center justify-between mx-2 font-medium text-gray-600 text-[1rem]">
            <p className='text-[#8EB486]'><strong className='text-gray-700'>Already Sold:</strong> 10</p>
            <p className='text-[#8EB486]'><strong className='text-gray-700'>Available:</strong> 40</p>
            </div>
            <div className="bg-gray-200 rounded-full h-1 mt-2">
                <div className="bg-red-500 h-1 rounded-full" style={{width: `${(10 / 40) * 100}%`}}></div>
            </div>
          </div>
          <div className="mt-8">
            <p className="font-semibold mb-3">Hurry up! Offer ends in:</p>
            <div className="flex space-x-4 text-center mt-2">
              <div className='bg-[#F9F6E6] w-16 h-16 rounded-lg flex flex-col items-center justify-center'>
                <p className="text-lg font-bold">{timeLeft.days}</p>
                <p className="text-sm font-medium">Days</p>
              </div>
              <div className='bg-[#F9F6E6] w-16 h-16 rounded-lg flex flex-col items-center justify-center'>
                <p className="text-lg font-bold">{timeLeft.hours}</p>
                <p className="text-sm font-medium">Hours</p>
              </div>
              <div className='bg-[#F9F6E6] w-16 h-16 rounded-lg flex flex-col items-center justify-center'>
                <p className="text-lg font-bold">{timeLeft.minutes}</p>
                <p className="text-sm font-medium">Min</p>
              </div>
              <div className='bg-[#F9F6E6] w-16 h-16 rounded-lg flex flex-col items-center justify-center'>
                <p className="text-lg font-bold">{timeLeft.seconds}</p>
                <p className="text-sm font-medium">Sec</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealOfTheDay;
