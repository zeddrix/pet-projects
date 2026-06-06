/** Main-thread client for the Pyodide Web Worker game engine. */

/** @typedef {{ write: (text: string) => void, onScene: (sceneId: string) => void, readInput: () => Promise<string>, onBootStatus?: (status: string) => void }} GameClientHandlers */

export const PYODIDE_VENDOR_PATH = "../vendor/pyodide/";

/**
 * @param {string} [relativeTo]
 * @returns {string}
 */
export function resolvePyodideBaseUrl(relativeTo) {
  if (relativeTo) {
    return new URL(PYODIDE_VENDOR_PATH, relativeTo).href;
  }
  return new URL(PYODIDE_VENDOR_PATH, import.meta.url).href;
}

export class GameClient {
  /** @type {Worker | null} */
  #worker = null;

  /** @type {GameClientHandlers | null} */
  #handlers = null;

  /** @type {boolean} */
  #readyMarked = false;

  /**
   * @param {GameClientHandlers} handlers
   */
  constructor(handlers) {
    this.#handlers = handlers;
  }

  /**
   * @param {string} workerUrl
   * @param {string} engineUrl
   * @param {string} pyodideBaseUrl
   */
  start(workerUrl, engineUrl, pyodideBaseUrl) {
    this.#handlers?.onBootStatus?.("Loading Python…");
    this.#worker = new Worker(workerUrl);
    this.#worker.onmessage = (event) => {
      this.#handleMessage(event.data);
    };
    this.#worker.onerror = (event) => {
      this.#handlers?.onBootStatus?.(
        `Error: ${event.message ?? "Worker failed"}`,
      );
    };
    this.#worker.postMessage({
      type: "start",
      pyodideBaseUrl,
      engineUrl: new URL(engineUrl, workerUrl).href,
    });
  }

  /** @param {string} line */
  submitInput(line) {
    this.#worker?.postMessage({ type: "input", line });
  }

  terminate() {
    this.#worker?.terminate();
    this.#worker = null;
  }

  /** @param {Record<string, unknown>} data */
  #handleMessage(data) {
    const handlers = this.#handlers;
    if (!handlers) {
      return;
    }

    switch (data.type) {
      case "write":
        handlers.write(String(data.text));
        break;
      case "scene":
        handlers.onScene(String(data.sceneId));
        break;
      case "boot_status":
        handlers.onBootStatus?.(String(data.status));
        break;
      case "read_request":
        this.#markReady();
        handlers.readInput().then((line) => {
          this.#worker?.postMessage({ type: "input", line });
        });
        break;
      case "error":
        handlers.onBootStatus?.(`Error: ${String(data.message)}`);
        break;
      default:
        break;
    }
  }

  #markReady() {
    if (this.#readyMarked) {
      return;
    }
    this.#readyMarked = true;
    const marker = document.querySelector('[data-testid="dibp-game-ready"]');
    if (marker instanceof HTMLElement) {
      marker.textContent = "ready";
    }
    document.dispatchEvent(new CustomEvent("dibp-game-ready"));
  }
}
