/** Shared Pyodide boot + browser GameIO bridge for Diamond in Black Pearl. */

const PYODIDE_CDN = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/";

/** @typedef {{ write: (text: string) => void, onScene: (sceneId: string) => void, readInput: () => Promise<string> }} GameBridgeHandlers */

/** @type {Promise<import("pyodide").PyodideAPI> | null} */
let pyodidePromise = null;

/**
 * @param {() => void} [onProgress]
 * @returns {Promise<import("pyodide").PyodideAPI>}
 */
export async function loadPyodideRuntime(onProgress) {
  if (pyodidePromise) {
    return pyodidePromise;
  }

  pyodidePromise = (async () => {
    onProgress?.();
    const script = document.createElement("script");
    script.src = `${PYODIDE_CDN}pyodide.js`;
    script.async = true;
    document.head.appendChild(script);
    await new Promise((resolve, reject) => {
      script.onload = resolve;
      script.onerror = reject;
    });

    // @ts-expect-error pyodide global from CDN script
    const pyodide = await loadPyodide({ indexURL: PYODIDE_CDN });
    return pyodide;
  })();

  return pyodidePromise;
}

/**
 * @param {import("pyodide").PyodideAPI} pyodide
 * @param {GameBridgeHandlers} handlers
 * @param {string} engineUrl
 */
export async function startEngine(pyodide, handlers, engineUrl) {
  /** @type {((value: string) => void) | null} */
  let inputResolve = null;

  globalThis.gameBridge = {
    write: (text) => {
      handlers.write(String(text));
    },
    onScene: (sceneId) => {
      handlers.onScene(String(sceneId));
    },
    readInput: () => {
      if (handlers.readInput) {
        return handlers.readInput();
      }
      return new Promise((resolve) => {
        inputResolve = resolve;
      });
    },
  };

  /** @param {string} line */
  globalThis.submitGameInput = (line) => {
    if (inputResolve) {
      const resolve = inputResolve;
      inputResolve = null;
      resolve(line);
    } else if (handlers.readInput) {
      /* handled externally */
    }
  };

  const engineResponse = await fetch(engineUrl);
  const engineCode = await engineResponse.text();
  await pyodide.runPythonAsync(engineCode);

  await pyodide.runPythonAsync(`
from pyodide.ffi import run_sync
from js import gameBridge

class BrowserIO:
    def write(self, text: str) -> None:
        gameBridge.write(text)

    def read(self, prompt: str = ">>> ") -> str:
        if prompt:
            self.write(prompt)
        return str(run_sync(gameBridge.readInput()))

    def on_scene(self, scene_id: str) -> None:
        gameBridge.onScene(scene_id)

from engine import run_game
run_game(BrowserIO())
`);
}

/**
 * @param {string} line
 */
export function submitLine(line) {
  if (typeof globalThis.submitGameInput === "function") {
    globalThis.submitGameInput(line);
  }
}
