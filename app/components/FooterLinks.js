"use client";

import { useState } from "react";

const MODAL_CONTENT = {
  privacy: {
    title: "Privacy Policy",
    body: `
Topik Nongkrong ("kami") berkomitmen untuk melindungi privasi pengguna.

**Data yang dikumpulkan**
Kami tidak mengumpulkan data pribadi apapun. Semua data (riwayat topik, preferensi bahasa, tema) disimpan secara lokal di perangkat lo sendiri menggunakan localStorage dan tidak pernah dikirim ke server kami.

**Cookie & Iklan**
Website ini mungkin menampilkan iklan dari Google AdSense. Google menggunakan cookie untuk menampilkan iklan yang relevan berdasarkan kunjungan lo ke website ini dan website lainnya. Lo bisa opt-out melalui Google Ads Settings.

**Layanan Pihak Ketiga**
- Google Analytics / Search Console: untuk memantau traffic website secara agregat (anonim).
- Vercel: sebagai platform hosting website ini.

**Perubahan Kebijakan**
Kebijakan ini dapat berubah sewaktu-waktu. Perubahan akan dipublikasikan di halaman ini.

**Kontak**
Pertanyaan seputar privasi? Hubungi kami melalui Email jodra.work@gmail.com.

Terakhir diperbarui: Maret 2026.
    `.trim(),
  },
  about: {
    title: "Tentang Topik Nongkrong",
    body: `
**Topik Nongkrong** adalah web tool gratis yang dibuat buat lo yang sering bingung mau bahas apa pas lagi kumpul sama teman-teman.

Tinggal pencet tombol Putar, dan lo langsung dapet topik obrolan — mulai dari Deep Talk, Cinta, Nostalgia, Gibah Sehat, Horror, sampai Chaos Mode.

**Fitur:**
- 🎰 Spin roulette topik random
- 📂 Filter berdasarkan kategori
- 🌙 Dark mode
- 🌐 Bahasa Indonesia & English
- 📱 Bisa dibuka dari HP

Dibuat iseng oleh Muhammad Jodra Armiza, fullstack developer.
    `.trim(),
  },
  contact: {
    title: "Kontak",
    body: `
Ada masukan, ide topik baru, atau mau kerja sama?

🐙 GitHub: github.com/jodraarmiza

Gua terbuka buat segala feedback — terutama kalau ada topik yang pengen lo tambahin ke website ini!
    `.trim(),
  },
};

function Modal({ content, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-2xl max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            {content.title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-2xl leading-none"
          >
            ×
          </button>
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed space-y-3">
          {content.body.split("\n").map((line, i) => {
            if (line.startsWith("**") && line.endsWith("**")) {
              return (
                <p key={i} className="font-semibold text-gray-800 dark:text-gray-200">
                  {line.slice(2, -2)}
                </p>
              );
            }
            if (line.startsWith("- ")) {
              return <p key={i} className="ml-3">{line}</p>;
            }
            return line ? <p key={i}>{line}</p> : null;
          })}
        </div>
      </div>
    </div>
  );
}

export default function FooterLinks() {
  const [activeModal, setActiveModal] = useState(null);

  return (
    <>
      <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-gray-600">
        <button
          onClick={() => setActiveModal("about")}
          className="hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
        >
          About
        </button>
        <span>·</span>
        <button
          onClick={() => setActiveModal("privacy")}
          className="hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
        >
          Privacy Policy
        </button>
        <span>·</span>
        <button
          onClick={() => setActiveModal("contact")}
          className="hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
        >
          Contact
        </button>
      </div>

      {activeModal && (
        <Modal
          content={MODAL_CONTENT[activeModal]}
          onClose={() => setActiveModal(null)}
        />
      )}
    </>
  );
}
