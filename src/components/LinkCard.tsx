import { useEffect, useRef, useState } from 'react';
import type { Bookmark } from '../types/bookmarks';
import { getDomain, timeAgo } from '../utils/format';
import { DotsIcon, EditIcon, TrashIcon } from './Icons';

interface LinkCardProps {
  bookmark: Bookmark;
  onEdit: (bookmark: Bookmark) => void;

  onTagClick: (tag: string) => void;
}

export function LinkCard({ bookmark, onEdit,  onTagClick }: LinkCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const domain = getDomain(bookmark.url);

  useEffect(() => {
    if (!menuOpen) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  return (
    <article className="card">
      <div className="card-top">
        <div className="card-site">
          <span className="favicon" aria-hidden="true">
            {domain.charAt(0).toUpperCase()}
          </span>
          <span className="card-domain">{domain}</span>
        </div>

        <div className="card-menu" ref={menuRef}>
          <button
            type="button"
            className="icon-button"
            aria-label={`Options for ${bookmark.title}`}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <DotsIcon />
          </button>
          {menuOpen && (
            <div className="popover">
              <button
                type="button"
                className="popover-item"
                onClick={() => {
                  setMenuOpen(false);
                  onEdit(bookmark);
                }}
              >
                <EditIcon /> Edit
              </button>
              <button
                type="button"
                className="popover-item popover-item--danger"
                onClick={() => {
                  setMenuOpen(false);
                 ;
                }}
              >
                <TrashIcon /> Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <h3 className="card-title">
        <a href={bookmark.url} target="_blank" rel="noopener noreferrer" className="card-link">
          {bookmark.title}
        </a>
      </h3>

      {bookmark.note && <p className="card-note">{bookmark.note}</p>}

      <div className="card-foot">
        {bookmark.tags.length > 0 && (
          <ul className="tags">
            {bookmark.tags.map((tag) => (
              <li key={tag}>
                <button
                  type="button"
                  className="tag"
                  onClick={() => onTagClick(tag)}
                  aria-label={`Show links tagged ${tag}`}
                >
                  {tag}
                </button>
              </li>
            ))}
          </ul>
        )}
        <time className="card-time" dateTime={new Date(bookmark.createdAt).toISOString()}>
          Added {timeAgo(bookmark.createdAt)}
        </time>
      </div>
    </article>
  );
}
