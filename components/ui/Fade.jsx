"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

export default function Fade({
  children,
  delay = 0,
}) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (inView) setHasAnimated(true);
  }, [inView]);

  return (
    <motion.div
      ref={ref} // ✅ لازم تربطه هنا
      initial={{ opacity: 0, scale: 0.95 }}
      animate={hasAnimated ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay }} // ✅ استخدم delay اللي جاي من props
    >
      {children}
    </motion.div>
  );
}
