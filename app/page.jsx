"use client"
import { Particles } from "@/components/particles";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navbar";
import { motion, AnimatePresence } from "framer-motion";
import StarBorder from "@/components/StarBorder";
import AnimatedLeft from "@/components/ui/AnimatedLeft";
import AnimatedRight from "@/components/ui/AnimatedRight";
import AnimatedTop from "@/components/ui/AnimatedTop";
import Fade from "@/components/ui/Fade";


import React from 'react';
import { Star, Heart, Zap, Award, Shield, Crown, Mail, Github } from 'lucide-react';

const Marquee = ({ children, speed = 25 }) => {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#13131a] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#13131a] to-transparent z-10 pointer-events-none" />

      <div className="flex">
        <div
          className="flex shrink-0 gap-6 animate-scroll"
          style={{ animationDuration: `${speed}s` }}
        >
          {children}
        </div>
        <div
          className="flex shrink-0 gap-6 animate-scroll"
          style={{ animationDuration: `${speed}s` }}
          aria-hidden="true"
        >
          {children}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        
        .animate-scroll {
          animation: scroll linear infinite;
        }
      `}</style>
    </div>
  );
};

const Card = ({ icon, title, subtitle, gradient }) => (
  <div className={`flex items-center gap-4 ${gradient} rounded-2xl  p-6 min-w-[280px] text-white transform hover:scale-105 transition-transform duration-300`}>
    <img src={icon} className="h-9 w-9" />
    <div>
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="text-white/90 text-sm">{subtitle}</p>
    </div>
  </div>
);



export default function ParticlesBasic() {
  const onLogin = () => {
    const width = 500;
    const height = 700;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    window.open(
      `/auth/discord`,
      "discord_oauth",
      `width=${width},height=${height},left=${left},top=${top},resizable,scrollbars=yes,status=1`
    )
  }


  const buttons = [
    {
      label: "Add to Discord",
      icon: (
        <img
          src="https://cdn.prod.website-files.com/6257adef93867e50d84d30e2/66e3d7f4ef6498ac018f2c55_Symbol.svg"
          className="h-6 w-6"
        />
      ),
      className:
        "px-6 flex cursor-pointer space-x-2 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition duration-300 glass-shine glass-shine--fast backdrop-blur",
      href: `https://discord.com/oauth2/authorize?client_id=1049804936805892247&scope=bot+applications.commands+applications.commands.permissions.update&disable_guild_select=false&permissions=8&response_type=code&indigoirect_uri=/auth/discord/callback`, // غيرها باللينك بتاعك
    },
    {
      label: "Login",
      icon: <ExternalLink className="h-6 w-6" />,
      className:
        "px-6 py-3 flex  cursor-pointer space-x-2 rounded-lg border-2 border-indigo-600 hover:bg-indigo-700/50 bg-indigo-700/20 backdrop-blur text-gray-200 font-medium transition duration-300",
      href: onLogin,
    },
  ];
  const wordDelay = 0.07;
  const totalDelay = wordDelay;

  const buttonVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: totalDelay + i * 0.3,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  const maskStyle = {
    maskImage:
      "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 100%)",
    WebkitMaskImage:
      "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 100%)",
  };

  const imgStyle = {
    maskImage:
      "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 100%, rgba(0,0,0,0) 100%)",
    WebkitMaskImage:
      "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 100%, rgba(0,0,0,0) 100%)",
  };

  const items = [
    {
      icon: '/assets/logo2.png',
      title: 'Muzzle Bot',
      subtitle: '200,000 Member',
      gradient: 'bg-[#13131a]'
    },
    {
      icon: '/assets/logo2.png',
      title: 'Muzzle Bot',
      subtitle: '200,000 Member',
      gradient: 'bg-[#13131a]'
    },
    {
      icon: '/assets/logo2.png',
      title: 'Muzzle Bot',
      subtitle: '200,000 Member',
      gradient: 'bg-[#13131a]'
    },
    {
      icon: '/assets/logo2.png',
      title: 'Muzzle Bot',
      subtitle: '200,000 Member',
      gradient: 'bg-[#13131a]'
    },
    {
      icon: '/assets/logo2.png',
      title: 'Muzzle Bot',
      subtitle: '200,000 Member',
      gradient: 'bg-[#13131a]'
    },
    {
      icon: '/assets/logo2.png',
      title: 'Muzzle Bot',
      subtitle: '200,000 Member',
      gradient: 'bg-[#13131a]'
    },
  ];
  return (
    <>
      <div className="relative flex min-h-screen h-screen w-full flex-col items-center justify-center rounded-lg border bg-[#0d0d11] md:shadow-xl">
        <Navbar />
        <Particles
          className="absolute inset-0"
          quantity={100}
          ease={80}
          color="#ffffff"
          refresh
        />
        <div className="absolute top-0 z-0 w-full flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 1.1 }}
            animate={{ opacity: 1, y: 0, scale: 1.2 }}
            transition={{
              duration: 1.2,
              ease: "easeOut"
            }}
          >
            <svg
              className="block blur-sm w-[300px] h-[100px] lg:w-[1131px] lg:h-[338px]"
              viewBox="0 0 1131 338"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_f_1014_8)">
                <path
                  fill="#4f39f6"
                  d="M924.055 -46.7655C932.387 -38.4332 932.544 -25.0145 924.041 -17.1797C878.713 24.594 826.167 57.9333 768.799 81.2414C704.941 107.19 636.361 120.207 566.969 119.551C497.577 118.892 428.737 104.573 364.376 77.4114C306.557 53.0107 253.371 18.6731 207.242 -23.9673C198.592 -31.967 198.492 -45.383 206.668 -53.5591L547.159 -394.05C555.335 -402.227 568.719 -402.101 577.052 -393.769L924.055 -46.7655Z"
                ></path>
              </g>
              <defs>
                <filter
                  id="filter0_f_1014_8"
                  x="0.64267"
                  y="-600.102"
                  width="1129.72"
                  height="919.677"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feGaussianBlur
                    stdDeviation="100"
                    result="effect1_foregroundBlur_1014_8"
                  />
                </filter>
              </defs>
            </svg>
          </motion.div>
        </div>

        <div className="absolute inset-0 z-0" style={{
          backgroundImage: `linear-gradient(#2b1ea926 1px, transparent 1px), linear-gradient(90deg, #2b1ea926 1px, transparent 1px)`,
          backgroundSize: '120px 120px',
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 10%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 50%), linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 10%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 50%), linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)',
          maskComposite: 'intersect',
          WebkitMaskComposite: 'source-in'
        }}></div>


        <div className="relative mt-[7rem] md:mt-[20rem] z-10 flex flex-col items-center text-center px-4 max-w-4xl md:max-w-6xl">

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: "easeOut"
            }}
            className="text-4xl md:text-[4rem] font-extrabold main-title"
          >
            Enhance Your Discord Server With Muzzle Bot
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: "easeOut"
            }}
            className="text-gray-300 text-lg md:text-xl mb-6 max-w-2xl mx-auto leading-relaxed"
          >
            A powerful Discord bot designed to enhance your server management
            experience. With advanced moderation tools, custom commands, and an
            intuitive dashboard, Muzzle Bot brings efficiency and control to your
            Discord community.
          </motion.p>

          <div className="flex flex-col mb-6 sm:flex-row gap-4">
            {buttons.map((btn, i) => (
              <motion.button
                key={i}
                custom={i}
                onClick={() => {
                  if (typeof btn.href === "function") {
                    btn.href();
                  } else if (typeof btn.href === "string") {
                    window.location.href = btn.href;
                  }
                }}
                variants={buttonVariant}
                initial="hidden"
                animate="visible"
                className={btn.className}
              >
                {btn.icon}
                <span className="mt-0.5">{btn.label}</span>
              </motion.button>
            ))}

          </div>



          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative inline-block p-[1px] rounded-xl overflow-hidden opacity-95 w-full max-w-[95vw] sm:max-w-[90vw] md:max-w-[800px] lg:max-w-[1200px]  mt-4"
            style={maskStyle}>

            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: '300%',
                height: '50%',
                bottom: '-12px',
                right: '-250%',
                background: 'radial-gradient(circle, white, transparent 10%)',
                opacity: 0.7,
                zIndex: 0,
                animation: 'starBottom 6s linear infinite alternate'
              }}
            ></div>

            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: '300%',
                height: '50%',
                top: '-12px',
                left: '-250%',
                background: 'radial-gradient(circle, white, transparent 10%)',
                opacity: 0.7,
                zIndex: 0,
                animation: 'starTop 6s linear infinite alternate'
              }}
            ></div>

            <div className="relative rounded-xl  p-2" style={{ zIndex: 20 }}>
              <Image
                src="/assets/dashboard.png"
                alt="Muzzle Bot Dashboard"
                width={1920}
                height={1080}
                className="rounded-lg select-none border border-zinc-800/50   shadow-2xl w-full h-auto"
                quality={100}
                priority
                draggable="false"
                style={imgStyle}

              />
            </div>

            <style dangerouslySetInnerHTML={{
              __html: `
    @keyframes starBottom {
      0% {
        transform: translate(0%, 0%);
        opacity: 0.7;
      }
      100% {
        transform: translate(-100%, 0%);
        opacity: 0;
      }
    }
    
    @keyframes starTop {
      0% {
        transform: translate(0%, 0%);
        opacity: 0.7;
      }
      100% {
        transform: translate(100%, 0%);
        opacity: 0;
      }
    }
  `}} />
          </motion.div>


        </div>
      </div>
      <div className="relative h-[9rem] w-full items-center justify-center border-t border-[#21212e] z-30 bg-[#13131a] md:shadow-xl overflow-hidden gap-8 p-8">
        <Marquee speed={25}>
          {items.map((item, idx) => (
            <Card key={idx} {...item} />
          ))}
        </Marquee>

      </div>
      <div className="relative min-h-screen w-full items-center justify-center border-t border-[#21212e] z-30 bg-[#13131a] md:shadow-xl overflow-hidden gap-8 p-8">
        <motion.div
          initial={{ opacity: 0, x: 50, y: -50, scale: 1.1 }}
          animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          transition={{
            duration: 1.2,
            ease: "easeOut"
          }}
          className="absolute -right-32 -top-32 lg:-right-48 lg:-top-48"
        >
          <svg
            className="block w-[300px] h-[300px] lg:w-[700px] lg:h-[700px]"
            viewBox="0 0 600 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ filter: 'blur(80px)', opacity: 0.5 }}
          >
            <g filter="url(#filter0_f_right_side)">
              <path
                fill="url(#gradient_right)"
                d="M384.766 206.945C376.433 198.613 363.015 198.456 355.18 206.959C313.406 252.287 280.067 304.833 256.759 362.201C230.81 426.059 217.793 494.639 218.449 564.031C219.108 633.423 233.427 702.263 260.589 766.624C284.989 824.443 319.327 877.629 361.967 923.758C369.967 932.408 383.383 932.508 391.559 924.332L732.05 583.841C740.227 575.665 740.101 562.281 731.769 553.948L384.766 206.945Z"
              ></path>
            </g>
            <defs>
              <linearGradient id="gradient_right" x1="300" y1="200" x2="500" y2="800" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#4f39f6" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#3730a3" stopOpacity="0.3" />
              </linearGradient>
              <filter
                id="filter0_f_right_side"
                x="-400"
                y="0"
                width="919.677"
                height="1129.72"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feGaussianBlur
                  stdDeviation="120"
                  result="effect1_foregroundBlur_right_side"
                />
              </filter>
            </defs>
          </svg>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -50, y: 50, scale: 1.1 }}
          animate={{ opacity: 1, x: 0, y: 0, scale: 1.2 }}
          transition={{
            duration: 1.2,
            ease: "easeOut"
          }}
          className="absolute left-0 bottom-0"
        >
          <svg
            className="block blur-sm w-[200px] h-[200px] lg:w-[600px] lg:h-[600px]"
            viewBox="0 0 600 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ filter: 'blur(80px)', opacity: 0.4 }}
          >
            <g filter="url(#filter0_f_left_side)">
              <path
                fill="url(#gradient_left)"
                d="M215.234 206.945C223.567 198.613 236.985 198.456 244.82 206.959C286.594 252.287 319.933 304.833 343.241 362.201C369.19 426.059 382.207 494.639 381.551 564.031C380.892 633.423 366.573 702.263 339.411 766.624C315.011 824.443 280.673 877.629 238.033 923.758C230.033 932.408 216.617 932.508 208.441 924.332L-132.05 583.841C-140.227 575.665 -140.101 562.281 -131.769 553.948L215.234 206.945Z"
              ></path>
            </g>
            <defs>
              <linearGradient id="gradient_left" x1="300" y1="200" x2="100" y2="800" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#4f39f6" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#3730a3" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#312e81" stopOpacity="0.3" />
              </linearGradient>
              <filter
                id="filter0_f_left_side"
                x="-319.677"
                y="0"
                width="919.677"
                height="1129.72"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feGaussianBlur
                  stdDeviation="100"
                  result="effect1_foregroundBlur_left_side"
                />
              </filter>
            </defs>
          </svg>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-between w-full min-h-[80vh] px-8 py-12 bg-[#13131a]">
          <div className="w-full md:w-1/2 flex justify-center">
          <AnimatedLeft>
            <div className="relative w-full flex justify-center items-center">

              <img
                src="/assets/galaxy.svg"
                alt="Feature Image"
                className="max-w-[20rem] md:max-w-xl object-cover select-none"
                draggable="false"
              />

              <img
                src="/assets/logo2.png"
                alt="Logo"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 md:w-40 select-none"
                draggable="false"
              />
            </div>
            </AnimatedLeft>

          </div>
          <div className="w-full md:w-1/2 mt-8 md:mt-0 md:pl-12 text-center ">
          <Fade delay={0.1}>
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-4 ">
              Muzzle Bot
            </h2>
            </Fade>
            <div className="flex flex-wrap justify-center gap-6">
              
              <div className="w-full sm:w-[45%] bg-[#1a1a24] border border-[#2b2b3b] p-3 flex rounded-lg text-white">
                <motion.div
                  className="rounded-md border border-[#2b2b3b] p-6  w-full h-[250px] flex flex-col justify-between items-end cursor-pointer relative overflow-hidden"
                  whileHover="hover"
                  initial="rest"
                  animate="rest"
                >
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-indigo-500"
                      width={34}
                      height={34}
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3 5.7c0-.663.448-1.2 1-1.2h16c.552 0 1 .537 1 1.2v3.6c0 .663-.448 1.2-1 1.2H4c-.552 0-1-.537-1-1.2zm3 1.8h2m-2 9h2m-5-1.8c0-.663.448-1.2 1-1.2h16c.552 0 1 .537 1 1.2v3.6c0 .663-.448 1.2-1 1.2H4c-.552 0-1-.537-1-1.2z"
                      ></path>
                    </svg>
                  </div>
                  <motion.div
                    className="flex flex-col items-end absolute bottom-[-1rem] right-6"
                    variants={{
                      rest: {},
                      hover: {},
                    }}
                  >
                    <motion.div
                      className="text-3xl font-semibold"
                      variants={{
                        rest: { y: 0 },
                        hover: { y: -20 },
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      +200
                    </motion.div>
                    <motion.div
                      className="text-sm text-gray-400 mt-2"
                      variants={{
                        rest: { opacity: 0, y: 10 },
                        hover: { opacity: 1, y: -30 },
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      Our Server Count
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>


              <div className="w-full sm:w-[45%] bg-[#1a1a24] border border-[#2b2b3b] p-3 flex rounded-lg text-white">
                <motion.div
                  className="rounded-md border border-[#2b2b3b] p-6 bg-[#1a1a24] w-full h-[250px] flex flex-col justify-between items-end cursor-pointer relative overflow-hidden"
                  whileHover="hover"
                  initial="rest"
                  animate="rest"
                >
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width={34} height={34} className="text-indigo-500" viewBox="0 0 24 24"><path fill="currentColor" d="M16 17v2H2v-2s0-4 7-4s7 4 7 4m-3.5-9.5A3.5 3.5 0 1 0 9 11a3.5 3.5 0 0 0 3.5-3.5m3.44 5.5A5.32 5.32 0 0 1 18 17v2h4v-2s0-3.63-6.06-4M15 4a3.4 3.4 0 0 0-1.93.59a5 5 0 0 1 0 5.82A3.4 3.4 0 0 0 15 11a3.5 3.5 0 0 0 0-7"></path></svg>
                  </div>
                  <motion.div
                    className="flex flex-col items-end absolute bottom-[-1rem] right-6"
                    variants={{
                      rest: {},
                      hover: {},
                    }}
                  >
                    <motion.div
                      className="text-3xl font-semibold"
                      variants={{
                        rest: { y: 0 },
                        hover: { y: -20 },
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      +100K
                    </motion.div>
                    <motion.div
                      className="text-sm text-gray-400 mt-2"
                      variants={{
                        rest: { opacity: 0, y: 10 },
                        hover: { opacity: 1, y: -30 },
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      Our Users Count
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>


              <div className="w-full sm:w-[45%] bg-[#1a1a24] border border-[#2b2b3b] p-3 flex rounded-lg text-white">
                <motion.div
                  className="rounded-md border border-[#2b2b3b] p-6 bg-[#1a1a24] w-full h-[250px] flex flex-col justify-between items-end cursor-pointer relative overflow-hidden"
                  whileHover="hover"
                  initial="rest"
                  animate="rest"
                >
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width={34} height={34} className="text-indigo-500" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M4.742 10.94a7.258 7.258 0 0 1 14.516 0v4.645a2.613 2.613 0 0 1-2.613 2.613h-2.633c-.402-.521-1.152-.871-2.012-.871c-1.283 0-2.323.78-2.323 1.741c0 .963 1.04 1.742 2.323 1.742c.86 0 1.61-.35 2.012-.87h2.633A4.355 4.355 0 0 0 21 15.584V10.94a9 9 0 1 0-18 0v1.741a.87.87 0 1 0 1.742 0z" clipRule="evenodd" opacity={0.5}></path><path fill="currentColor" d="M5.613 12.1a2.323 2.323 0 0 1 2.323-2.322h.58c.642 0 1.162.52 1.162 1.162v4.064c0 .641-.52 1.161-1.161 1.161h-.581a2.323 2.323 0 0 1-2.323-2.322zm12.775 0a2.323 2.323 0 0 0-2.323-2.322h-.58c-.642 0-1.162.52-1.162 1.162v4.064c0 .641.52 1.161 1.161 1.161h.58a2.323 2.323 0 0 0 2.323-2.322z"></path></svg>
                  </div>
                  <motion.div
                    className="flex flex-col items-end absolute bottom-[-1rem] right-6"
                    variants={{
                      rest: {},
                      hover: {},
                    }}
                  >
                    <motion.div
                      className="text-3xl font-semibold"
                      variants={{
                        rest: { y: 0 },
                        hover: { y: -20 },
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      24/7
                    </motion.div>
                    <motion.div
                      className="text-sm text-gray-400 mt-2"
                      variants={{
                        rest: { opacity: 0, y: 10 },
                        hover: { opacity: 1, y: -30 },
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      Our Support Time
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>


              <div className="w-full sm:w-[45%] bg-[#1a1a24] border border-[#2b2b3b] p-3 flex rounded-lg text-white">
                <motion.div
                  className="rounded-md border border-[#2b2b3b] p-6 bg-[#1a1a24] w-full h-[250px] flex flex-col justify-between items-end cursor-pointer relative overflow-hidden"
                  whileHover="hover"
                  initial="rest"
                  animate="rest"
                >
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width={34} height={34} className="text-indigo-500" viewBox="0 0 24 24"><path fill="currentColor" d="M21.738 16.13a1 1 0 0 1-.19.61a1 1 0 0 1-.52.38l-1.71.57a3.6 3.6 0 0 0-1.4.86a3.5 3.5 0 0 0-.86 1.4l-.6 1.7a1 1 0 0 1-.36.51a1.1 1.1 0 0 1-.62.19a1 1 0 0 1-1-.71l-.57-1.71a3.5 3.5 0 0 0-.86-1.4a3.8 3.8 0 0 0-1.4-.87l-1.71-.56a1.1 1.1 0 0 1-.51-.37a1.1 1.1 0 0 1-.21-.62a1 1 0 0 1 .71-1l1.72-.57a3.54 3.54 0 0 0 2.28-2.28l.57-1.69a1 1 0 0 1 .95-.73c.215 0 .426.059.61.17c.182.125.322.303.4.51l.58 1.74a3.54 3.54 0 0 0 2.28 2.28l1.7.6a1 1 0 0 1 .51.38a1 1 0 0 1 .21.61m-9.999-6.36a1 1 0 0 1-.17.55a1 1 0 0 1-.47.35l-1.26.42c-.353.122-.673.32-.94.58a2.5 2.5 0 0 0-.58.94l-.43 1.24a.9.9 0 0 1-.35.47a1 1 0 0 1-.56.18a1 1 0 0 1-.57-.19a1 1 0 0 1-.34-.47l-.41-1.25a2.44 2.44 0 0 0-.58-.93a2.2 2.2 0 0 0-.93-.58l-1.25-.42a.93.93 0 0 1-.48-.35a1 1 0 0 1 .48-1.47l1.25-.41a2.49 2.49 0 0 0 1.53-1.53l.41-1.23a1 1 0 0 1 .32-.47a1 1 0 0 1 .55-.2a1 1 0 0 1 .57.16a1 1 0 0 1 .37.46l.42 1.28a2.49 2.49 0 0 0 1.53 1.53l1.25.43a.92.92 0 0 1 .46.35a.94.94 0 0 1 .18.56m5.789-5.36a1 1 0 0 1-.17.51a.82.82 0 0 1-.42.3l-.62.21a.84.84 0 0 0-.52.52l-.22.63a.93.93 0 0 1-.29.39a.82.82 0 0 1-.52.18a1.1 1.1 0 0 1-.49-.15a.9.9 0 0 1-.32-.44l-.21-.62a.7.7 0 0 0-.2-.32a.76.76 0 0 0-.32-.2l-.62-.2a1 1 0 0 1-.42-.31a.9.9 0 0 1-.16-.51a.94.94 0 0 1 .17-.51a.9.9 0 0 1 .42-.3l.61-.2a.9.9 0 0 0 .33-.2a.9.9 0 0 0 .2-.33l.21-.62c.06-.155.155-.292.28-.4a1 1 0 0 1 .49-.19a.94.94 0 0 1 .53.16a1 1 0 0 1 .32.41l.21.64a.9.9 0 0 0 .2.33a1 1 0 0 0 .32.2l.63.21a1 1 0 0 1 .41.3a.87.87 0 0 1 .17.51"></path></svg>
                  </div>
                  <motion.div
                    className="flex flex-col items-end absolute bottom-[-1rem] right-6"
                    variants={{
                      rest: {},
                      hover: {},
                    }}
                  >
                    <motion.div
                      className="text-3xl font-semibold"
                      variants={{
                        rest: { y: 0 },
                        hover: { y: -20 },
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      +30
                    </motion.div>
                    <motion.div
                      className="text-sm text-gray-400 mt-2"
                      variants={{
                        rest: { opacity: 0, y: 10 },
                        hover: { opacity: 1, y: -30 },
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      Our Plugins
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            </div>

          </div>
        </div>

      </div>

      <div className="relative min-h-screen w-full items-center justify-center border-t border-[#21212e] z-30 bg-[#13131a] md:shadow-xl overflow-hidden gap-8 p-8">

        <Fade>
          <div className="w-full text-center mb-12 mt-9">
            <h2 className="text-5xl font-bold text-white">Features</h2>
            <p className="text-lg text-gray-400">Discover powerful tools designed to make your Discord server smarter, smoother, and more fun than ever.</p>
          </div>
        </Fade>

        <motion.div
          initial={{ opacity: 0, x: 50, y: -50, scale: 1.1 }}
          animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          transition={{
            duration: 1.2,
            ease: "easeOut"
          }}
          className="absolute -right-32 -top-32 lg:-right-48 lg:-top-48"
        >
          <svg
            className="block w-[300px] h-[300px] lg:w-[700px] lg:h-[700px]"
            viewBox="0 0 600 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ filter: 'blur(80px)', opacity: 0.5 }}
          >
            <g filter="url(#filter0_f_right_side)">
              <path
                fill="url(#gradient_right)"
                d="M384.766 206.945C376.433 198.613 363.015 198.456 355.18 206.959C313.406 252.287 280.067 304.833 256.759 362.201C230.81 426.059 217.793 494.639 218.449 564.031C219.108 633.423 233.427 702.263 260.589 766.624C284.989 824.443 319.327 877.629 361.967 923.758C369.967 932.408 383.383 932.508 391.559 924.332L732.05 583.841C740.227 575.665 740.101 562.281 731.769 553.948L384.766 206.945Z"
              ></path>
            </g>
            <defs>
              <linearGradient id="gradient_right" x1="300" y1="200" x2="500" y2="800" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#4f39f6" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#3730a3" stopOpacity="0.3" />
              </linearGradient>
              <filter
                id="filter0_f_right_side"
                x="-400"
                y="0"
                width="919.677"
                height="1129.72"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feGaussianBlur
                  stdDeviation="120"
                  result="effect1_foregroundBlur_right_side"
                />
              </filter>
            </defs>
          </svg>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -50, y: 50, scale: 1.1 }}
          animate={{ opacity: 1, x: 0, y: 0, scale: 1.2 }}
          transition={{
            duration: 1.2,
            ease: "easeOut"
          }}
          className="absolute left-0 bottom-0"
        >
          <svg
            className="block blur-sm w-[200px] h-[200px] lg:w-[600px] lg:h-[600px]"
            viewBox="0 0 600 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ filter: 'blur(80px)', opacity: 0.4 }}
          >
            <g filter="url(#filter0_f_left_side)">
              <path
                fill="url(#gradient_left)"
                d="M215.234 206.945C223.567 198.613 236.985 198.456 244.82 206.959C286.594 252.287 319.933 304.833 343.241 362.201C369.19 426.059 382.207 494.639 381.551 564.031C380.892 633.423 366.573 702.263 339.411 766.624C315.011 824.443 280.673 877.629 238.033 923.758C230.033 932.408 216.617 932.508 208.441 924.332L-132.05 583.841C-140.227 575.665 -140.101 562.281 -131.769 553.948L215.234 206.945Z"
              ></path>
            </g>
            <defs>
              <linearGradient id="gradient_left" x1="300" y1="200" x2="100" y2="800" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#4f39f6" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#3730a3" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#312e81" stopOpacity="0.3" />
              </linearGradient>
              <filter
                id="filter0_f_left_side"
                x="-319.677"
                y="0"
                width="919.677"
                height="1129.72"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feGaussianBlur
                  stdDeviation="100"
                  result="effect1_foregroundBlur_left_side"
                />
              </filter>
            </defs>
          </svg>
        </motion.div>

        <div className="items-center p-8">

          <div className="w-full max-w-7xl mx-auto px-4 py-12">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">

              <div className="w-full lg:w-1/2">
                <AnimatedLeft>
                  <div className="relative w-full">
                    <img
                      src="/assets/embed.png"
                      alt="Speed Image"
                      className="w-full md:scale-100 scale-120 h-auto select-none rounded-2xl border-t border-l border-[#242431]"
                      draggable="false"
                    />

                    <div
                      className="absolute inset-0 rounded-2xl pointer-events-none"
                      style={{
                        maskImage:
                          "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 150%)"
                        ,
                        WebkitMaskImage:
                          "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 150%)"
                        ,
                        backgroundColor: "black",
                      }}
                    ></div>
                  </div>
                </AnimatedLeft>
              </div>


              <div className="w-full lg:w-1/2 space-y-8">
                <AnimatedRight>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#242431]">
                      <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24"><path fill="#6969bd" fillRule="evenodd" d="M2 6a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7.333L4 21.5c-.824.618-2 .03-2-1z" className="duoicon-secondary-layer" opacity={0.3}></path><path fill="#7474fa" fillRule="evenodd" d="M8 12a1 1 0 1 0 0 2h3a1 1 0 1 0 0-2zM7 9a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1" className="duoicon-primary-layer"></path></svg>
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      Embed Message
                    </h3>
                  </div>

                  <div className="space-y-9 mt-9">
                    <h2 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-white leading-tight">
                      Create beautiful embeds in just a few clicks!
                    </h2>

                    <p className="text-lg text-gray-400 leading-relaxed">
                      Bring your messages to life with fully customized embeds — your creativity, your rules.
                    </p>
                  </div>
                </AnimatedRight>
              </div>

            </div>

            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 mt-[12rem]">

              <div className="w-full lg:w-1/2 block md:hidden">
                <AnimatedLeft>
                  <div className="relative w-full">

                    <img
                      src="/assets/welcome.png"
                      alt="Speed Image"
                      className="w-full md:scale-100 scale-120 select-none h-auto rounded-2xl border-t border-r border-[#242431]"
                      style={maskStyle}
                      draggable="false"
                    />

                  </div>
                </AnimatedLeft>
              </div>

              <div className="w-full lg:w-1/2 space-y-8">
                <AnimatedLeft>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1e1e2b]">
                      <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} className="text-[#]" viewBox="0 0 48 48"><g fill="none" stroke="#7474fa" strokeLinejoin="round" strokeWidth={4}><path fill="#6969bd" fillRule="evenodd" opacity={0.3} d="M10 8v8h28l4-4l-4-4zm28 15v8H10l-4-4l4-4z"></path><path strokeLinecap="round" d="M24 31v13m0-28v7m0-19v4m-5 36h10"></path></g></svg>
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      Welcome Message
                    </h3>
                  </div>

                  <div className="space-y-9 mt-9">
                    <h2 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-white leading-tight ">
                      Let's Welcome New Members with Epic Style
                    </h2>

                    <p className="text-lg text-gray-400 leading-relaxed">
                      Design personalized welcome images featuring usernames, avatars, and fully customizable backgrounds!
                    </p>
                  </div>
                </AnimatedLeft>
              </div>
              <div className="w-full lg:w-1/2">
                <AnimatedRight>
                  <div className="relative w-full hidden md:block">
                    <img
                      src="/assets/welcome.png"
                      alt="Speed Image"
                      className="w-full select-none h-auto rounded-2xl border-t border-r border-[#242431]"
                      draggable="false"

                    />
                    <div
                      className="absolute inset-0 rounded-2xl pointer-events-none"
                      style={{
                        maskImage:
                          "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 150%)"
                        ,
                        WebkitMaskImage:
                          "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 150%)"
                        ,
                        backgroundColor: "black",
                      }}
                    ></div>
                  </div>
                </AnimatedRight>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 mt-[12rem]">

              <div className="w-full lg:w-1/2">
                <AnimatedLeft>
                  <div className="relative w-full md:scale-100 overflow-hidden rounded-2xl border-t border-l border-[#242431]">
                    <img
                      src="/assets/giveaway.png"
                      alt="Speed Image"
                      className="w-full h-auto select-none scale-125"
                      draggable="false"
                    />
                    <div
                      className="absolute inset-0 rounded-2xl pointer-events-none"
                      style={{
                        maskImage:
                          "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 150%)"
                        ,
                        WebkitMaskImage:
                          "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 150%)"
                        ,
                        backgroundColor: "black",
                      }}
                    ></div>
                  </div>
                </AnimatedLeft>
              </div>



              <div className="w-full lg:w-1/2 space-y-8">
                <AnimatedRight>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#242431]">
                      <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 32 32"><g fill="#7474fa"><path d="M15.371 13.041q.167.055.342.081q.278.07.563.1a1.978 1.978 0 0 0 3.846.114c.218-.786.33-1.598.333-2.414a9.4 9.4 0 0 0 1.168-2.1l.013-.03l.107-.26l.137-.346a29 29 0 0 0 .415-1.146l.027-.08l.01-.032c.068-.2.136-.422.2-.646q.057-.194.109-.392a9.5 9.5 0 0 0 .322-1.791v-.03a2 2 0 0 0-1.732-2.052a1.96 1.96 0 0 0-1.134.195a2 2 0 0 0-1.091 1.636v.01a8.5 8.5 0 0 1-.43 1.793c-.1.3-.2.585-.3.84q-.302-.155-.624-.26l-.019-.009a3.592 3.592 0 0 0-2.262 6.818zm3.786.031a.978.978 0 0 1-1.849.117q.285-.051.559-.144a4.4 4.4 0 0 0 1.489-.89q-.075.464-.199.917m-5.11-4.26a2.586 2.586 0 0 1 3.27-1.64l.03.01q.293.094.561.244l-.021.049v.012a5.4 5.4 0 0 1-.9 1.429l-.016.016l-.025.029a2 2 0 0 1-.1.109l-.1-.038l-.03-.01a.634.634 0 0 0-.8.4a.57.57 0 0 0 .03.48c.06.128.162.231.289.292q.05.012.1.028q.136.049.279.061a.8.8 0 0 0 .437-.1q.105-.054.2-.124q.253-.198.458-.445l.01-.01a6.3 6.3 0 0 0 1.077-1.693a5 5 0 0 0 .088-.215v-.015l.01-.024a17 17 0 0 0 .162-.393l.034-.087l.034-.088c.424-1.015.72-2.079.883-3.167q.014-.182.09-.349a1 1 0 0 1 .243-.325a.98.98 0 0 1 .707-.246c.215.012.42.096.58.24a1 1 0 0 1 .34.79q-.016.24-.055.5q-.12.74-.336 1.457l-.042.14a24 24 0 0 1-.615 1.764l-.033.084a24 24 0 0 1-.174.429l-.015.036l-.086.208a8.5 8.5 0 0 1-1.414 2.24a3.74 3.74 0 0 1-1.831 1.26a2.7 2.7 0 0 1-1.043.072a3 3 0 0 1-.422-.084a1 1 0 0 1-.214-.045a2.593 2.593 0 0 1-1.64-3.281M12.06 3.98a.96.96 0 1 1-1.066-1.596a.96.96 0 0 1 1.066 1.596m11.908 18.846a.97.97 0 1 1 1.078 1.612a.97.97 0 0 1-1.078-1.612m.999-13.914a1.16 1.16 0 1 0 0-2.32a1.16 1.16 0 0 0 0 2.32M6.651 8.716a1.16 1.16 0 1 1-1.288-1.929a1.16 1.16 0 0 1 1.288 1.93"></path><path fill="#6969bd" d="M29.396 14.89a1.04 1.04 0 0 1-.799.032a6.65 6.65 0 0 0-6.397.969c2.327.06 4.602.694 6.623 1.849a2.15 2.15 0 0 1-2.086 3.76a9.74 9.74 0 0 0-7.981-.813c.335.643.586 1.327.745 2.035c.057.211.085.43.084.648a1.96 1.96 0 0 1-.48 1.542q-.12.12-.265.209a2.4 2.4 0 0 1-1.055.591l-12.738 3.41a2.42 2.42 0 0 1-2.96-2.97l3.41-12.74a2.4 2.4 0 0 1 .6-1.065q.086-.139.2-.255a1.94 1.94 0 0 1 1.495-.482c.243-.006.486.025.72.092a8 8 0 0 1 1.794.636c.28-1.62.01-3.288-.769-4.736a1.174 1.174 0 0 1 2.07-1.11a9.72 9.72 0 0 1 .824 7.11a21 21 0 0 1 2.209 1.805a1.15 1.15 0 0 1 1.677 1.573q.214-.085.434-.163a16 16 0 0 1 4.088-.888a1.05 1.05 0 0 1 .004-1.641a8.74 8.74 0 0 1 8.486-1.33a1.048 1.048 0 0 1 .067 1.932m-17.888 7.357l-.181-.155l.166.142zm0 0l.132.112zm-7.454 5.908c.24.065.494.065.735.001l.578-.151a11.3 11.3 0 0 1-2.183-2.08l-.131.49a1.42 1.42 0 0 0 1.001 1.74m1.596-2.507a10.3 10.3 0 0 0 2.379 1.641l2.798-.749a17.5 17.5 0 0 1-3.03-2.265a19.2 19.2 0 0 1-3.142-3.853l-.794 2.969a10.2 10.2 0 0 0 1.789 2.257m3.517-2.835a16.3 16.3 0 0 0 4.53 2.96l2.491-.668a16.7 16.7 0 0 1-6.011-4.073a22 22 0 0 1-1.664-1.85q-.345-.428-.644-.853a13 13 0 0 1-1.772-3.307l-.703 2.661a18.7 18.7 0 0 0 3.773 5.13m19.534-3.91a1.2 1.2 0 0 0-.356-.288h-.005a13.15 13.15 0 0 0-11.255-.857l-.192.07l.009.01a13.1 13.1 0 0 0-4.94 3.476c.259.227.51.435.759.635c.349.28.7.539 1.1.8a10.15 10.15 0 0 1 4.028-2.82a10.86 10.86 0 0 1 9.375.693a1.15 1.15 0 0 0 1.477-1.72"></path></g></svg>
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      Giveaway
                    </h3>
                  </div>

                  <div className="space-y-9 mt-9">
                    <h2 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-white leading-tight">
                      Create Giveaway Fast & Simple
                    </h2>

                    <p className="text-lg text-gray-400 leading-relaxed">
                      Boost your community’s excitement with custom giveaways and awesome prizes!
                    </p>
                  </div>
                </AnimatedRight>
              </div>

            </div>


            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 mt-[12rem]">

              <div className="w-full lg:w-1/2 block md:hidden">
                <AnimatedLeft>
                  <div className="relative w-full">

                    <img
                      src="/assets/level.png"
                      alt="Speed Image"
                      className="w-full scale-120 select-none h-auto rounded-2xl border-t border-r border-[#242431]"
                      style={maskStyle}
                      draggable="false"
                    />

                  </div>
                </AnimatedLeft>
              </div>

              <div className="w-full lg:w-1/2 space-y-8">
                <AnimatedLeft>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1e1e2b]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#7474fa"
                          d="M6.67 14H4c-1.1 0-2 .9-2 2v5c0 .55.45 1 1 1h3.67c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1ZM13.33 10h-2.67c-1.1 0-2 .9-2 2v9c0 .55.45 1 1 1h4.67c.55 0 1-.45 1-1v-9a2 2 0 0 0-2-2ZM20 17h-2.67c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1H21c.55 0 1-.45 1-1v-2c0-1.1-.9-2-2-2ZM15.01 4.85c.31-.31.43-.68.33-1-.1-.32-.41-.55-.85-.62l-.96-.16c-.04 0-.13-.07-.15-.11l-.53-1.06c-.4-.81-1.31-.81-1.71 0l-.53 1.06c-.01.04-.1.11-.14.11l-.96.16c-.44.07-.74.3-.85.62-.1.32.02.69.33 1l.74.75c.04.03.07.15.06.19l-.21.92c-.16.69.1 1 .27 1.12.17.12.54.28 1.15-.08l.9-.53c.04-.03.17-.03.21 0l.89.53c.28.17.51.22.69.22.21 0 .36-.08.45-.14.17-.12.43-.43.27-1.12l-.21-.92c-.01-.05.02-.16.06-.19l.75-.75Z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      Leveling System
                    </h3>
                  </div>

                  <div className="space-y-9 mt-9">
                    <h2 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-white leading-tight ">
                      Reward Your Most Active Members In Your Community
                    </h2>

                    <p className="text-lg text-gray-400 leading-relaxed">
                      Motivate your members by granting exclusive roles, permissions, and channels as they level up!
                    </p>
                  </div>
                </AnimatedLeft>
              </div>
              <div className="w-full lg:w-1/2">
                <AnimatedRight>
                  <div className="hidden md:block relative w-full overflow-hidden rounded-2xl border-t border-r border-[#242431]">
                    <img
                      src="/assets/level.png"
                      alt="Speed Image"
                      className="w-full h-auto select-none scale-110"
                      draggable="false"
                    />
                    <div
                      className="absolute inset-0 rounded-2xl pointer-events-none"
                      style={{
                        maskImage:
                          "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 150%)"
                        ,
                        WebkitMaskImage:
                          "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 150%)"
                        ,
                        backgroundColor: "black",
                      }}
                    ></div>
                  </div>
                </AnimatedRight>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div className="bg-[#13131a]">
        <div className="relative h-auto md:h-[15rem] md:flex w-full items-center  border-t border-[#21212e] z-30 bg-[#13131a]  overflow-hidden gap-8 p-8 justify-between">
          <div className="text-white ">
            <div className="flex space-x-2  text-2xl md:text-5xl font-extrabold">
              <h1 className="mt-3">Join Muzzle And Enjoy</h1>
              <img src="/assets/logo1.png" className="h-20 w-20" />
            </div>
            <p className="text-gray-300">Join support server to keep up to date with latest updates</p>
          </div>
          <div className="text-white bg-indigo-500/20 border border-indigo-500 px-5 py-4 rounded-md flex space-x-2 cursor-pointer hover:bg-indigo-500/50 transition-all duration-300">
            <img src="/assets/logo2.png" className="h-6 w-6" />
            <span className="text-lg">Join Support Server</span>
          </div>
        </div>
        <div className="flex justify-center items-center translate-y-[6.5rem]">
          <img
            className="z-40 select-none"
            src="/assets/wump.webp"
            width={174}
            alt="Wumpus"
            draggable="false"
          />
          
        </div>
        <div className="flex justify-center items-center -translate-y-[7rem] rotate-3">
          <img
            className="z-40 select-none"
            src="/assets/idk.webp"
            width={174}
            alt="Wumpus"
            draggable="false"
          />
          
        </div>

        <footer className="rounded-4xl z-30 border-3 rounded-b-none border-b-0 text-white border-[#383853] bg-gradient-to-b from-[#1c1c27] to-[#13131a] md:ml-3 md:mr-3 py-12">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              {/* Brand */}
              <div>
                <h3 className="text-xl font-bold  mb-4 flex space-x-2">
                  <img src="/assets/logo2.png" className="h-6 w-6" />
                  <span> Muzzle Bot</span>
                </h3>
                <p className="text-zinc-400">
                  A powerful Discord bot designed to enhance your server management
                  experience. With advanced moderation tools, custom commands, and an
                  intuitive dashboard, Muzzle Bot brings efficiency and control to your
                  Discord community.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                <div className="space-y-2">
                  <button

                    className="block text-gray-300 hover:text-indigo-400 transition-colors duration-200"
                  >
                    Top.gg
                  </button>
                  <button

                    className="block text-gray-300 hover:text-indigo-400 transition-colors duration-200"
                  >
                    Commands
                  </button>
                  <button

                    className="block text-gray-300 hover:text-indigo-400 transition-colors duration-200"
                  >
                    Plans
                  </button>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Connect</h4>
                <div className="flex space-x-4">
                  <a
                    href="https://discord.gg/p6PbDTH3fa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-indigo-400 transition-colors duration-200"
                  >
                    Discord
                  </a>

                </div>

              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Legal</h4>
                <div className="space-y-2">
                  <button

                    className="block text-gray-300 hover:text-indigo-400 transition-colors duration-200"
                  >
                    Terms of Service
                  </button>
                  <button

                    className="block text-gray-300 hover:text-indigo-400 transition-colors duration-200"
                  >
                    Privacy Policy
                  </button>

                </div>
              </div>
            </div>


            <div className="border-t border-zinc-700 mt-8 pt-8 text-center md:flex md:justify-between">
              <p className="text-gray-300">
                © 2025 Monx Team All rights reserved.
                <br/>
                <span className="text-indigo-500">Discord for wump image</span>
              </p>
              <div className="flex space-x-2">
                <img
                  src="https://cdn.prod.website-files.com/6257adef93867e50d84d30e2/66e3d7f4ef6498ac018f2c55_Symbol.svg"
                  className="h-6 w-6"
                />
              </div>
            </div>
          </div>
        </footer>
      </div>

    </>
  );
}