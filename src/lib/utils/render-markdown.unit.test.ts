import { describe, expect, it } from "vitest";
import { renderMarkdown } from "./render-markdown";

describe("renderMarkdown", () => {
  it("renders markdown headings to HTML", () => {
    expect(renderMarkdown("# DevCamper API")).toContain("<h1");
    expect(renderMarkdown("# DevCamper API")).toContain("DevCamper API");
  });

  it("strips script tags from rendered HTML", () => {
    const html = renderMarkdown(
      '# Title\n\n<script>alert("xss")</script>\n\nSafe text',
    );

    expect(html).not.toContain("<script");
    expect(html).toContain("Safe text");
  });
});
