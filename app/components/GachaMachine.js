"use client";

import { motion } from "framer-motion";

const BALLS = [
  { color: "#fda4af", left: "16%", top: "50%", size: 32 },
  { color: "#93c5fd", left: "44%", top: "34%", size: 36 },
  { color: "#86efac", left: "62%", top: "54%", size: 30 },
  { color: "#fde68a", left: "12%", top: "30%", size: 28 },
  { color: "#d8b4fe", left: "34%", top: "64%", size: 34 },
  { color: "#f0f9ff", left: "58%", top: "24%", size: 30 },
  { color: "#f0f9ff", left: "26%", top: "70%", size: 32 },
  { color: "#fed7aa", left: "68%", top: "40%", size: 26 },
  { color: "#a5f3fc", left: "50%", top: "14%", size: 24 },
  { color: "#fca5a5", left: "6%",  top: "56%", size: 28 },
  { color: "#bbf7d0", left: "54%", top: "68%", size: 22 },
  { color: "#f0f9ff", left: "74%", top: "60%", size: 24 },
];

export default function GachaMachine({ isSpinning }) {
  return (
    <div className="flex flex-col items-center scale-[0.78] sm:scale-100 origin-top" style={{ userSelect: "none" }}>

      {/* Globe wrapper — ears + globe */}
      <div style={{ position: "relative", width: 240, height: 240 }}>

        {/* Bear ear left */}
        <div style={{
          position: "absolute", top: 10, left: 20, width: 46, height: 46,
          borderRadius: "50%", backgroundColor: "#fce7f3",
          border: "5px solid white",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          zIndex: 2,
        }} />
        <div style={{
          position: "absolute", top: 21, left: 31, width: 24, height: 24,
          borderRadius: "50%", backgroundColor: "#fbcfe8", zIndex: 3,
        }} />

        {/* Bear ear right */}
        <div style={{
          position: "absolute", top: 10, right: 20, width: 46, height: 46,
          borderRadius: "50%", backgroundColor: "#fce7f3",
          border: "5px solid white",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          zIndex: 2,
        }} />
        <div style={{
          position: "absolute", top: 21, right: 31, width: 24, height: 24,
          borderRadius: "50%", backgroundColor: "#fbcfe8", zIndex: 3,
        }} />

        {/* Globe */}
        <motion.div
          animate={isSpinning ? { rotate: [0, -3, 3, -2, 2, -1, 1, 0] } : {}}
          transition={{ duration: 0.55, repeat: isSpinning ? Infinity : 0, ease: "easeInOut" }}
          style={{
            position: "absolute", inset: 0,
            borderRadius: "50%", overflow: "hidden",
            background: "linear-gradient(145deg, rgba(240,249,255,0.96) 0%, rgba(186,230,255,0.65) 100%)",
            boxShadow: [
              "inset -18px -18px 35px rgba(0,0,0,0.07)",
              "inset 10px 10px 20px rgba(255,255,255,0.95)",
              "0 10px 40px rgba(0,0,0,0.12)",
              "0 0 0 5px white",
            ].join(", "),
          }}
        >
          {/* Balls */}
          {BALLS.map((ball, i) => (
            <motion.div
              key={i}
              animate={isSpinning ? {
                x: [0, (i % 2 ? 1 : -1) * (5 + (i % 4) * 3), (i % 2 ? -1 : 1) * 9, 0],
                y: [0, -7 + (i % 3) * 4, 11 - (i % 4) * 3, 0],
              } : {}}
              transition={{
                duration: 0.38 + i * 0.035,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.03,
              }}
              style={{
                position: "absolute",
                width: ball.size, height: ball.size,
                left: ball.left, top: ball.top,
                borderRadius: "50%",
                backgroundColor: ball.color,
                boxShadow: [
                  "inset -3px -3px 7px rgba(0,0,0,0.13)",
                  "inset 2px 2px 5px rgba(255,255,255,0.75)",
                  "0 2px 5px rgba(0,0,0,0.07)",
                ].join(", "),
              }}
            />
          ))}

          {/* Glass shine */}
          <div style={{
            position: "absolute", top: "11%", left: "16%",
            width: "36%", height: "22%",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.55)",
            transform: "rotate(-20deg)",
            pointerEvents: "none",
          }} />
        </motion.div>
      </div>

      {/* Neck */}
      <div style={{
        width: 60, height: 22,
        background: "linear-gradient(to bottom, #e2e8f0, #cbd5e1)",
        boxShadow: "inset 0 2px 4px rgba(0,0,0,0.08)",
      }} />

      {/* Base */}
      <div style={{
        width: 148, borderRadius: 18,
        padding: "14px 16px 16px",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
        background: "linear-gradient(165deg, #f8fafc 0%, #e2e8f0 100%)",
        boxShadow: [
          "0 10px 30px rgba(0,0,0,0.13)",
          "inset 0 1px 0 rgba(255,255,255,0.95)",
          "0 0 0 2px #e2e8f0",
        ].join(", "),
      }}>
        {/* Coin slot dekoratif */}
        <div style={{
          width: "82%", height: 9, borderRadius: 5,
          background: "linear-gradient(to right, #94a3b8, #64748b, #94a3b8)",
          boxShadow: "inset 0 2px 5px rgba(0,0,0,0.22)",
        }} />
        {/* Chrome plate dekoratif */}
        <div style={{
          width: "70%", height: 28, borderRadius: 8,
          background: "linear-gradient(to bottom, #e2e8f0, #cbd5e1)",
          boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1)",
        }} />
      </div>

      {/* Tray / chute at bottom */}
      <div style={{
        width: 80, height: 10, borderRadius: "0 0 8px 8px",
        background: "linear-gradient(to bottom, #cbd5e1, #94a3b8)",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }} />
    </div>
  );
}
