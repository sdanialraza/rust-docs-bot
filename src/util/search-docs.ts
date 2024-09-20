import closestmatch from "closest-match";
import docsjson from "../../data/std.json";

export type Documentation = {
  args?: [
    {
      name: string;
      type: string;
    },
  ];
  deprecation: boolean;
  docs: string;
  name: string;
  output?: string;
  visibility: string;
};

type DocsFile = {
  index: Record<string, Documentation>;
};

const docs = docsjson as unknown as DocsFile;

const DocsMap = new Map<string, Documentation>();

for (const entry in docs.index) {
  if (docs.index[entry].name !== null) {
    const data = docs.index[entry];

    DocsMap.set(data.name, {
      name: data.name,
      deprecation: data.deprecation,
      docs: data.docs,
      visibility: data.visibility,
    });
  }
}

export function getDocs(keyword: string): Documentation | undefined {
  return DocsMap.get(keyword);
}

export function searchDocs(keyword: string): Documentation | undefined {
  return DocsMap.get(closestmatch.closestMatch(keyword, [...DocsMap.keys()]) as string);
}
