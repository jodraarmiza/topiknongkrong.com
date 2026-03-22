"use client";

import { motion, AnimatePresence } from "framer-motion";
import { categories } from "../data/topics";

export default function TopicCard({ topic, categoryId, historyCount, lang }) {
  const cat = categories.find((c) => c.id === categoryId);
  const catLabel = cat ? (lang === "en" ? cat.labelEn : cat.label) : null;

  return (
    <AnimatePresence mode="wait">
      {topic ? (
        <motion.div
          key={topic}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className={`
            w-full max-w-xl rounded-3xl p-8 shadow-xl border-2
            ${cat ? cat.bgLight + " " + cat.borderColor : "bg-white border-gray-200"}
            dark:bg-gray-800 dark:border-gray-700
          `}
        >
          {cat && (
            <div className={`text-sm font-semibold mb-4 ${cat.textColor} dark:text-gray-300 flex items-center gap-2`}>
              <span className="text-lg">{cat.emoji}</span>
              <span>{catLabel}</span>
            </div>
          )}
          <p className="text-xl font-semibold leading-relaxed text-gray-800 dark:text-gray-100">
            "{topic}"
          </p>
          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={() => {
                const text = lang === "en"
                  ? `Tonight's topic: "${topic}" — from topiknongkrong.com`
                  : `Topik nongkrong kita: "${topic}" — dari topiknongkrong.com`;
                if (navigator.share) {
                  navigator.share({ text });
                } else {
                  navigator.clipboard.writeText(text);
                  alert(lang === "en" ? "Copied to clipboard!" : "Topik disalin ke clipboard!");
                }
              }}
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              📤 {lang === "en" ? "Share" : "Share ke WA"}
            </button>
            {historyCount > 0 && (
              <span className="text-xs text-gray-400 dark:text-gray-500">
                {historyCount} {lang === "en" ? "topics tonight" : "topik tadi malam"}
              </span>
            )}
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="placeholder"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full max-w-xl rounded-3xl p-8 border-2 border-dashed border-gray-200 dark:border-gray-700 text-center"
        >
          <p className="text-4xl mb-3">🎰</p>
          <p className="text-gray-400 dark:text-gray-500 text-lg">
            {lang === "en" ? "Spin to get a topic!" : "Pencet spin buat dapet topik nongkrong!"}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
