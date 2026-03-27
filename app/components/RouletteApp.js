"use client";

import { useState, useEffect, useRef } from "react";
import { categories, getTopicText } from "../data/topics";
import GachaMachine from "./GachaMachine";
import CategoryFilter from "./CategoryFilter";
import TopicCard from "./TopicCard";
import HistoryPanel from "./HistoryPanel";
import ThemeToggle from "./ThemeToggle";
import LangToggle from "./LangToggle";
import AdSlot from "./AdSlot";
import FooterLinks from "./FooterLinks";

const HISTORY_KEY = "nongkrong_history";
const SHOWN_KEY = "nongkrong_shown";
const LANG_KEY = "nongkrong_lang";

export default function RouletteApp() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  // currentResult: { catId, topicIndex } | null
  const [currentResult, setCurrentResult] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  // history items: { catId, topicIndex }[]
  const [history, setHistory] = useState([]);
  // shownTopics: Set of "catId-index" strings (no-repeat tracking)
  const shownRef = useRef(new Set());
  const [lang, setLang] = useState("id");

  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem(HISTORY_KEY);
      if (savedHistory) {
        const parsed = JSON.parse(savedHistory);
        // Drop history items in old format (had `topic` string, not topicIndex)
        const valid = parsed.filter((item) => typeof item.topicIndex === "number" && item.catId);
        setHistory(valid);
      }

      const savedShown = localStorage.getItem(SHOWN_KEY);
      if (savedShown) shownRef.current = new Set(JSON.parse(savedShown));

      const savedLang = localStorage.getItem(LANG_KEY);
      if (savedLang) setLang(savedLang);
    } catch {}
  }, []);

  function saveHistory(newHistory) {
    setHistory(newHistory);
    try { localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory)); } catch {}
  }

  function saveShown(newSet) {
    shownRef.current = newSet;
    try { localStorage.setItem(SHOWN_KEY, JSON.stringify([...newSet])); } catch {}
  }

  function toggleLang() {
    const next = lang === "id" ? "en" : "id";
    setLang(next);
    try { localStorage.setItem(LANG_KEY, next); } catch {}
  }

  function pickTopic() {
    // Build pool of {catId, index} based on selected category
    let pool;
    if (selectedCategory) {
      const cat = categories.find((c) => c.id === selectedCategory);
      pool = cat.topics.map((_, i) => ({ catId: selectedCategory, topicIndex: i }));
    } else {
      pool = categories.flatMap((cat) =>
        cat.topics.map((_, i) => ({ catId: cat.id, topicIndex: i }))
      );
    }

    // Filter out already-shown topics
    let available = pool.filter(
      ({ catId, topicIndex }) => !shownRef.current.has(`${catId}-${topicIndex}`)
    );

    // If all exhausted, reset and start over
    if (available.length === 0) {
      const newShown = new Set(shownRef.current);
      pool.forEach(({ catId, topicIndex }) => newShown.delete(`${catId}-${topicIndex}`));
      saveShown(newShown);
      available = pool;
    }

    const picked = available[Math.floor(Math.random() * available.length)];

    // Mark as shown
    const newShown = new Set(shownRef.current);
    newShown.add(`${picked.catId}-${picked.topicIndex}`);
    saveShown(newShown);

    return picked;
  }

  function spin() {
    if (isSpinning) return;
    setIsSpinning(true);
    setCurrentResult(null);

    setTimeout(() => {
      const picked = pickTopic();
      setCurrentResult(picked);
      setIsSpinning(false);

      const newHistory = [picked, ...history].slice(0, 10);
      saveHistory(newHistory);
    }, 1800);
  }

  const currentTopicText = currentResult
    ? getTopicText(currentResult.catId, currentResult.topicIndex, lang)
    : null;

  const ui = {
    spin: lang === "id" ? "🎲 Putar Topik!" : "🎲 Spin Topic!",
    spinning: lang === "id" ? "Lagi muter..." : "Spinning...",
    subtitle: lang === "id"
      ? "Bingung mau ngobrol apa? Putar mesinnya dulu!"
      : "Don't know what to talk about? Just spin!",
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-300">
      <div className="max-w-xl mx-auto px-4 py-6 sm:py-10 flex flex-col items-center gap-4 sm:gap-6">

        {/* Header */}
        <div className="w-full flex items-start justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
              Topik Nongkrong
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {ui.subtitle}
            </p>
          </div>
          <div className="flex items-center gap-2 pt-1">
            <LangToggle lang={lang} onToggle={toggleLang} />
            <ThemeToggle />
          </div>
        </div>

        {/* Category Filter */}
        <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} lang={lang} />

        {/* Gacha Machine */}
        <GachaMachine isSpinning={isSpinning} />

        {/* Spin Button */}
        <button
          onClick={spin}
          disabled={isSpinning}
          className={`
            w-full sm:w-auto px-8 sm:px-10 py-4 rounded-2xl font-bold text-base sm:text-lg text-white
            transition-all duration-200 shadow-md
            ${isSpinning
              ? "bg-gray-300 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-rose-500 to-orange-400 hover:shadow-lg hover:shadow-orange-200 dark:hover:shadow-orange-900 active:scale-95 cursor-pointer"
            }
          `}
        >
          {isSpinning ? ui.spinning : ui.spin}
        </button>

        {/* Topic Card */}
        <TopicCard
          topic={currentTopicText}
          categoryId={currentResult?.catId}
          historyCount={history.length}
          lang={lang}
        />

        {/* Ad — below topic card, hidden on mobile */}
        <div className="hidden sm:block w-full">
          <AdSlot size="rectangle" />
        </div>

        {/* History */}
        <HistoryPanel
          history={history}
          lang={lang}
          onClear={() => {
            saveHistory([]);
            try { localStorage.removeItem(HISTORY_KEY); } catch {}
          }}
        />

        <footer className="flex flex-col items-center gap-3 text-center pb-6">
          <p className="text-xs text-gray-400 dark:text-gray-600">
            {lang === "id" ? "Dibuat iseng buat nongkrong makin seru 🙌" : "Made for better hangout conversations 🙌"}
          </p>
          <FooterLinks />
        </footer>
      </div>
    </main>
  );
}
