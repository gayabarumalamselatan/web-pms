"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ScrollAnimationProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  className?: string;
  amount?: number; // amount of movement
  threshold?: number;
}

export function ScrollAnimation({
  children,
  direction = "up",
  delay = 0,
  duration = 0.8,
  className = "",
  amount = 50,
  threshold = 0.1,
}: ScrollAnimationProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });

  const variants = {
    hidden: {
      opacity: 0,
      x: direction === "left" ? -amount : direction === "right" ? amount : 0,
      y: direction === "up" ? amount : direction === "down" ? -amount : 0,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98], // Cubic bezier for premium feel
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function RevealAnimation({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.8, 1, 1, 0.8],
  );

  return (
    <motion.div ref={ref} style={{ opacity, scale }} className={className}>
      {children}
    </motion.div>
  );
}
