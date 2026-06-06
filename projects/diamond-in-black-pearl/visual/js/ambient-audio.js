/** Per-scene ambient audio with crossfade and user toggle. */

const AUDIO_FILES = {
  jungle: "../assets/audio/jungle.ogg",
  sea: "../assets/audio/sea.ogg",
  ship: "../assets/audio/ship.ogg",
};

/** @typedef {"jungle" | "sea" | "ship" | "none"} AmbientKey */

export class AmbientAudio {
  /** @type {HTMLAudioElement | null} */
  #current = null;

  /** @type {AmbientKey | null} */
  #currentKey = null;

  /** @type {boolean} */
  #enabled = false;

  /** @type {boolean} */
  #reducedMotion = false;

  /**
   * @param {HTMLButtonElement} toggleButton
   */
  constructor(toggleButton) {
    this.#reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    this.#enabled =
      !this.#reducedMotion &&
      localStorage.getItem("dibp-sound-enabled") === "true";
    this.#syncToggle(toggleButton);

    toggleButton.addEventListener("click", () => {
      if (this.#reducedMotion) {
        return;
      }
      this.#enabled = !this.#enabled;
      localStorage.setItem("dibp-sound-enabled", String(this.#enabled));
      this.#syncToggle(toggleButton);
      if (!this.#enabled) {
        this.#fadeOutCurrent();
      } else if (this.#currentKey && this.#currentKey !== "none") {
        this.setAmbient(this.#currentKey);
      }
    });
  }

  /** @param {HTMLButtonElement} toggleButton */
  #syncToggle(toggleButton) {
    toggleButton.setAttribute("aria-pressed", String(this.#enabled));
    toggleButton.disabled = this.#reducedMotion;
  }

  /** @param {AmbientKey | undefined} key */
  setAmbient(key) {
    this.#currentKey = key ?? "none";
    if (!this.#enabled || this.#reducedMotion || !key || key === "none") {
      this.#fadeOutCurrent();
      return;
    }

    const src = AUDIO_FILES[key];
    if (!src) {
      this.#fadeOutCurrent();
      return;
    }

    if (this.#current?.getAttribute("data-ambient-key") === key) {
      return;
    }

    const next = new Audio(src);
    next.setAttribute("data-ambient-key", key);
    next.setAttribute("data-testid", "dibp-ambient-audio");
    document.body.appendChild(next);
    next.loop = true;
    next.volume = 0;

    const previous = this.#current;
    this.#current = next;

    next
      .play()
      .then(() => {
        this.#fadeVolume(next, 0.35, 800);
      })
      .catch(() => {
        /* autoplay blocked until user gesture — toggle enables playback */
      });

    if (previous) {
      this.#fadeVolume(previous, 0, 600);
      window.setTimeout(() => {
        previous.pause();
      }, 650);
    }
  }

  /** @param {HTMLAudioElement} audio */
  #fadeOutCurrent() {
    if (!this.#current) {
      return;
    }
    const fading = this.#current;
    this.#current = null;
    this.#fadeVolume(fading, 0, 600);
    window.setTimeout(() => {
      fading.pause();
      fading.remove();
    }, 650);
  }

  /**
   * @param {HTMLAudioElement} audio
   * @param {number} target
   * @param {number} durationMs
   */
  #fadeVolume(audio, target, durationMs) {
    const start = audio.volume;
    const startTime = performance.now();

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      audio.volume = start + (target - start) * progress;
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }

  /** @returns {HTMLAudioElement | null} */
  getActiveElement() {
    return this.#current;
  }
}
