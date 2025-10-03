'use client'
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CountdownTimer({ targetTimestamp }) {
  const [timeLeft, setTimeLeft] = useState(() =>
    targetTimestamp ? Math.max(targetTimestamp - Date.now(), 0) : 0
  );

  useEffect(() => {
    if (!targetTimestamp) return;
    
    const updateTime = () => {
      const diff = targetTimestamp - Date.now();
      setTimeLeft(diff > 0 ? diff : 0);
    };
    
    updateTime(); // Update immediately
    const interval = setInterval(updateTime, 100); // تحديث كل 100ms بدلاً من 1000ms
    
    return () => clearInterval(interval);
  }, [targetTimestamp]);

  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  const splitDigits = (num) => String(num).padStart(2, "0").split("");

  const hourDigits = splitDigits(hours);
  const minuteDigits = splitDigits(minutes);
  const secondDigits = splitDigits(seconds);

  const numberVariant = {
    initial: { y: -10, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.15 } }, // قلل المدة
    exit: { y: 10, opacity: 0, transition: { duration: 0.15 } }, // قلل المدة
  };

  const renderDigits = (digits) =>
    digits.map((digit, index) => (
      <div key={`pos-${index}`} className="inline-block w-[1ch]"> {/* width ثابت */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={digit}
            variants={numberVariant}
            initial="initial"
            animate="animate"
            exit="exit"
            className="inline-block"
          >
            {digit}
          </motion.span>
        </AnimatePresence>
      </div>
    ));

  return (
    <div className="text-md select-none z-10 -translate-y-6 flex space-x-1">
      {renderDigits(hourDigits)}
      <span>:</span>
      {renderDigits(minuteDigits)}
      <span>:</span>
      {renderDigits(secondDigits)}
    </div>
  );
}