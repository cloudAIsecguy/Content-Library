"use client";

import QuerySection from "../QuerySection";

export default function SearchResultsView({ term }: { term: string }) {
  const escaped = term.replace(/'/g, "\\'");
  return (
    <>
      <h1 className="pagetitle">Search results for &quot;{term}&quot;</h1>
      <QuerySection query={`fullText contains '${escaped}' and trashed = false`} pageSize={10} hideFolders />
    </>
  );
}
