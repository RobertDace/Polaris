"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { X, Heart, Star, Sparkles, Send, CheckCircle2 } from "lucide-react";

interface PromiseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PromiseModal({ isOpen, onClose }: PromiseModalProps) {
  const [replyText, setReplyText] = useState("");
  const [submittedReply, setSubmittedReply] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      const saved = localStorage.getItem("polaris_naiqo_reply");
      if (saved) setSubmittedReply(saved);
    }
  }, [isOpen]);

  const handleSendReply = (msg?: string) => {
    const textToSend = msg || replyText;
    if (!textToSend.trim()) return;

    localStorage.setItem("polaris_naiqo_reply", textToSend);
    setSubmittedReply(textToSend);

    try {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.5 },
        colors: ["#FFD700", "#4ADE80", "#1D4ED8", "#FAF9F6"],
      });
    } catch {
      // Ignore in non-browser env
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-neutral-950/80 backdrop-blur-md transition-opacity animate-in fade-in duration-300 cursor-pointer"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-[#0f172a] text-slate-100 rounded-3xl border-2 border-amber-400/40 shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_60px_rgba(251,191,36,0.25)] p-6 sm:p-10 my-8 overflow-hidden z-10 animate-in zoom-in-95 duration-300">
        {/* Ornaments */}
        <div className="absolute -top-24 -left-24 w-52 h-52 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-52 h-52 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
          title="Tutup"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="flex flex-col items-center text-center pb-6 border-b border-white/10">
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-400 to-amber-200 text-neutral-950 flex items-center justify-center shadow-[0_0_25px_rgba(251,191,36,0.5)] mb-3">
            <Heart size={26} fill="currentColor" />
          </div>
          <span className="text-[10px] font-mono text-amber-300 tracking-widest uppercase">
            365 DAYS UNLOCKED SANCTUARY
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
            Surat Rahasia & Janji Robit
          </h2>
          <p className="text-xs font-mono text-emerald-400 mt-1">
            Untuk Naiqo — Polaris Hidupku
          </p>
        </div>

        {/* The Letter Content */}
        <div className="py-6 space-y-4 text-sm sm:text-base font-serif italic text-slate-200 leading-relaxed max-h-[55vh] overflow-y-auto pr-2">
          <p>
            Naiqo, setiap kali mengingat perjalanan bus Probolinggo menuju Jogja di tanggal 23 Juni 2026 kemarin, aku sadar satu hal: sejauh apa pun jaraknya, ujung dari perjalanan paling membahagiakan itu selalu adalah kamu.
          </p>
          <p>
            Dari percakapan subuh 02:14 AM, tawa kecil saat memasak Aglio Olio, sampai impianmu melihat salju dan katedral di Moscow—semua itu terpatri sangat jelas di kepalaku. Aku tidak pernah menganggap cerita kita sebagai kebetulan.
          </p>
          <p className="bg-amber-400/10 border border-amber-400/25 p-4 rounded-2xl not-italic text-amber-200 font-sans text-xs sm:text-sm font-medium">
            ✨ Genap 1 tahun (365 hari) kita mengorbit bersama sejak 13 Oktober 2025. Aku tahu saat ini aku masih banyak kekurangan, baik dari segi fisik maupun materi. Tapi kumohon, jangan menahan perasaanmu lagi karena rasa takut itu.
          </p>
          <p>
            Di film-film yang pernah kita tonton, mereka sering memilih berpisah demi impian masing-masing. Tapi aku tidak ingin kisah kita berakhir seperti itu. Bagiku, hubungan yang indah tidak harus selalu berakhir dengan perpisahan.
          </p>
          <p>
            Kamu adalah Polaris—Bintang Utaraku. Bintang penunjuk arah agar aku berjuang lebih keras, memantapkan langkah, menjadi pria yang mapan, dan kelak membuktikan bahwa aku pantas menjadi pasangan masa depanmu.
          </p>
          <p>
            Nanti, kita luangkan waktu lagi yaa untuk liburan ke kebun binatang, melihat burung Heartopia lagi, dan me-time di villa sambil Netflix and chill nonton film horor bareng kamu.
          </p>
          <p className="text-right not-italic font-mono text-xs text-amber-300 pt-2">
            Dengan segenap rasa dan tekadku,<br />
            <strong className="text-sm font-serif text-white">Robit.</strong>
          </p>
        </div>

        {/* Reply Section */}
        <div className="pt-5 border-t border-white/10 space-y-3">
          {submittedReply ? (
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} />
                <span>Pesanmu tersimpan: "{submittedReply}"</span>
              </div>
              <button
                onClick={() => setSubmittedReply(null)}
                className="underline text-[10px] text-slate-400 hover:text-white"
              >
                Ubah
              </button>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap gap-2 mb-2">
                <button
                  onClick={() => handleSendReply("Aku percaya padamu, Robit 💚")}
                  className="text-[11px] font-mono px-3 py-1.5 rounded-full bg-emerald-900/40 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-800/40 transition-colors"
                >
                  "Aku percaya padamu, Robit 💚"
                </button>
                <button
                  onClick={() => handleSendReply("Terima kasih sudah memilihku jadi Polarismu ✨")}
                  className="text-[11px] font-mono px-3 py-1.5 rounded-full bg-amber-900/40 border border-amber-500/30 text-amber-300 hover:bg-amber-800/40 transition-colors"
                >
                  "Terima kasih sudah memilihku ✨"
                </button>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ketik balasan untuk Robit..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSendReply();
                  }}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-500 text-xs font-sans focus:outline-none focus:border-amber-400"
                />
                <button
                  onClick={() => handleSendReply()}
                  className="px-4 py-2.5 rounded-xl bg-amber-400 text-neutral-950 text-xs font-bold font-mono hover:bg-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <Send size={13} />
                  <span>Kirim</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
