import { GameClient } from "../../shared/js/game-client.js";

const loader = document.getElementById("loader");
const bootStatus = document.getElementById("boot-status");
const startButton = document.getElementById("start-button");
const screen = document.getElementById("terminal-screen");
const output = document.getElementById("terminal-output");
const form = document.getElementById("terminal-form");
const input = document.getElementById("terminal-input");
const sceneTitle = document.getElementById("terminal-scene-title");

if (
  !(loader instanceof HTMLElement) ||
  !(bootStatus instanceof HTMLElement) ||
  !(startButton instanceof HTMLButtonElement) ||
  !(screen instanceof HTMLElement) ||
  !(output instanceof HTMLElement) ||
  !(form instanceof HTMLFormElement) ||
  !(input instanceof HTMLInputElement) ||
  !(sceneTitle instanceof HTMLElement)
) {
  throw new Error("Terminal elements missing");
}

/** @type {((value: string) => void) | null} */
let pendingResolve = null;

/** @type {GameClient | null} */
let gameClient = null;

/** @type {string} */
let lastBootStatus = bootStatus.textContent ?? "";

/** @param {string} status */
function updateBootStatus(status) {
  lastBootStatus = status;
  bootStatus.textContent = status;
  bootStatus.dataset.stage = status;
}

/** @param {string} text */
function appendOutput(text) {
  output.textContent += text;
  output.scrollTop = output.scrollHeight;
}

/** @returns {Promise<string>} */
function readInput() {
  input.disabled = false;
  input.focus();
  return new Promise((resolve) => {
    pendingResolve = resolve;
  });
}

/** @param {string} sceneId */
function handleScene(sceneId) {
  const labels = {
    intro: "Welcome",
    jungle_fork: "Uncharted Jungle",
    death: "You Died",
    checkpoint_death: "Checkpoint — You Died",
    victory: "Victory!",
  };
  sceneTitle.textContent =
    labels[sceneId] ?? sceneId.replaceAll("_", " ");
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
    gameClient?.submitInput(line);
  }
});

document.addEventListener("dibp-game-ready", () => {
  loader.hidden = true;
  screen.hidden = false;
});

startButton.addEventListener("click", () => {
  startButton.disabled = true;
  updateBootStatus("Loading Python…");

  const workerUrl = new URL(
    "../../shared/js/pyodide-worker.js",
    import.meta.url,
  );
  const engineUrl = new URL("../../engine.py", import.meta.url).href;
  const pyodideBaseUrl = new URL("../../vendor/pyodide/", import.meta.url).href;

  gameClient = new GameClient({
    write: appendOutput,
    onScene: handleScene,
    readInput,
    onBootStatus: updateBootStatus,
  });

  gameClient.start(workerUrl.href, engineUrl, pyodideBaseUrl);
});
