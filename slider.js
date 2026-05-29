/**
 * slider.js
 * Handles navigation, autoplay, progress bar, dot indicators,
 * touch/swipe, and keyboard controls for the image slider.
 */

(function () {
  "use strict";

  // ── Config ──────────────────────────────────────────────
  const INTERVAL = 4000; // autoplay interval in ms

  // ── State ───────────────────────────────────────────────
  let current = 0;
  let playing = true;
  let progressRaf = null;
  let progressStart = null;
  let touchStartX = 0;

  // ── DOM refs ────────────────────────────────────────────
  const track = document.getElementById("track");
  const dotsEl = document.getElementById("dots");
  const counter = document.getElementById("counter");
  const playBtn = document.getElementById("playBtn");
  const playIcon = document.getElementById("playIcon");
  const playLabel = document.getElementById("playLabel");
  const progressBar = document.getElementById("progress");
  const sliderEl = document.getElementById("slider");
  const slides = track.querySelectorAll(".slide");
  const total = slides.length;

  // ── Dot indicators ──────────────────────────────────────
  const dots = [];

  function buildDots() {
    for (let i = 0; i < total; i++) {
      const d = document.createElement("button");
      d.className = "dot" + (i === 0 ? " active" : "");
      d.setAttribute("role", "tab");
      d.setAttribute("aria-label", "Go to slide " + (i + 1));
      d.setAttribute("aria-selected", i === 0 ? "true" : "false");
      d.addEventListener("click", () => goTo(i));
      dotsEl.appendChild(d);
      dots.push(d);
    }
  }

  // ── Navigation ──────────────────────────────────────────
  function goTo(idx) {
    current = (idx + total) % total;
    track.style.transform = "translateX(-" + current * 100 + "%)";

    dots.forEach((d, i) => {
      d.classList.toggle("active", i === current);
      d.setAttribute("aria-selected", i === current ? "true" : "false");
    });

    counter.textContent = current + 1 + " / " + total;

    if (playing) restartProgress();
  }

  function next() {
    goTo(current + 1);
  }
  function prev() {
    goTo(current - 1);
  }

  // ── Progress bar ────────────────────────────────────────
  function startProgress() {
    stopProgress();
    progressStart = performance.now();

    function frame(now) {
      const elapsed = now - progressStart;
      const pct = Math.min((elapsed / INTERVAL) * 100, 100);
      progressBar.style.width = pct + "%";

      if (pct < 100) {
        progressRaf = requestAnimationFrame(frame);
      } else {
        next();
      }
    }

    progressRaf = requestAnimationFrame(frame);
  }

  function stopProgress() {
    if (progressRaf) cancelAnimationFrame(progressRaf);
    progressRaf = null;
    progressBar.style.width = "0%";
  }

  function restartProgress() {
    stopProgress();
    startProgress();
  }

  // ── Play / Pause ─────────────────────────────────────────
  function togglePlay() {
    playing = !playing;

    if (playing) {
      playIcon.className = "ti ti-player-pause";
      playLabel.textContent = "Pause";
      startProgress();
    } else {
      playIcon.className = "ti ti-player-play";
      playLabel.textContent = "Play";
      stopProgress();
    }
  }

  // ── Event listeners ──────────────────────────────────────
  function bindEvents() {
    document.getElementById("next").addEventListener("click", () => {
      next();
      if (!playing) stopProgress();
    });

    document.getElementById("prev").addEventListener("click", () => {
      prev();
      if (!playing) stopProgress();
    });

    playBtn.addEventListener("click", togglePlay);

    // Pause on hover
    sliderEl.addEventListener("mouseenter", () => {
      if (playing) stopProgress();
    });
    sliderEl.addEventListener("mouseleave", () => {
      if (playing) restartProgress();
    });

    // Touch / swipe
    sliderEl.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.touches[0].clientX;
      },
      { passive: true },
    );

    sliderEl.addEventListener("touchend", (e) => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 40) {
        dx < 0 ? next() : prev();
      }
    });

    // Keyboard
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    });
  }

  // ── Init ─────────────────────────────────────────────────
  function init() {
    buildDots();
    bindEvents();
    startProgress();
  }

  init();
})();
