"use client";
import { motion, useAnimation } from "framer-motion";
import { useState, useEffect } from "react";

export default function ClickArrowEffect() {
  const defaultX = typeof window !== "undefined" ? window.innerWidth / 2 : 0;
  const defaultY = typeof window !== "undefined" ? window.innerHeight / 2 : 0;

  const [position, setPosition] = useState({ x: defaultX, y: defaultY });
  const controls = useAnimation();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      controls.start({
        scale: [1, 1.5, 1],
        y: [0, -15, 0],
        rotate: [0, 15, -15, 0],
        transition: { duration: 0.5, ease: "easeOut" },
        opacity: 1, // keep fully visible
      });
    };

    window.addEventListener("click", handleClick);

    // Initial gentle pulse but keep fully visible
    controls.start({
      opacity: 1,
      scale: [0.9, 1, 0.95, 1],
      transition: { duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" },
    });

    return () => window.removeEventListener("click", handleClick);
  }, [controls]);

  return (
    <motion.div
      initial={{ opacity: 1, scale: 1, x: position.x, y: position.y, rotate: 0 }}
      animate={{
        x: position.x,
        y: position.y,
        opacity: 1,
        scale: 1,
        rotate: 0,
      }}
      transition={{
        type: "spring",
        stiffness: 280,
        damping: 25,
      }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        userSelect: "none",
        fontSize: "2rem",
        color: "#FF6F00", /* Bright orange */
        textShadow: "0 0 6px #FF6F00, 0 0 10px #FF6F00", /* orange glow */

        filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.3))",
        transformOrigin: "center center",
        zIndex: 9999,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <motion.div style={{ transform: "translate(-50%, -50%)" }} animate={controls}>
        ➤
      </motion.div>
    </motion.div>
  );
}
