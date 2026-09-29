export interface Bookmark {
  id: string;
  title: string;
  url: string;
  note: string;
  tags: string[];
  createdAt: number;
  updatedAt: number;
}

/** What the form produces; id and timestamps are added by the app. */
export type BookmarkDraft = Pick<Bookmark, 'title' | 'url' | 'note' | 'tags'>;

export interface TagCount {
  tag: string;
  count: number;
}
