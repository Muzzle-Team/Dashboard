"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.7,
        ease: "easeOut",
      }}
      className={`fixed z-50 top-6 left-1/2  -translate-x-1/2 rounded-xl transition-all duration-500  
        px-3 sm:px-4 md:px-6 py-2
        ${scrolled ? "backdrop-blur-md bg-indigo-400/20 shadow-lg" : "bg-transparent"}
        ${scrolled ? "w-[90%] sm:w-[85%] md:w-[75%] lg:w-[60%]" : "w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%]"}
      `}
    >

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 relative  ">
          {/* صورة Wumpus فوق النص */}
          <img
            src="/assets/wump.webp"
            alt="Wumpus"
            width={50}
            className="absolute -top-6 left-[1/2] translate-x-[2.9rem] select-none pointer-events-none"
            draggable="false"
          />

          {/* اللوجو */}
          <img
            src="/assets/logo2.png"
            alt="Bot Logo"
            draggable={false}
            className="rounded-md w-8 h-8 sm:w-9 sm:h-9 object-cover select-none"
          />

          {/* الاسم */}
          <span className="text-white font-bold">Muzzle Bot</span>
        </div>


        <div className="hidden md:flex items-center gap-8 text-white">
          <div className="flex space-x-2 hover:bg-indigo-600/50 cursor-pointer p-1 rounded-md duration-300 transition-all">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"

            >
              <path
                fill="none"
                stroke="#4f39f6"
                strokeWidth={2}
                d="M9.3 17.85a3.15 3.15 0 1 1-3.15-3.15h11.7a3.15 3.15 0 1 1-3.15 3.15V6.15a3.15 3.15 0 1 1 3.15 3.15H6.15A3.15 3.15 0 1 1 9.3 6.15z"
              ></path>
            </svg>
            <span className="mt-0.5">Commands</span>
          </div>

          <div className="flex space-x-2 hover:bg-indigo-600/50 cursor-pointer p-1 rounded-md duration-300 transition-all">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
            >
              <path
                fill="#4f39f6"
                d="m17.967 6.558l-1.83-1.83c-1.546-1.545-2.318-2.318-3.321-2.605c-1.003-.288-2.068-.042-4.197.45l-1.228.283c-1.792.413-2.688.62-3.302 1.233S3.27 5.6 2.856 7.391l-.284 1.228c-.491 2.13-.737 3.194-.45 4.197c.288 1.003 1.061 1.775 2.606 3.32l1.83 1.83C9.248 20.657 10.592 22 12.262 22c1.671 0 3.015-1.344 5.704-4.033c2.69-2.69 4.034-4.034 4.034-5.705c0-1.67-1.344-3.015-4.033-5.704"
                opacity={0.5}
              ></path>
              <path
                fill="currentColor"
                d="M11.147 14.328c-.673-.672-.667-1.638-.265-2.403a.75.75 0 0 1 1.04-1.046c.34-.18.713-.276 1.085-.272a.75.75 0 0 1-.014 1.5a.88.88 0 0 0-.609.277c-.387.387-.285.775-.177.884c.11.109.497.21.884-.177c.784-.784 2.138-1.044 3.006-.177c.673.673.667 1.639.264 2.404a.75.75 0 0 1-1.04 1.045a2.2 2.2 0 0 1-1.472.232a.75.75 0 1 1 .302-1.47c.177.037.463-.021.708-.266c.388-.388.286-.775.177-.884s-.496-.21-.884.177c-.784.784-2.138 1.044-3.005.176m-1.126-4.035a2 2 0 1 0-2.828-2.828a2 2 0 0 0 2.828 2.828"
              ></path>
            </svg>
            <span className="mt-0.5">Plans</span>
          </div>

          <div className="flex space-x-2 hover:bg-indigo-600/50 cursor-pointer p-1 rounded-md duration-300 transition-all">
            <img
              src="/assets/logo1.png"
              alt="Profile"
              draggable={false}
              className="rounded-md w-6 h-6 object-cover select-none"
            />
            <span className="mt-0.5">Support</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <img
            src="https://cdn.discordapp.com/avatars/618078478755037185/9d67cfd5d3ecd981548c55b5fadd6912.png?size=1024"
            alt="Profile"
            draggable={false}
            className="rounded-md bg-indigo-700 w-8 h-8 sm:w-9 sm:h-9 object-cover select-none"
          />

        </div>
      </div>
    </motion.nav>
  );
}
