#!/usr/bin/env node
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { optimize } from "svgo";

const root = resolve(import.meta.dirname, "..");
const svgPath = resolve(
  root,
  "projects/diamond-in-black-pearl/assets/map/adventure-map.svg",
);

const before = await readFile(svgPath, "utf8");
const beforeBytes = Buffer.byteLength(before, "utf8");
const result = optimize(before, {
  path: svgPath,
  multipass: true,
});

if ("data" in result) {
  await writeFile(svgPath, result.data, "utf8");
  const afterBytes = Buffer.byteLength(result.data, "utf8");
  console.log(
    `Optimized adventure-map.svg: ${beforeBytes} B → ${afterBytes} B`,
  );
} else {
  console.error("SVGO optimization failed");
  process.exit(1);
}
