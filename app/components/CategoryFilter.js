"use client";

import { categories } from "../data/topics";

export default function CategoryFilter({ selected, onSelect, lang }) {
  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
      <button
        onClick={() => onSelect(null)}
        className={`px-4 py-2.5 sm:py-2 rounded-full text-sm font-semibold transition-all border-2 min-h-[44px] sm:min-h-0 ${
          selected === null
            ? "bg-gray-800 text-white border-gray-800 dark:bg-white dark:text-gray-900 dark:border-white shadow-md"
            : "bg-white text-gray-600 border-gray-200 hover:border-gray-400 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:border-gray-500"
        }`}
      >
        🎯 {lang === "en" ? "All" : "Semua"}
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={`px-4 py-2.5 sm:py-2 rounded-full text-sm font-semibold transition-all border-2 min-h-[44px] sm:min-h-0 ${
            selected === cat.id
              ? `bg-gradient-to-r ${cat.color} text-white border-transparent shadow-md`
              : `${cat.bgLight} ${cat.textColor} ${cat.borderColor} hover:shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300`
          }`}
        >
          {cat.emoji} {lang === "en" ? cat.labelEn : cat.label}
        </button>
      ))}
    </div>
  );
}
