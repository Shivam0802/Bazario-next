import React from 'react';

const Chatbot = () => {
  return (
    <>
      <div className="group relative flex justify-center items-center text-zinc-900 text-sm font-bold ">
        <div className="shadow-md flex items-center group-hover:gap-2 bg-gradient-to-r from-orange-200 to-yellow-100 p-3 rounded-full cursor-pointer duration-300">
          <img src="/robot.svg" alt="chatbot" className="w-8 h-8" />
          <span className="text-[0px] group-hover:text-sm font-medium duration-300">Ask Bazario AI</span>
        </div>
      </div>
    </>
  );
};

export default Chatbot;