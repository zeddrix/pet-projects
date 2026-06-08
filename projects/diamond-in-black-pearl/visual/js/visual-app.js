import { AmbientAudio } from "./ambient-audio.js";
import { GameClient } from "../../shared/js/game-client.js";
import { bootDibpGame } from "../../shared/js/dibp-boot.js";
import {
  highlightMapNode,
  loadMap,
  markCheckpoint,
  resetVisitedMap,
} from "./adventure-map.js";
import {
  appendNarrative,
  renderChoices,
  renderSceneArt,
  renderTitle,
  setCheckpointVisible,
  setChoicesEnabled,
  setInventoryVisible,
} from "./scene-renderer.js";

const DIBP_STORAGE_KEYS = [
  "dibp-inventory",
  "dibp-checkpoint",
  "dibp-player-name",
  "dibp-sound-enabled",
];

const loader = document.getElementById("loader");
const bootStatus = document.getElementById("boot-status");
const startButton = document.getElementById("start-button");
const layout = document.getElementById("game-layout");
const sceneTitle = document.getElementById("scene-title");
const sceneImage = document.getElementById("scene-image");
const narrativeLog = document.getElementById("narrative-log");
const choiceButtons = document.getElementById("choice-buttons");
const adventureMap = document.getElementById("adventure-map");
const inventory = document.getElementById("inventory");
const checkpointBadge = document.getElementById("checkpoint-badge");
const typedForm = document.getElementById("typed-form");
const typedInput = document.getElementById("typed-input");
const namePanel = document.getElementById("name-panel");
const nameForm = document.getElementById("name-form");
const nameInput = document.getElementById("name-input");
const soundToggle = document.getElementById("sound-toggle");

if (
  !(loader instanceof HTMLElement) ||
  !(bootStatus instanceof HTMLElement) ||
  !(startButton instanceof HTMLButtonElement) ||
  !(layout instanceof HTMLElement) ||
  !(sceneTitle instanceof HTMLElement) ||
  !(sceneImage instanceof HTMLImageElement) ||
  !(narrativeLog instanceof HTMLElement) ||
  !(choiceButtons instanceof HTMLElement) ||
  !(adventureMap instanceof HTMLElement) ||
  !(inventory instanceof HTMLElement) ||
  !(checkpointBadge instanceof HTMLElement) ||
  !(typedForm instanceof HTMLFormElement) ||
  !(typedInput instanceof HTMLInputElement) ||
  !(namePanel instanceof HTMLElement) ||
  !(nameForm instanceof HTMLFormElement) ||
  !(nameInput instanceof HTMLInputElement) ||
  !(soundToggle instanceof HTMLButtonElement)
) {
  throw new Error("Visual game elements missing");
}

/** @type {Record<string, import("./scene-renderer.js").SceneDef>} */
let scenes = {};

/** @type {((value: string) => void) | null} */
let pendingResolve = null;

/** @type {boolean} */
let inputEnabled = false;

/** @type {boolean} */
let awaitingName = false;

/** @type {boolean} */
let hasInventory = false;

/** @type {boolean} */
let hasCheckpoint = false;

/** @type {string | null} */
let currentSceneId = null;

/** @type {GameClient | null} */
let gameClient = null;

/** @type {AmbientAudio | null} */
let ambientAudio = null;

/** @param {string} status */
function updateBootStatus(status) {
  bootStatus.textContent = status;
  bootStatus.dataset.stage = status;
}

function clearDibpProgress() {
  for (const key of DIBP_STORAGE_KEYS) {
    if (key !== "dibp-sound-enabled") {
      localStorage.removeItem(key);
    }
  }
  hasInventory = false;
  hasCheckpoint = false;
  setInventoryVisible(inventory, false);
  setCheckpointVisible(checkpointBadge, false);
}

/** @param {string} line */
/** @param {string} [label] */
function submitAnswer(line, label) {
  if (!pendingResolve) {
    return;
  }
  if (label) {
    appendNarrative(narrativeLog, `${label}\n`);
  }
  inputEnabled = false;
  setChoicesEnabled(choiceButtons, false);
  const resolve = pendingResolve;
  pendingResolve = null;
  resolve(line);
}

/** @returns {Promise<string>} */
function readInput() {
  if (awaitingName || currentSceneId === "intro") {
    namePanel.hidden = false;
    const savedName = localStorage.getItem("dibp-player-name");
    if (savedName && !nameInput.value) {
      nameInput.value = savedName;
    }
    nameInput.focus();
  } else {
    inputEnabled = true;
    setChoicesEnabled(choiceButtons, true);
  }

  return new Promise((resolve) => {
    pendingResolve = resolve;
  });
}

/** @param {string} sceneId */
function handleSceneChange(sceneId) {
  const previousScene = currentSceneId;
  currentSceneId = sceneId;

  if (sceneId === "intro" && previousScene === "death") {
    clearDibpProgress();
    resetVisitedMap();
  }

  if (sceneId === "intro") {
    awaitingName = true;
    namePanel.hidden = false;
    choiceButtons.replaceChildren();
  } else {
    awaitingName = false;
    namePanel.hidden = true;
  }

  inputEnabled = false;

  const scene = scenes[sceneId];
  renderTitle(sceneTitle, scene);
  if (scene) {
    renderSceneArt(sceneImage, scene);
    highlightMapNode(adventureMap, scene.mapNode, Boolean(scene.checkpoint));
    if (!awaitingName) {
      renderChoices(choiceButtons, scene, submitAnswer, false);
    }
    ambientAudio?.setAmbient(scene.ambient ?? "none");
  }
  if (scene?.inventory === "chest") {
    hasInventory = true;
    setInventoryVisible(inventory, true);
  }
  if (scene?.checkpoint) {
    hasCheckpoint = true;
    setCheckpointVisible(checkpointBadge, true);
    markCheckpoint(adventureMap);
  }
  if (sceneId === "victory") {
    choiceButtons.replaceChildren();
  }

  if (hasInventory) {
    localStorage.setItem("dibp-inventory", "true");
  }
  if (hasCheckpoint) {
    localStorage.setItem("dibp-checkpoint", "true");
  }
}

typedForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const line = typedInput.value.trim();
  if (!line) {
    return;
  }
  typedInput.value = "";
  appendNarrative(narrativeLog, `${line}\n`);
  submitAnswer(line);
});

nameForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const line = nameInput.value.trim();
  if (!line) {
    return;
  }
  localStorage.setItem("dibp-player-name", line);
  namePanel.hidden = true;
  awaitingName = false;
  appendNarrative(narrativeLog, `${line}\n`);
  submitAnswer(line);
});

document.addEventListener("dibp-game-ready", () => {
  loader.hidden = true;
  layout.hidden = false;
});

startButton.addEventListener("click", async () => {
  startButton.disabled = true;

  gameClient = new GameClient({
    write: (text) => {
      appendNarrative(narrativeLog, text);
    },
    onScene: handleSceneChange,
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
      await loadMap(adventureMap);

      const savedInventory = localStorage.getItem("dibp-inventory") === "true";
      const savedCheckpoint = localStorage.getItem("dibp-checkpoint") === "true";
      if (savedInventory) {
        hasInventory = true;
        setInventoryVisible(inventory, true);
      }
      if (savedCheckpoint) {
        hasCheckpoint = true;
        setCheckpointVisible(checkpointBadge, true);
      }

      ambientAudio = new AmbientAudio(soundToggle);
    },
  });
});
