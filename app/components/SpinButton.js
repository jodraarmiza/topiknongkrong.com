"use client";

import { motion } from "framer-motion";

export default function SpinButton({ onClick, isSpinning }) {
  return (
    <motion.button
      onClick={onClick}
      disabled={isSpinning}
      whileTap={{ scale: 0.93 }}
      whileHover={{ scale: isSpinning ? 1 : 1.04 }}
      className={`
        relative overflow-hidden
        px-10 py-5 rounded-2xl
        text-white font-bold text-xl tracking-wide
        shadow-lg transition-all duration-300
        ${
          isSpinning
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-rose-500 to-orange-400 hover:shadow-orange-300/50 hover:shadow-xl cursor-pointer"
        }
      `}
    >
      {isSpinning ? (
        <span className="flex items-center gap-3">
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 0.6, ease: "linear" }}
            className="inline-block"
          >
            🎰
          </motion.span>
          Lagi muter...
        </span>
      ) : (
        <span className="flex items-center gap-2">
          🎲 Spin Topik!
        </span>
      )}
    </motion.button>
  );
}
