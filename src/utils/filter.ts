import type { Bookmark, TagCount } from '../types/bookmarks';

export function matchesQuery(bookmark: Bookmark, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return [bookmark.title, bookmark.url, bookmark.note, ...bookmark.tags].some((field) =>
    field.toLowerCase().includes(q),
  );
}

export function filterBookmarks(
  bookmarks: Bookmark[],
  query: string,
  tag: string | null,
): Bookmark[] {
  return bookmarks.filter((b) => (!tag || b.tags.includes(tag)) && matchesQuery(b, query));
}

export function countTags(bookmarks: Bookmark[]): TagCount[] {
  const counts = new Map<string, number>();
  for (const b of bookmarks) {
    for (const tag of b.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return Array.from(counts, ([tag, count]) => ({ tag, count })).sort(
    (a, b) => b.count - a.count || a.tag.localeCompare(b.tag),
  );
}
