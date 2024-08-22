"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function HeaderLogo() {
  return (
    <Link href="/" className="z-10">
      <motion.h1
        initial={{
          opacity: 0,
          x: -20,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          ease: "easeOut",
        }}
        className="flex items-center text-2xl font-bold"
      >
        Mundo
        <motion.span
          initial={{
            opacity: 0,
            x: -20,
          }}
          animate={{
            opacity: 0.3,
            x: 0,
          }}
          transition={{
            ease: "easeOut",
            delay: 0.1,
          }}
        >
          .ai
        </motion.span>
      </motion.h1>
    </Link>
  );
}
