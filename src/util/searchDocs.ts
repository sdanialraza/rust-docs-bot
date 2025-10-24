// @ts-expect-error - Package doesn't have types
import levenSort from "leven-sort";
import _stdDocsJson from "../data/std-docs.json" with { type: "json" };
import type { DocsFile, Documentation } from "../types/index.js";

const stdDocsJson = _stdDocsJson as unknown as DocsFile;

const documentation = new Map<string, Documentation>();

for (const entry in stdDocsJson.index) {
  if (stdDocsJson.index[entry].name === null) {
    continue;
  }

  const data = stdDocsJson.index[entry];

  documentation.set(data.name, {
    name: data.name,
    deprecation: data.deprecation,
    docs: data.docs,
    visibility: data.visibility,
  });
}

/**
 * Gets the documentation for the provided keyword.
 *
 * @param keyword - The keyword to search for.
 */
export function getDocs(keyword: string): Documentation | undefined {
  return documentation.get(keyword);
}

/**
 * Searches the documentation for the closest match to the provided keyword.
 *
 * @param keyword - The keyword to search for.
 */
export function searchDocs(keyword: string): string[] {
  return levenSort([...documentation.keys()], keyword);
}
