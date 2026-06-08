import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { expect, test } from "@playwright/test";
import {
  clearDibpStorage,
  clickChoice,
  expectNarrative,
  expectSceneTitle,
  navigateChoices,
  reachBlackPearlCheckpoint,
  startVisualGameWithName,
  submitTypedAnswer,
} from "./helpers/dibp-page";

const winPathFixture = JSON.parse(
  readFileSync(
    resolve(
      import.meta.dirname,
      "../../projects/diamond-in-black-pearl/tests/fixtures/win-path.json",
    ),
    "utf8",
  ),
) as { visualChoices: string[] };

const WIN_VISUAL_CHOICES = winPathFixture.visualChoices;

/** Prefix that reaches chest_finale (win path through beach, excluding victory SMASH). */
const CHEST_FINALE_PREFIX = WIN_VISUAL_CHOICES.slice(0, -1);

/** Prefix that reaches canoe_chase (win path through canon memory). */
const CANOE_CHASE_PREFIX = WIN_VISUAL_CHOICES.slice(0, -2);

test.describe("DIBP death branches", () => {
  test.beforeEach(async ({ page }) => {
    await clearDibpStorage(page);
  });

  test("Given boat choice, when player picks TORCH, then death scene appears", async ({
    page,
  }) => {
    await startVisualGameWithName(page);
    await navigateChoices(page, ["RIGHT", "BOAT", "LAKE"]);
    await clickChoice(page, "TORCH");
    await expectSceneTitle(page, "You Died");
    await expectNarrative(page, "YOU JUST DIED");
  });

  test("Given bear encounter, when player befriends bear, then death scene appears", async ({
    page,
  }) => {
    await startVisualGameWithName(page);
    await navigateChoices(page, ["RIGHT", "BOAT", "LAKE", "PUSH"]);
    await clickChoice(page, "BEFRIEND");
    await expectSceneTitle(page, "You Died");
    await expectNarrative(page, "YOU JUST DIED");
  });

  test("Given bear encounter, when player punches bear, then death scene appears", async ({
    page,
  }) => {
    await startVisualGameWithName(page);
    await navigateChoices(page, ["RIGHT", "BOAT", "LAKE", "PUSH"]);
    await clickChoice(page, "PUNCH");
    await expectSceneTitle(page, "You Died");
    await expectNarrative(page, "YOU JUST DIED");
  });

  test("Given bear encounter, when player feeds boat to bear, then death scene appears", async ({
    page,
  }) => {
    await startVisualGameWithName(page);
    await navigateChoices(page, ["RIGHT", "BOAT", "LAKE", "PUSH"]);
    await clickChoice(page, "EAT");
    await expectSceneTitle(page, "You Died");
    await expectNarrative(page, "YOU JUST DIED");
  });

  test("Given treasure map, when player chases bear, then death scene appears", async ({
    page,
  }) => {
    await startVisualGameWithName(page);
    await navigateChoices(page, [
      "RIGHT",
      "BOAT",
      "LAKE",
      "PUSH",
      "DEAD",
      "OPEN",
    ]);
    await clickChoice(page, "CHASE");
    await expectSceneTitle(page, "You Died");
    await expectNarrative(page, "YOU JUST DIED");
  });

  test("Given scorpion road, when player walks, then death scene appears", async ({
    page,
  }) => {
    await startVisualGameWithName(page);
    await clickChoice(page, "RIGHT");
    await clickChoice(page, "WALK");
    await expectSceneTitle(page, "You Died");
    await expectNarrative(page, "YOU JUST DIED");
  });

  test("Given scorpion road, when player runs, then death scene appears", async ({
    page,
  }) => {
    await startVisualGameWithName(page);
    await clickChoice(page, "RIGHT");
    await clickChoice(page, "RUN");
    await expectSceneTitle(page, "You Died");
    await expectNarrative(page, "YOU JUST DIED");
  });

  test("Given crocodile lake, when player lets crocodiles eat, then death scene appears", async ({
    page,
  }) => {
    await startVisualGameWithName(page);
    await clickChoice(page, "LEFT");
    await clickChoice(page, "EAT");
    await expectSceneTitle(page, "You Died");
    await expectNarrative(page, "YOU JUST DIED");
  });

  test("Given ask captain prompt, when player obeys captain, then checkpoint death appears", async ({
    page,
  }) => {
    await startVisualGameWithName(page);
    await reachBlackPearlCheckpoint(page);
    await clickChoice(page, "ASK");
    await clickChoice(page, "YES");
    await expectSceneTitle(page, "Checkpoint");
    await expectNarrative(page, "YOU JUST DIED");
  });

  test("Given tall pirate, when player punches, then checkpoint death appears", async ({
    page,
  }) => {
    await startVisualGameWithName(page);
    await reachBlackPearlCheckpoint(page);
    await clickChoice(page, "LOOK");
    await clickChoice(page, "PUNCH");
    await expectSceneTitle(page, "Checkpoint");
    await expectNarrative(page, "YOU JUST DIED");
  });

  test("Given canoe chase, when player dives, then checkpoint death appears", async ({
    page,
  }) => {
    await startVisualGameWithName(page);
    await navigateChoices(page, CANOE_CHASE_PREFIX);
    await clickChoice(page, "DIVE");
    await expectSceneTitle(page, "Checkpoint");
    await expectNarrative(page, "YOU JUST DIED");
  });

  test("Given beach finale, when player goes back and confirms YES, then checkpoint death appears", async ({
    page,
  }) => {
    await startVisualGameWithName(page);
    await navigateChoices(page, CHEST_FINALE_PREFIX);
    await clickChoice(page, "BACK");
    await expectSceneTitle(page, "Return to the Ship");
    await clickChoice(page, "YES");
    await expectSceneTitle(page, "Checkpoint");
    await expectNarrative(page, "YOU JUST DIED");
  });
});

test.describe("DIBP loop feedback branches", () => {
  test.beforeEach(async ({ page }) => {
    await clearDibpStorage(page);
  });

  test("Given boat choice, when player picks BOOTS, then rejection appears in narrative", async ({
    page,
  }) => {
    await startVisualGameWithName(page);
    await navigateChoices(page, ["RIGHT", "BOAT", "LAKE"]);
    await clickChoice(page, "BOOTS");
    await expectNarrative(page, "Are you CRAZY?");
    await expectSceneTitle(page, "What to Do With the Boat");
  });

  test("Given boat choice, when player picks BONFIRE, then rejection appears in narrative", async ({
    page,
  }) => {
    await startVisualGameWithName(page);
    await navigateChoices(page, ["RIGHT", "BOAT", "LAKE"]);
    await clickChoice(page, "BONFIRE");
    await expectNarrative(page, "ending your life quicker");
    await expectSceneTitle(page, "What to Do With the Boat");
  });

  test("Given basket, when player kicks it, then rejection appears in narrative", async ({
    page,
  }) => {
    await startVisualGameWithName(page);
    await navigateChoices(page, ["RIGHT", "BOAT", "LAKE", "PUSH", "DEAD"]);
    await clickChoice(page, "KICK");
    await expectNarrative(page, "Why would you do that?");
    await expectSceneTitle(page, "Wooden Basket");
  });
});

test.describe("DIBP secret visibility", () => {
  test.beforeEach(async ({ page }) => {
    await clearDibpStorage(page);
  });

  test("Given jungle fork, when choices render, then Black Pearl secret button is hidden", async ({
    page,
  }) => {
    await startVisualGameWithName(page);
    await expect(page.getByTestId("dibp-choice-BLACK-PEARL")).toHaveCount(0);
  });

  test("Given jungle fork, when player types Black Pearl, then ship checkpoint appears", async ({
    page,
  }) => {
    await startVisualGameWithName(page);
    await submitTypedAnswer(page, "BLACK PEARL");
    await expectSceneTitle(page, "Black Pearl");
  });
});
