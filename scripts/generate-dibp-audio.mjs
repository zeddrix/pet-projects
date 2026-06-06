#!/usr/bin/env node
/** Generate minimal looping ambient OGG files for DIBP (requires ffmpeg). */
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { join, resolve } from "node:path";

const audioDir = resolve(
  import.meta.dirname,
  "..",
  "projects",
  "diamond-in-black-pearl",
  "assets",
  "audio",
);

/** @type {Record<string, string>} */
const TRACKS = {
  jungle: "sine=frequency=220:duration=30,volume=0.08",
  sea: "sine=frequency=180:duration=30,volume=0.06",
  ship: "sine=frequency=140:duration=30,volume=0.07",
};

const ffmpegCheck = spawnSync("ffmpeg", ["-version"], { stdio: "ignore" });
if (ffmpegCheck.status !== 0) {
  console.error("ffmpeg is required to generate DIBP ambient audio.");
  process.exit(1);
}

mkdirSync(audioDir, { recursive: true });

for (const [name, filter] of Object.entries(TRACKS)) {
  const output = join(audioDir, `${name}.ogg`);
  if (existsSync(output)) {
    console.log(`Skip existing ${name}.ogg`);
    continue;
  }

  const result = spawnSync(
    "ffmpeg",
    [
      "-y",
      "-f",
      "lavfi",
      "-i",
      filter,
      "-c:a",
      "libvorbis",
      "-q:a",
      "4",
      output,
    ],
    { stdio: "inherit" },
  );

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }

  console.log(`Generated ${name}.ogg`);
}
