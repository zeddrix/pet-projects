/** Scene image + choice button rendering. */

/**
 * @typedef {{ label: string, submit: string }} SceneChoice
 * @typedef {{ title: string, art: string, artAlt: string, mapNode: string, choices?: SceneChoice[], secrets?: SceneChoice[], checkpoint?: boolean, inventory?: string }} SceneDef
 */

/** @param {HTMLImageElement} img */
/** @param {SceneDef} scene */
export function renderSceneArt(img, scene) {
  img.dataset.testid = "dibp-scene-art";
  img.classList.add("is-fading");
  window.setTimeout(() => {
    img.src = scene.art;
    img.alt = scene.artAlt;
    img.classList.remove("is-fading");
  }, 200);
}

/**
 * @param {HTMLElement} container
 * @param {SceneDef | undefined} scene
 * @param {(submit: string, label: string) => void} onChoice
 * @param {boolean} [inputEnabled]
 */
export function renderChoices(container, scene, onChoice, inputEnabled = false) {
  container.replaceChildren();

  if (!scene) {
    return;
  }

  for (const choice of scene.choices ?? []) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice-btn";
    button.dataset.testid = `dibp-choice-${choice.submit}`;
    button.textContent = choice.label;
    button.disabled = !inputEnabled;
    button.addEventListener("click", () => {
      if (!button.disabled) {
        onChoice(choice.submit, choice.label);
      }
    });
    container.appendChild(button);
  }
}

/** @param {HTMLElement} container */
/** @param {boolean} enabled */
export function setChoicesEnabled(container, enabled) {
  for (const button of container.querySelectorAll("button")) {
    if (button instanceof HTMLButtonElement) {
      button.disabled = !enabled;
    }
  }
}

/** @param {HTMLElement} titleEl */
/** @param {SceneDef | undefined} scene */
export function renderTitle(titleEl, scene) {
  titleEl.textContent = scene?.title ?? "Visual Adventure";
}

/** @param {HTMLElement} inventoryEl */
/** @param {boolean} visible */
export function setInventoryVisible(inventoryEl, visible) {
  inventoryEl.hidden = !visible;
}

/** @param {HTMLElement} checkpointEl */
/** @param {boolean} visible */
export function setCheckpointVisible(checkpointEl, visible) {
  checkpointEl.hidden = !visible;
}

/** @param {HTMLElement} logEl */
/** @param {string} text */
export function appendNarrative(logEl, text) {
  logEl.textContent += text;
  logEl.scrollTop = logEl.scrollHeight;
}
