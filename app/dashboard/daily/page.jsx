'use client'
import { useState, useRef, useEffect } from "react";
import Page from "@/components/dashboard/page";
import ReCAPTCHA from "react-google-recaptcha";
import CountdownTimer from "@/components/dashboard/timer";
import { motion, AnimatePresence } from "framer-motion";
import { useSidebar } from "@/context/userSidebar";

 function ConfettiCanvas({ show }) {
  const canvasRef = useRef();
  const particles = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    if (!show) return;

    particles.current = Array.from({ length: 100 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height / 2,
      size: Math.random() * 6 + 4,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      speedY: Math.random() * 3 + 2,
      speedX: Math.random() * 4 - 2,
      rotation: Math.random() * 360,
      rotateSpeed: Math.random() * 10 - 5
    }));

    let animationFrameId;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.current.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotateSpeed;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const timeout = setTimeout(() => {
      cancelAnimationFrame(animationFrameId);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 3000);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timeout);
    };
  }, [show]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-50"
    />
  );
}

export default function Daily() {
  const recaptchaRef = useRef();
  const [stage, setStage] = useState("initial"); 
  const [number, setNumber] = useState(null);

  const {
    setIsSidebarOpen,
    isSidebarOpen,
    active,
    setActive,
    isLeaderboardOpen,
    setIsLeaderboardOpen,
    isGeneralOpen,
    setIsGeneralOpen,
    isStore,
    setIsStore,
    isOthers,
    setIsOthers,
    hasAnimated,
    setHasAnimated,
    timeLeft,
    setTimeLeft
  } = useSidebar();

  useEffect(() => {
    const targetTimestamp = Date.now() + 24 * 60 * 60 * 1000;

    const interval = setInterval(() => {
      const remaining = targetTimestamp - Date.now();
      if (remaining <= 0) {
        setStage("initial");
        console.log(stage)
        clearInterval(interval);
      }
    }, 1000);


    return () => clearInterval(interval);
  }, [stage, setStage]);

  const prevStageRef = useRef(stage);
const [showConfetti, setShowConfetti] = useState(false);

useEffect(() => {
  const prevStage = prevStageRef.current;

  if (prevStage === "captcha" && stage === "done") {
    setShowConfetti(true);
    const timeout = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timeout);
  }

  prevStageRef.current = stage; 
}, [stage]);


const ConfettiPiece = ({ color, x, y }) => (
  <motion.div
    initial={{ opacity: 1, y: 0, x: x, rotate: 0 }}
    animate={{ y: -200, opacity: 0, rotate: 360 }}
    transition={{ duration: 2, ease: "easeOut" }}
    className="absolute w-2 h-2 rounded-full"
    style={{ backgroundColor: color }}
  />
);



  const handleClick = () => {
    setStage("captcha");
  };

  const handleCaptchaChange = async (token) => {
    if (!token) return;

    try {
      const res = await fetch("/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();

      if (data.success) {
        setNumber(data.number);
        setStage("done");
      } else {
        alert("فشل التحقق من reCAPTCHA");
        setStage("initial");
      }
    } catch {
      alert("خطأ في الاتصال بالـ backend");
      setStage("initial");
    }
  };

  const boxClasses = `
    border-2
    mt-[2rem] w-[30rem] md:w-[35rem] p-9 rounded-2xl text-center
    ${stage === "initial" ? "group bg-[#222138] border-[#383472] hover:bg-[#4b41d8] hover:border-[#4b41d8] transition-all duration-300" : ""}
    ${stage === "captcha" ? "bg-[#222138] border-[#383472]" : ""}
    ${stage === "done" ? "bg-[#222138] border-[#383472] w-full" : ""}
  `;


  return (
    <Page>
      <div className="flex justify-center">
        <span className="text-[2rem] md:text-[3rem] font-extrabold"> Claim your daily reward</span>
      </div>
      <div className="flex justify-center">
        <p className="flex space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="#5048b8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"><path strokeWidth="1.5" d="M2.5 12c0-4.478 0-6.718 1.391-8.109S7.521 2.5 12 2.5c4.478 0 6.718 0 8.109 1.391S21.5 7.521 21.5 12c0 4.478 0 6.718-1.391 8.109S16.479 21.5 12 21.5c-4.478 0-6.718 0-8.109-1.391S2.5 16.479 2.5 12m9.5 4v-4.5" /><path strokeWidth="1.8" d="M12 8.012v-.01" /></g></svg>
          <span className="text-zinc-200 mt-0.5">You can claim up to 1500 corns </span>
        </p>
      </div>

      <div className="flex justify-center">
        <p className="flex space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="#5048b8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"><path strokeWidth="1.5" d="M2.5 12c0-4.478 0-6.718 1.391-8.109S7.521 2.5 12 2.5c4.478 0 6.718 0 8.109 1.391S21.5 7.521 21.5 12c0 4.478 0 6.718-1.391 8.109S16.479 21.5 12 21.5c-4.478 0-6.718 0-8.109-1.391S2.5 16.479 2.5 12m9.5 4v-4.5" /><path strokeWidth="1.8" d="M12 8.012v-.01" /></g></svg>
          <span className="text-zinc-200 mt-0.5">Come back everyday to earn extra credits! </span>
        </p>
      </div> 

      <div className="flex justify-center h-[33rem] relative">
      <ConfettiCanvas show={showConfetti} />

        <div className={boxClasses}>

          {stage === "initial" && (
            <div onClick={handleClick} className="cursor-pointer flex flex-col items-center">
              <div className="flex justify-center group-hover:text-white text-[#4b41d8] transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" className="md:w-[400px] md:h-[400px] w-[300px] h-[300px] translate-y-15 md:translate-y-0" viewBox="0 0 512 512">
                  <path fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32" d="M256 104v56h56a56 56 0 1 0-56-56Zm0 0v56h-56a56 56 0 1 1 56-56Z" />
                  <rect width="384" height="112" x="64" y="160" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" rx="32" ry="32" />
                  <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M416 272v144a48 48 0 0 1-48 48H144a48 48 0 0 1-48-48V272m160-112v304" />
                </svg>
              </div>

            </div>
          )}

          {stage === "captcha" && (
            <div className="flex justify-center items-center h-full">
              <ReCAPTCHA
                sitekey="6Le5ktwrAAAAAKxS5RUzLd5YQHSX5R1xhcm72lae"
                ref={recaptchaRef}
                onChange={handleCaptchaChange}
              />
            </div>
          )}

          {stage === "done" && number !== null && (
            <>
              <div className="relative flex justify-center items-center">
                <div className="flex justify-center group-hover:text-white text-[#373381] transition-all md:-translate-y-12 duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" className="md:w-[400px] md:h-[400px] w-[300px] h-[300px]" viewBox="0 0 512 512">
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32" d="M256 104v56h56a56 56 0 1 0-56-56Zm0 0v56h-56a56 56 0 1 1 56-56Z" />
                    <rect width="384" height="112" x="64" y="160" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" rx="32" ry="32" />
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M416 272v144a48 48 0 0 1-48 48H144a48 48 0 0 1-48-48V272m160-112v304" />
                  </svg>
                </div>

              </div>
              <div className=" flex justify-center items-center text-5xl font-extrabold  z-10 translate-y-6 md:-translate-y-6  space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="-translate-y-7" width="50" height="50" viewBox="0 0 256 256"><g fill="#4b41d8"><path d="M216 136a88 88 0 1 1-88-88a88 88 0 0 1 88 88" opacity="0.2" /><path d="M128 40a96 96 0 1 0 96 96a96.11 96.11 0 0 0-96-96m0 176a80 80 0 1 1 80-80a80.09 80.09 0 0 1-80 80m45.66-125.66a8 8 0 0 1 0 11.32l-40 40a8 8 0 0 1-11.32-11.32l40-40a8 8 0 0 1 11.32 0M96 16a8 8 0 0 1 8-8h48a8 8 0 0 1 0 16h-48a8 8 0 0 1-8-8" /></g></svg>
                <CountdownTimer targetTimestamp={Date.now() + 24 * 60 * 60 * 1000} />

              </div>
              <div className="text-[#736cdf] text-md font-extrabold translate-y-6 md:-translate-y-10  z-10">
                You have successfully claimed <span className="py-[0.1rem] -mt-0.5 px-[0.5rem] text-white select-none rounded-lg bg-[#372d97]">${number}</span> corns in your last daily
              </div>
            </>
          )}

        </div>
      </div>
    </Page>
  );
}
