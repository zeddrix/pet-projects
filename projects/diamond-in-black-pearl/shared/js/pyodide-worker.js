/** Web Worker: loads Pyodide + engine.py off the main thread. */

/** @type {((value: string) => void) | null} */
let pendingInputResolve = null;

/** @param {MessageEvent} event */
self.onmessage = async (event) => {
  const data = event.data;

  if (data.type === "start") {
    try {
      const { pyodideBaseUrl, engineUrl } = data;
      importScripts(`${pyodideBaseUrl}pyodide.js`);
      // @ts-expect-error loadPyodide global from pyodide.js
      const pyodide = await loadPyodide({ indexURL: pyodideBaseUrl });

      const bridge = {
        write: (text) => {
          self.postMessage({ type: "write", text: String(text) });
        },
        onScene: (sceneId) => {
          self.postMessage({ type: "scene", sceneId: String(sceneId) });
        },
        readInput: () => {
          return new Promise((resolve) => {
            pendingInputResolve = resolve;
            self.postMessage({ type: "read_request" });
          });
        },
      };

      self.workerBridge = bridge;
      pyodide.globals.set("workerBridge", bridge);

      const engineResponse = await fetch(engineUrl);
      if (!engineResponse.ok) {
        throw new Error(`Failed to fetch engine.py (${engineResponse.status})`);
      }
      const engineCode = await engineResponse.text();
      await pyodide.runPythonAsync(engineCode);

      self.postMessage({ type: "boot_status", status: "Starting game…" });

      await pyodide.runPythonAsync(`
from pyodide.ffi import run_sync
from js import workerBridge

class BrowserIO:
    def write(self, text: str) -> None:
        workerBridge.write(text)

    def read(self, prompt: str = ">>> ") -> str:
        if prompt:
            self.write(prompt)
        return str(run_sync(workerBridge.readInput()))

    def on_scene(self, scene_id: str) -> None:
        workerBridge.onScene(scene_id)

run_game(BrowserIO())
`);
    } catch (error) {
      self.postMessage({
        type: "error",
        message: error instanceof Error ? error.message : String(error),
      });
    }
  } else if (data.type === "input") {
    if (pendingInputResolve) {
      const resolve = pendingInputResolve;
      pendingInputResolve = null;
      resolve(String(data.line));
    }
  }
};
