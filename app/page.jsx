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
import Fade from "@/components/ui/Fade";
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
        "px-6 inner-white-shadow flex cursor-pointer space-x-2 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition duration-300 glass-shine glass-shine--fast backdrop-blur",
      href: `https://discord.com/oauth2/authorize?client_id=1049804936805892247&scope=bot+applications.commands+applications.commands.permissions.update&disable_guild_select=false&permissions=8&response_type=code&redirect_uri=/auth/discord/callback`, // غيرها باللينك بتاعك
    },
    {
      label: "Login",
      icon: <ExternalLink className="h-6 w-6" />,
      className:
        "px-6 py-3 flex  cursor-pointer space-x-2 rounded-lg border-2 border-indigo-600 hover:bg-indigo-700/50 backdrop-blur text-gray-200 font-medium transition duration-300",
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

            <div className="relative rounded-xl bg-black/40 p-2" style={{ zIndex: 10 }}>
              <Image
                src="/assets/dashboard.png"
                alt="Muzzle Bot Dashboard"
                width={1920}
                height={1080}
                className="rounded-lg select-none border border-white/20 bg-white/10 backdrop-blur-md  shadow-2xl w-full h-auto"
                quality={100}
                priority
                draggable="false"

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
                      src="/assets/em.png"
                      alt="Speed Image"
                      className="w-full h-auto select-none rounded-2xl border-t border-l border-[#323244]"
                      style={maskStyle}
                      draggable="false"
                    />

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
                      className="w-full  select-none h-auto rounded-2xl border-t border-r border-[#242431]"
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
                      style={maskStyle}
                    />
                  </div>
                </AnimatedRight>
              </div>
            </div>

          </div>

        </div>
      </div>

    </>
  );
}