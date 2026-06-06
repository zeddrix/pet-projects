import {
  loadPyodideRuntime,
  startEngine,
  submitLine,
} from "../../shared/js/game-bridge.js";

const loader = document.getElementById("loader");
const screen = document.getElementById("terminal-screen");
const output = document.getElementById("terminal-output");
const form = document.getElementById("terminal-form");
const input = document.getElementById("terminal-input");

if (
  !(loader instanceof HTMLElement) ||
  !(screen instanceof HTMLElement) ||
  !(output instanceof HTMLElement) ||
  !(form instanceof HTMLFormElement) ||
  !(input instanceof HTMLInputElement)
) {
  throw new Error("Terminal elements missing");
}

/** @type {((value: string) => void) | null} */
let pendingResolve = null;

/** @returns {Promise<string>} */
function readInput() {
  input.disabled = false;
  input.focus();
  return new Promise((resolve) => {
    pendingResolve = resolve;
  });
}

/** @param {string} text */
function appendOutput(text) {
  output.textContent += text;
  output.scrollTop = output.scrollHeight;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const line = input.value;
  input.value = "";
  input.disabled = true;
  appendOutput(`${line}\n`);
  if (pendingResolve) {
    const resolve = pendingResolve;
    pendingResolve = null;
    resolve(line);
  } else {
    submitLine(line);
  }
});

(async () => {
  try {
    const pyodide = await loadPyodideRuntime();
    loader.hidden = true;
    screen.hidden = false;

    await startEngine(
      pyodide,
      {
        write: appendOutput,
        onScene: () => {},
        readInput,
      },
      "../engine.py",
    );
  } catch (error) {
    loader.innerHTML = `<p>Failed to start game: ${error instanceof Error ? error.message : "Unknown error"}</p>`;
  }
})();
