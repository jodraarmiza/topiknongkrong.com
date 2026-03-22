"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const isDark = saved ? saved === "dark" : true; // default: dark
    setDark(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }

  return (
    <motion.button
      onClick={toggle}
      whileTap={{ scale: 0.88 }}
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="w-10 h-10 rounded-full flex items-center justify-center text-xl
        bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700
        border border-gray-200 dark:border-gray-700 transition-colors"
    >
      {dark ? "☀️" : "🌙"}
    </motion.button>
  );
}
