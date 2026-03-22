"use client";

/**
 * AdSlot — placeholder buat Google AdSense atau ads lainnya.
 * Ganti isi div placeholder dengan tag <ins> AdSense asli kalau udah dapet approval.
 *
 * size:
 *   "banner"    → 320×50 mobile / 728×90 desktop
 *   "rectangle" → 300×250
 */
export default function AdSlot({ size = "rectangle", className = "" }) {
  const isRectangle = size === "rectangle";

  return (
    <div
      className={`
        flex items-center justify-center overflow-hidden rounded-2xl
        border border-dashed border-gray-200 dark:border-gray-700
        bg-gray-50 dark:bg-gray-800/50
        text-xs text-gray-400 dark:text-gray-600 font-medium tracking-wide
        w-full max-w-xl
        ${isRectangle ? "h-[100px] sm:h-[120px]" : "h-[60px] sm:h-[90px]"}
        ${className}
      `}
    >
      {/* Ganti div ini dengan tag <ins> AdSense asli */}
      <div className="flex flex-col items-center gap-1 select-none pointer-events-none">
        <span>Advertisement</span>
        <span className="opacity-50">{isRectangle ? "300×250" : "320×50 / 728×90"}</span>
      </div>
    </div>
  );
}
