#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
WORKDIR="$(mktemp -d)"
FILTERED="$WORKDIR/filtered"
MERGED="$WORKDIR/merged"

cleanup() {
  rm -rf "$WORKDIR"
}
trap cleanup EXIT

if ! git -C "$ROOT" rev-parse wrapper-backup >/dev/null 2>&1; then
  echo "Tag wrapper-backup is required before running this script." >&2
  exit 1
fi

declare -a PET_REPOS=(
  "animate:animate:master"
  "robot-friend:robot-friend:master"
  "booklist:booklist:main"
  "github-finder:github-finder:main"
  "weather-widget:weather-widget:main"
  "loan-calculator:loan-calculator:main"
  "tasklist:tasklist:main"
  "tracalorie:tracalorie:main"
  "word-counter:word-counter:master"
  "github-finder-jsx:github-finder-jsx:main"
  "jw-guitar-templates:jw-guitar-templates:master"
)

mkdir -p "$FILTERED" "$MERGED"

first=true
for entry in "${PET_REPOS[@]}"; do
  IFS=":" read -r slug repo branch <<<"$entry"
  work="$FILTERED/$slug"

  echo "Filtering zeddrix/$repo ($branch) -> projects/$slug"
  git clone --branch "$branch" --single-branch --quiet \
    "https://github.com/zeddrix/$repo.git" "$work"
  git -C "$work" filter-repo --to-subdirectory-filter "projects/$slug" --force

  if $first; then
    git -C "$MERGED" init --initial-branch=main
    git -C "$MERGED" remote add source "$work"
    git -C "$MERGED" fetch source --quiet
    default_ref="$(git -C "$work" symbolic-ref --short HEAD)"
    git -C "$MERGED" checkout -b main "source/$default_ref"
    git -C "$MERGED" remote remove source
    first=false
  else
    git -C "$MERGED" remote add "source-$slug" "$work"
    git -C "$MERGED" fetch "source-$slug" --quiet
    default_ref="$(git -C "$work" symbolic-ref --short HEAD)"
    git -C "$MERGED" merge "source-$slug/$default_ref" \
      --allow-unrelated-histories \
      -m "Merge pet history: $slug"
    git -C "$MERGED" remote remove "source-$slug"
  fi
done

echo "Overlaying wrapper snapshot from wrapper-backup"
git -C "$ROOT" archive wrapper-backup | tar -x -C "$MERGED"

git -C "$MERGED" add -A
if ! git -C "$MERGED" diff --cached --quiet; then
  git -C "$MERGED" commit -m "$(cat <<'EOF'
Overlay playground wrapper and reconciled pet artifacts.

Adds SvelteKit shell, /project routes, monorepo source links, wrapper UX, and HashRouter build for github-finder-jsx on top of merged pet histories.
EOF
)"
fi

echo "Replacing local main with merged history"
git -C "$ROOT" fetch "$MERGED" main:history-rebuild-main
git -C "$ROOT" checkout main
git -C "$ROOT" reset --hard history-rebuild-main
git -C "$ROOT" branch -D history-rebuild-main

echo "Hybrid history merge complete."
