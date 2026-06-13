"use client";

import { useEffect, useState } from "react";

export default function EffectsLab() {
  const [modal, setModal] = useState(false);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(false), 3200);
    return () => clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setModal(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setModal(true)}
          className="glass glass-strong glass-pill px-6 py-3 text-sm font-semibold text-white transition hover:brightness-125"
        >
          Open glass modal
        </button>
        <button
          onClick={() => setToast(true)}
          className="glass glass-pill px-6 py-3 text-sm font-semibold text-white transition hover:brightness-125"
        >
          Fire a toast
        </button>
      </div>

      {/* Modal */}
      {modal && (
        <div
          className="fixed inset-0 z-[80] grid place-items-center px-4"
          onClick={() => setModal(false)}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div
            onClick={(e) => e.stopPropagation()}
            className="glass glass-strong glass-refract relative w-full max-w-md rounded-3xl p-7"
            style={{ animation: "rise 0.4s cubic-bezier(0.16,1,0.3,1) both" }}
          >
            <h3 className="text-2xl">A glass dialog</h3>
            <p className="mt-2 text-sm text-haze/80">
              Same one class. The backdrop behind this modal is genuinely lensed
              and the rim catches the light — no screenshot, no fake blur.
            </p>
            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setModal(false)}
                className="glass glass-pill px-5 py-2 text-sm font-medium text-white transition hover:brightness-125"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div
          className="glass glass-strong fixed bottom-6 left-1/2 z-[80] flex -translate-x-1/2 items-center gap-3 rounded-2xl px-5 py-3.5"
          style={{ animation: "rise 0.35s cubic-bezier(0.16,1,0.3,1) both" }}
        >
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: "#34e0a1", boxShadow: "0 0 10px #34e0a1" }}
          />
          <span className="text-sm font-medium text-white">
            Saved — glass toast, fully refracted.
          </span>
        </div>
      )}
    </>
  );
}
