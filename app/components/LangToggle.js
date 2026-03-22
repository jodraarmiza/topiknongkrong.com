"use client";

import { motion } from "framer-motion";

export default function LangToggle({ lang, onToggle }) {
  return (
    <motion.button
      onClick={onToggle}
      whileTap={{ scale: 0.88 }}
      title={lang === "id" ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
      className="h-10 px-3 rounded-full flex items-center gap-1.5 text-sm font-bold
        bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700
        border border-gray-200 dark:border-gray-700
        text-gray-700 dark:text-gray-300 transition-colors"
    >
      {lang === "id" ? "🇮🇩 ID" : "🇬🇧 EN"}
    </motion.button>
  );
}
