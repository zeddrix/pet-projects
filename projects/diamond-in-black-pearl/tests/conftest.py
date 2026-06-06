"""Shared pytest fixtures for Diamond in Black Pearl engine tests."""

from __future__ import annotations

import sys
from collections.abc import Sequence
from pathlib import Path

import pytest

ENGINE_ROOT = Path(__file__).resolve().parents[1]
if str(ENGINE_ROOT) not in sys.path:
    sys.path.insert(0, str(ENGINE_ROOT))

import engine  # noqa: E402


class MockGameIO:
    """Records writes/scenes and serves scripted read responses."""

    def __init__(self, inputs: Sequence[str]) -> None:
        self._inputs = list(inputs)
        self.writes: list[str] = []
        self.scenes: list[str] = []

    def write(self, text: str) -> None:
        self.writes.append(text)

    def read(self, prompt: str = ">>> ") -> str:
        del prompt
        if not self._inputs:
            raise RuntimeError("MockGameIO ran out of scripted inputs")
        return self._inputs.pop(0)

    def on_scene(self, scene_id: str) -> None:
        self.scenes.append(scene_id)

    @property
    def full_text(self) -> str:
        return "".join(self.writes)


@pytest.fixture
def mock_io_factory():
    def factory(inputs: Sequence[str]) -> MockGameIO:
        return MockGameIO(inputs)

    return factory


@pytest.fixture
def run_game(mock_io_factory):
    def runner(inputs: Sequence[str]) -> MockGameIO:
        io = mock_io_factory(inputs)
        engine.run_game(io)
        return io

    return runner
