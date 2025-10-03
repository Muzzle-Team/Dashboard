'use client'
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSidebar } from "@/context/userSidebar";
export default function CountdownTimer({ targetTimestamp }) {

  const [timeLeft, setTimeLeft] = useState(() =>
    targetTimestamp ? Math.max(targetTimestamp - Date.now(), 0) : 0
  );

  useEffect(() => {
    if (!targetTimestamp) return;

    const interval = setInterval(() => {
      const diff = targetTimestamp - Date.now();
      setTimeLeft(diff > 0 ? diff : 0);
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTimestamp]);

  // حساب الساعات والدقائق والثواني
  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  // تفكيك كل خانة (tens و units)
  const splitDigits = (num) => String(num).padStart(2, "0").split("");

  const hourDigits = splitDigits(hours);
  const minuteDigits = splitDigits(minutes);
  const secondDigits = splitDigits(seconds);

  const numberVariant = {
    initial: { y: -10, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.3 } },
    exit: { y: 10, opacity: 0, transition: { duration: 0.3 } },
  };

  const renderDigits = (digits) =>
    digits.map((digit, index) => (
      <AnimatePresence mode="popLayout" key={index}>
        <motion.span
          key={digit + index} // مهم عشان يتحرك كل خانة لوحدها
          variants={numberVariant}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {digit}
        </motion.span>
      </AnimatePresence>
    ));

  return (
    <div className="text-md select-none z-10 -translate-y-6 flex space-x-1">
      {renderDigits(hourDigits)}
      :
      {renderDigits(minuteDigits)}
      :
      {renderDigits(secondDigits)}
    </div>
  );
}
