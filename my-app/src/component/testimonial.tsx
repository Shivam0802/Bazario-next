"use client";

import { useState, useRef, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import { Transition } from "@headlessui/react";

interface Testimonial {
  image: string | StaticImageData;
  review: string;
  name: string;
  role: string;
  place: string;
}

export default function FancyTestimonialsSlider({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number>(0);
  const [autorotate, setAutorotate] = useState<boolean>(true);
  const autorotateTiming: number = 7000;

  useEffect(() => {
    if (!autorotate) return;
    const interval = setInterval(() => {
      setActive(
        active + 1 === testimonials.length ? 0 : (active) => active + 1,
      );
    }, autorotateTiming);
    return () => clearInterval(interval);
  }, [active, autorotate]);

  const heightFix = () => {
    if (testimonialsRef.current && testimonialsRef.current.parentElement)
      testimonialsRef.current.parentElement.style.height = `${testimonialsRef.current.clientHeight}px`;
  };

  useEffect(() => {
    heightFix();
  }, []);

  return (
    <div className="text-center md:w-full md:max-w-[800px] lg:w-full lg:max-w-[800px]">
      {/* Testimonial image */}
      <div className="relative h-32">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[350px] -translate-x-1/2 before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-gradient-to-b before:from-orange-500/25 before:via-orange-500/5 before:via-25% before:to-orange-500/0 before:to-75%">
          <div className="h-32 [mask-image:_linear-gradient(0deg,transparent,theme(colors.white)_20%,theme(colors.white))]">
            {testimonials.map((testimonial, index) => (
              <Transition
                as="div"
                key={index}
                show={active === index}
                className="absolute inset-0 -z-10 h-full"
                enter="transition ease-[cubic-bezier(0.68,-0.3,0.32,1)] duration-700 order-first"
                enterFrom="opacity-0 -rotate-[60deg]"
                enterTo="opacity-100 rotate-0"
                leave="transition ease-[cubic-bezier(0.68,-0.3,0.32,1)] duration-700"
                leaveFrom="opacity-100 rotate-0"
                leaveTo="opacity-0 rotate-[60deg]"
                beforeEnter={() => heightFix()}
              >
                <Image
                  className="relative left-1/2 top-11 -translate-x-1/2 rounded-full"
                  src={testimonial.image}
                  width={72}
                  height={72}
                  alt={testimonial.name}
                />
              </Transition>
            ))}
          </div>
        </div>
      </div>
      {/* Text */}
      <div className="mb-9 transition-all delay-300 duration-150 ease-in-out">
        <div className="relative flex flex-col" ref={testimonialsRef}>
          {testimonials.map((testimonial, index) => (
            <Transition
              key={index}
              show={active === index}
              enter="transition ease-in-out duration-500 delay-200 order-first"
              enterFrom="opacity-0 -translate-x-4"
              enterTo="opacity-100 translate-x-0"
              leave="transition ease-out duration-300 delay-300 absolute"
              leaveFrom="opacity-100 translate-x-0"
              leaveTo="opacity-0 translate-x-4"
              beforeEnter={() => heightFix()}
            >
              <div className="text-[1.10rem] font-medium text-slate-800">
                {testimonial.review}
              </div>
            </Transition>
          ))}
        </div>
      </div>
      {/* Buttons */}
      <div className="-m-1.5 flex flex-wrap justify-center">
        {testimonials.map((testimonial, index) => (
          <button
            key={index}
            className={`m-1.5 inline-flex justify-center whitespace-nowrap rounded-full px-3 py-1.5 text-[0.9rem] font-medium shadow-sm transition-colors duration-150 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 ${active === index ? "bg-[#ffe5c9d9] text-gray-900 shadow-indigo-950/10" : "bg-white text-slate-900 hover:bg-[#ffe5c9d9]"}`}
            onClick={() => {
              setActive(index);
              setAutorotate(false);
            }}
          >
            <span>{testimonial.name}</span>{" "}
            <span
              className={`${active === index ? "text-indigo-500" : "text-slate-600"}`}
            >
              -
            </span>{" "}
            <span>{testimonial.place}</span>
          </button>
        ))}
      </div>
    </div>
  );
}