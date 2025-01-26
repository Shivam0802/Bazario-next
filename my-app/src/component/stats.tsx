// components/Stats.js
import React from 'react';
import { Backpack, PackageSearch, UserRound, LocateFixed } from 'lucide-react';

const Stats = () => {
   const stats = [
      { number: 232, label: 'Sellers', logo: () => <Backpack className="w-8 h-8 md:w-10 lg:w-10 md:h-10 lg:h-10 text-normal text-orange-600/40" /> },
      { number: 521, label: 'Products', logo: () => <PackageSearch className="w-8 h-8 md:w-10 lg:w-10 md:h-10 lg:h-10 text-normal text-orange-600/40" /> },
      { number: 1463, label: 'Customers', logo: () => <UserRound className="w-8 h-8 md:w-10 lg:w-10 md:h-10 lg:h-10 text-normal text-orange-600/40" /> },
      { number: 100, label: 'Cities', logo: () => <LocateFixed className="w-8 h-8 md:w-10 lg:w-10 md:h-10 lg:h-10 text-normal text-orange-600/40" /> },
   ];

   return (
      <div className="md:px-[30rem] lg:px-[30rem] w-full">
         <div className="px-4">
            <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-4 md:gap-10 lg:gap-10 gap-2">
               {stats.map((stat, index) => (
                  <div key={index} className="relative bg-white/30 md:p-6 lg:p-6 rounded-lg shadow-lg text-center pt-[1.5rem] md:pt-16 lg:pt-16">
                     <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white/50 p-2 md:p-4 lg:p-4 rounded-full">
                        <stat.logo />
                     </div>
                     <div className="text-[1.25rem] md:text-4xl lg:text-4xl font-semibold text-yellow-600/60 leading-5">{stat.number}+</div>
                     <div className="mt-2 font-normal text-gray-700">{stat.label}</div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};

export default Stats;