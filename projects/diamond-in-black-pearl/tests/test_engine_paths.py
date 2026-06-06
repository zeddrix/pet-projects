"""
Engine path matrix for projects/diamond-in-black-pearl/engine.py

Checklist: start, crocodile, scorpion, where_boat, the_boat, the_bear,
the_basket, the_map, the_pirate, ask_captain, tall_pirate, the_treasure,
way_out, go_paddle, treasure_chest, back, restarter, check_point.
"""

from __future__ import annotations

import pytest
import json
from pathlib import Path

FIXTURE_PATH = Path(__file__).resolve().parent / "fixtures" / "win-path.json"
WIN_PATH_INPUTS = json.loads(FIXTURE_PATH.read_text(encoding="utf-8"))["terminalInputs"]

# Reaches death scene then quits (works from jungle fork onward).
DEATH_QUIT = ["LEFT", "EAT", "NO"]


def test_win_path_reaches_victory(run_game):
    io = run_game(WIN_PATH_INPUTS)
    assert "victory" in io.scenes
    assert "GAME OVER" in io.full_text
    assert "PINK PANTHER" in io.full_text


def test_start_right_goes_to_scorpion(run_game):
    io = run_game(["Hero", "RIGHT", "WALK", "NO"])
    assert "scorpion_road" in io.scenes


def test_start_left_goes_to_crocodile(run_game):
    io = run_game(["Hero", "LEFT", "BACK", *DEATH_QUIT])
    assert "crocodile_lake" in io.scenes


def test_start_black_pearl_skips_to_pirate(run_game):
    io = run_game(["Hero", "BLACK PEARL", "LOOK", "PUNCH", "NO"])
    assert "black_pearl_checkpoint" in io.scenes
    assert "boat_memory" not in io.scenes


def test_start_invalid_retries(run_game):
    io = run_game(["Hero", "MAYBE", "RIGHT", "WALK", "NO"])
    assert io.full_text.count("NO IDEA WHAT YOU'RE SAYING") >= 1
    assert "scorpion_road" in io.scenes


def test_crocodile_back_returns_to_jungle(run_game):
    io = run_game(["Hero", "LEFT", "BACK", *DEATH_QUIT])
    assert io.scenes.count("jungle_fork") >= 2


def test_crocodile_eat_triggers_death(run_game):
    io = run_game(["Hero", "LEFT", "EAT", "NO"])
    assert "death" in io.scenes


def test_scorpion_walk_death(run_game):
    io = run_game(["Hero", "RIGHT", "WALK", "NO"])
    assert "death" in io.scenes


def test_scorpion_run_death(run_game):
    io = run_game(["Hero", "RIGHT", "RUN", "NO"])
    assert "death" in io.scenes


def test_scorpion_boat_memory_path(run_game):
    io = run_game(["Hero", "RIGHT", "BOAT", "LAKE", "TORCH", "NO"])
    assert "boat_memory" in io.scenes
    assert "boat_choice" in io.scenes


def test_where_boat_wrong_retries(run_game):
    io = run_game(["Hero", "RIGHT", "BOAT", "DESERT", "LAKE", "TORCH", "NO"])
    assert "WHERE?" in io.full_text


def test_the_boat_push_reaches_bear(run_game):
    io = run_game(["Hero", "RIGHT", "BOAT", "LAKE", "PUSH", "DEAD", "OPEN", "CHASE", "NO"])
    assert "bear_encounter" in io.scenes


def test_the_boat_torch_death(run_game):
    io = run_game(["Hero", "RIGHT", "BOAT", "LAKE", "TORCH", "NO"])
    assert "death" in io.scenes


def test_the_boat_boots_loops(run_game):
    io = run_game(
        ["Hero", "RIGHT", "BOAT", "LAKE", "BOOTS", "PUSH", "DEAD", "OPEN", "CHASE", "NO"]
    )
    assert "Are you CRAZY? AGAIN!" in io.full_text


def test_the_boat_bonfire_loops(run_game):
    io = run_game(
        [
            "Hero",
            "RIGHT",
            "BOAT",
            "LAKE",
            "BONFIRE",
            "BONFIRE",
            "PUSH",
            "DEAD",
            "OPEN",
            "CHASE",
            "NO",
        ]
    )
    assert "ending your life quicker" in io.full_text


def test_the_bear_dead_reaches_basket(run_game):
    io = run_game(["Hero", "RIGHT", "BOAT", "LAKE", "PUSH", "DEAD", "OPEN", "CHASE", "NO"])
    assert "basket" in io.scenes


def test_the_bear_punch_death(run_game):
    io = run_game(["Hero", "RIGHT", "BOAT", "LAKE", "PUSH", "PUNCH", "NO"])
    assert "death" in io.scenes


def test_the_bear_befriend_death(run_game):
    io = run_game(["Hero", "RIGHT", "BOAT", "LAKE", "PUSH", "BEFRIEND", "NO"])
    assert "death" in io.scenes


def test_the_basket_open_reaches_map(run_game):
    io = run_game(WIN_PATH_INPUTS[:7] + ["CHASE", "NO"])
    assert "treasure_map" in io.scenes


def test_the_basket_kick_loops(run_game):
    io = run_game(WIN_PATH_INPUTS[:6] + ["KICK", "OPEN", "CHASE", "NO"])
    assert "Why would you do that?" in io.full_text


def test_the_map_follow_reaches_pirate(run_game):
    io = run_game(WIN_PATH_INPUTS[:8] + ["LOOK", "PUNCH", "NO"])
    assert "black_pearl_checkpoint" in io.scenes


def test_the_map_chase_death(run_game):
    io = run_game(WIN_PATH_INPUTS[:7] + ["CHASE", "NO"])
    assert "death" in io.scenes


def test_the_pirate_ask_branch(run_game):
    io = run_game(WIN_PATH_INPUTS[:8] + ["ASK", "NO", "LOOK", "PUNCH", "NO"])
    assert "ask_captain" in io.scenes


def test_ask_captain_yes_checkpoint_death(run_game):
    io = run_game(WIN_PATH_INPUTS[:8] + ["ASK", "YES", "NO"])
    assert "checkpoint_death" in io.scenes


def test_tall_pirate_name_reaches_treasure(run_game):
    io = run_game(WIN_PATH_INPUTS[:10] + ["CAPTAIN", "NO"])
    assert "treasure_escape" in io.scenes


def test_tall_pirate_punch_checkpoint(run_game):
    io = run_game(WIN_PATH_INPUTS[:9] + ["PUNCH", "NO"])
    assert "checkpoint_death" in io.scenes


def test_the_treasure_yourself_reaches_canon(run_game):
    io = run_game(WIN_PATH_INPUTS[:12] + ["DIVE", "NO"])
    assert "canon_memory" in io.scenes


def test_the_treasure_captain_checkpoint(run_game):
    io = run_game(WIN_PATH_INPUTS[:10] + ["CAPTAIN", "NO"])
    assert "checkpoint_death" in io.scenes


def test_way_out_canon_reaches_paddle(run_game):
    io = run_game(WIN_PATH_INPUTS[:12] + ["PADDLE", "OPEN", "SMASH"])
    assert "canoe_chase" in io.scenes


def test_go_paddle_finale(run_game):
    io = run_game(WIN_PATH_INPUTS[:13] + ["OPEN", "SMASH"])
    assert "chest_finale" in io.scenes


def test_go_paddle_dive_checkpoint(run_game):
    io = run_game(WIN_PATH_INPUTS[:12] + ["DIVE", "NO"])
    assert "checkpoint_death" in io.scenes


def test_go_paddle_fire_loops(run_game):
    io = run_game(WIN_PATH_INPUTS[:12] + ["FIRE", "PADDLE", "SMASH"])
    assert "What will you fire back?" in io.full_text


def test_treasure_chest_open_loops(run_game):
    io = run_game(WIN_PATH_INPUTS[:13] + ["OPEN", "SMASH"])
    assert "You don't have a key." in io.full_text


def test_treasure_chest_destroy_loops(run_game):
    io = run_game(WIN_PATH_INPUTS[:13] + ["DESTROY", "SMASH"])
    assert "TRY AGAIN!" in io.full_text


def test_back_yes_checkpoint(run_game):
    io = run_game(WIN_PATH_INPUTS[:13] + ["BACK", "YES", "NO"])
    assert "checkpoint_death" in io.scenes


def test_back_no_returns_to_finale(run_game):
    io = run_game(WIN_PATH_INPUTS[:13] + ["BACK", "NO", "SMASH"])
    assert "victory" in io.scenes


def test_restarter_yes_returns_to_intro(run_game):
    io = run_game(["Hero", "LEFT", "EAT", "YES", "NewHero", *DEATH_QUIT])
    assert io.scenes.count("intro") >= 2


def test_restarter_no_quits(run_game):
    io = run_game(["Hero", "LEFT", "EAT", "NO"])
    assert "BYE!" in io.full_text


def test_checkpoint_yes_returns_to_pirate(run_game):
    io = run_game(WIN_PATH_INPUTS[:9] + ["PUNCH", "YES", "LOOK", "PUNCH", "NO"])
    assert io.scenes.count("black_pearl_checkpoint") >= 2


def test_checkpoint_no_quits(run_game):
    io = run_game(WIN_PATH_INPUTS[:9] + ["PUNCH", "NO"])
    assert "BYE!" in io.full_text


@pytest.mark.parametrize(
    "invalid_then_valid",
    [
        (["Hero", "MAYBE", "RIGHT", "WALK", "NO"], "scorpion_road"),
        (["Hero", "LEFT", "MAYBE", "BACK", *DEATH_QUIT], "jungle_fork"),
    ],
)
def test_wrong_answer_loops(invalid_then_valid, run_game):
    inputs, expected_scene = invalid_then_valid
    io = run_game(inputs)
    assert expected_scene in io.scenes
    assert "NO IDEA WHAT YOU'RE SAYING" in io.full_text
