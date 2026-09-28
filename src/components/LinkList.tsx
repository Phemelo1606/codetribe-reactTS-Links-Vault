import type { Bookmark } from '../types/bookmarks';
import { LinkCard } from './LinkCard';
import { PlusIcon } from './Icons';

interface LinkListProps {
  /** Already filtered by search and tag. */
  bookmarks: Bookmark[];
  /** Everything stored, to tell "nothing yet" apart from "nothing matches". */
  totalCount: number;
  onEdit: (bookmark: Bookmark) => void;

  onTagClick: (tag: string) => void;
  onAdd: () => void;
  onClearFilters: () => void;
}

export function LinkList({
  bookmarks,
  totalCount,
  onEdit,

  onTagClick,
  onAdd,
  onClearFilters,
}: LinkListProps) {
  if (totalCount === 0) {
    return (
      <div className="empty">
        <p className="empty-title">Nothing stored yet</p>
        <p className="empty-text">Save the first link you want to find again.</p>
        <button type="button" className="button button--primary" onClick={onAdd}>
          <PlusIcon /> Keep a link
        </button>
      </div>
    );
  }

  if (bookmarks.length === 0) {
    return (
      <div className="empty">
        <p className="empty-title">No links match</p>
        <p className="empty-text">Try a different word, or clear the search and tag.</p>
        <button type="button" className="button" onClick={onClearFilters}>
          Show all links
        </button>
      </div>
    );
  }

  return (
    <ul className="list">
      {bookmarks.map((bookmark) => (
        <li key={bookmark.id}>
          <LinkCard
            bookmark={bookmark}
            onEdit={onEdit}
            onTagClick={onTagClick}
          />
        </li>
      ))}
    </ul>
  );
}
