import { loadPyodideRuntime, startEngine } from "../../shared/js/game-bridge.js";
import {
  highlightMapNode,
  loadMap,
  markCheckpoint,
} from "./adventure-map.js";
import {
  appendNarrative,
  renderChoices,
  renderSceneArt,
  renderTitle,
  setCheckpointVisible,
  setInventoryVisible,
} from "./scene-renderer.js";

const loader = document.getElementById("loader");
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

if (
  !(loader instanceof HTMLElement) ||
  !(layout instanceof HTMLElement) ||
  !(sceneTitle instanceof HTMLElement) ||
  !(sceneImage instanceof HTMLImageElement) ||
  !(narrativeLog instanceof HTMLElement) ||
  !(choiceButtons instanceof HTMLElement) ||
  !(adventureMap instanceof HTMLElement) ||
  !(inventory instanceof HTMLElement) ||
  !(checkpointBadge instanceof HTMLElement) ||
  !(typedForm instanceof HTMLFormElement) ||
  !(typedInput instanceof HTMLInputElement)
) {
  throw new Error("Visual game elements missing");
}

/** @type {Record<string, import("./scene-renderer.js").SceneDef>} */
let scenes = {};

/** @type {((value: string) => void) | null} */
let pendingResolve = null;

let hasInventory = false;
let hasCheckpoint = false;

/** @param {string} line */
function submitAnswer(line) {
  if (pendingResolve) {
    const resolve = pendingResolve;
    pendingResolve = null;
    resolve(line);
  }
}

/** @returns {Promise<string>} */
function readInput() {
  return new Promise((resolve) => {
    pendingResolve = resolve;
  });
}

/** @param {string} sceneId */
function handleSceneChange(sceneId) {
  const scene = scenes[sceneId];
  renderTitle(sceneTitle, scene);
  if (scene) {
    renderSceneArt(sceneImage, scene);
    highlightMapNode(adventureMap, scene.mapNode, Boolean(scene.checkpoint));
    renderChoices(choiceButtons, scene, submitAnswer);
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

(async () => {
  try {
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

    const pyodide = await loadPyodideRuntime();
    loader.hidden = true;
    layout.hidden = false;

    await startEngine(
      pyodide,
      {
        write: (text) => {
          appendNarrative(narrativeLog, text);
        },
        onScene: (sceneId) => {
          handleSceneChange(sceneId);
          if (hasInventory) {
            localStorage.setItem("dibp-inventory", "true");
          }
          if (hasCheckpoint) {
            localStorage.setItem("dibp-checkpoint", "true");
          }
        },
        readInput,
      },
      "../engine.py",
    );
  } catch (error) {
    loader.innerHTML = `<p>Failed to start adventure: ${error instanceof Error ? error.message : "Unknown error"}</p>`;
  }
})();
