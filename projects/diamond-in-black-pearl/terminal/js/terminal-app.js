import { GameClient } from "../../shared/js/game-client.js";
import { bootDibpGame } from "../../shared/js/dibp-boot.js";

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

/** @type {Record<string, { title: string }>} */
let scenes = {};

/** @param {string} status */
function updateBootStatus(status) {
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
  sceneTitle.textContent =
    scenes[sceneId]?.title ?? sceneId.replaceAll("_", " ");
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
  }
});

document.addEventListener("dibp-game-ready", () => {
  loader.hidden = true;
  screen.hidden = false;
});

startButton.addEventListener("click", async () => {
  startButton.disabled = true;

  gameClient = new GameClient({
    write: appendOutput,
    onScene: handleScene,
    readInput,
    onBootStatus: updateBootStatus,
  });

  await bootDibpGame({
    onBootStart: () => updateBootStatus("Loading Python…"),
    gameClient,
    moduleUrl: import.meta.url,
    beforeStart: async () => {
      const scenesResponse = await fetch("../scenes.json");
      scenes = await scenesResponse.json();
    },
  });
});
