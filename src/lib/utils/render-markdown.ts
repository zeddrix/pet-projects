import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";

/** Converts markdown to sanitized HTML for in-shell README rendering. */
export function renderMarkdown(markdown: string): string {
  const rawHtml = marked.parse(markdown, { async: false });
  return DOMPurify.sanitize(rawHtml);
}
