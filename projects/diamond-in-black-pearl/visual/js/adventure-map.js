/** Adventure map node highlighting. */

/** @param {HTMLElement} container */
export async function loadMap(container) {
  const response = await fetch("../assets/map/adventure-map.svg");
  container.innerHTML = await response.text();
}

/** @type {Set<string>} */
const visited = new Set();

/** @param {HTMLElement} container */
/** @param {string} nodeId */
/** @param {boolean} [isCheckpoint] */
export function highlightMapNode(container, nodeId, isCheckpoint = false) {
  visited.add(nodeId);

  const nodes = container.querySelectorAll("[data-node]");
  for (const node of nodes) {
    if (!(node instanceof SVGElement)) {
      continue;
    }
    const id = node.getAttribute("data-node");
    node.classList.remove(
      "map-node--current",
      "map-node--visited",
      "map-node--checkpoint-active",
    );
    if (id && visited.has(id)) {
      node.classList.add("map-node--visited");
    }
    if (id === nodeId) {
      node.classList.add("map-node--current");
    }
    if (id === "ship" && isCheckpoint) {
      node.classList.add("map-node--checkpoint-active");
    }
  }
}

export function markCheckpoint(container) {
  const ship = container.querySelector('[data-node="ship"]');
  if (ship instanceof SVGElement) {
    ship.classList.add("map-node--checkpoint-active");
  }
}
