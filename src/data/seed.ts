import type { Bookmark } from '../types/bookmarks';

const DAY = 24 * 60 * 60 * 1000;
const now = Date.now();

/** Shown only on first visit, so the app doesn't open empty. Delete freely. */
export const SEED_BOOKMARKS: Bookmark[] = [
  {
    id: 'seed-1',
    title: 'Anime Website',
    url: 'https://www.crunchyroll.com',
    note: 'Popular Anime Streaming Service in the world.',
    tags: ['entertain'],
    createdAt: now - 2 * DAY,
    updatedAt: now - 2 * DAY,
  },
  {
    id: 'seed-2',
    title: 'Streaming service',
    url: 'https://www.netflix.com',
    note: 'Stream movies, documentaries and series.',
    tags: ['entertain'],
    createdAt: now - 5 * DAY,
    updatedAt: now - 5 * DAY,
  },
  {
    id: 'seed-3',
    title: 'The shape of a web page',
    url: 'https://www.example-design.com/shape',
    note: 'A thoughtful field guide to making digital spaces feel more human.',
    tags: ['ideas'],
    createdAt: now - 9 * DAY,
    updatedAt: now - 9 * DAY,
  },
];
