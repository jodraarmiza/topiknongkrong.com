"use client";

import { motion, AnimatePresence } from "framer-motion";
import { categories, getTopicText } from "../data/topics";

export default function HistoryPanel({ history, onClear, lang }) {
  if (history.length === 0) return null;

  return (
    <div className="w-full max-w-xl mt-8">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          {lang === "en" ? "Previous topics" : "Topik tadi"}
        </h3>
        <button
          onClick={onClear}
          className="text-xs text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors"
        >
          {lang === "en" ? "Clear all" : "Hapus semua"}
        </button>
      </div>
      <div className="flex flex-col gap-2">
        <AnimatePresence>
          {history.map((item, i) => {
            const cat = categories.find((c) => c.id === item.catId);
            const text = getTopicText(item.catId, item.topicIndex, lang);
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ delay: i * 0.03 }}
                className="flex items-start gap-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl px-4 py-3 shadow-sm"
              >
                <span className="text-lg mt-0.5">{cat?.emoji ?? "💬"}</span>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-snug">{text}</p>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
