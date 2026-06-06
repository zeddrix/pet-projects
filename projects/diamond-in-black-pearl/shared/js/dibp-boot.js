/**
 * Shared Pyodide boot for visual and terminal demos.
 */
import { GameClient } from "./game-client.js";

/**
 * @param {object} options
 * @param {() => void} options.onBootStart
 * @param {GameClient} options.gameClient
 * @param {URL} options.moduleUrl
 * @param {() => Promise<void>} [options.beforeStart]
 */
export async function bootDibpGame({
  onBootStart,
  gameClient,
  moduleUrl,
  beforeStart,
}) {
  onBootStart();
  if (beforeStart) {
    await beforeStart();
  }

  const workerUrl = new URL("../../shared/js/pyodide-worker.js", moduleUrl);
  const engineUrl = new URL("../../engine.py", moduleUrl).href;
  const pyodideBaseUrl = new URL("../../vendor/pyodide/", moduleUrl).href;

  gameClient.start(workerUrl.href, engineUrl, pyodideBaseUrl);
}
