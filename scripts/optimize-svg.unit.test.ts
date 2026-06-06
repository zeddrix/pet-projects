import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const svgPath = resolve(
  import.meta.dirname,
  "../projects/diamond-in-black-pearl/assets/map/adventure-map.svg",
);

describe("adventure-map.svg", () => {
  it("remains valid svg xml after optimization", () => {
    const svg = readFileSync(svgPath, "utf8");
    expect(svg.trim().startsWith("<svg")).toBe(true);
    expect(svg).toContain("</svg>");
  });

  it("is under 50kb after svgo pass", () => {
    const svg = readFileSync(svgPath, "utf8");
    expect(Buffer.byteLength(svg, "utf8")).toBeLessThan(50 * 1024);
  });
});
