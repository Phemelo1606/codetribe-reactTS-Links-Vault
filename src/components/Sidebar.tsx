import type { TagCount } from '../types/bookmarks';
import { ChevronIcon, CloseIcon, StackIcon } from './Icons';

interface SidebarProps {
  total: number;
  tags: TagCount[];
  /** null means "All links". */
  activeTag: string | null;
  /** Drawer state; ignored at 1024px and up where the sidebar is always shown. */
  open: boolean;
  onSelectTag: (tag: string | null) => void;
  onClose: () => void;
}

export function Sidebar({ total, tags, activeTag, open, onSelectTag, onClose }: SidebarProps) {
  return (
    <>
      <div className={`scrim ${open ? 'is-open' : ''}`} onClick={onClose} aria-hidden="true" />
      <aside className={`sidebar ${open ? 'is-open' : ''}`} aria-label="Your storage">
        <div className="sidebar-mobile-head">
          <h2 className="sidebar-mobile-title">Your Storage</h2>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Close">
            <CloseIcon width={20} height={20} />
          </button>
        </div>

        <div className="intro">
          <p className="intro-title">
            The good stuff, all in <em>one</em> place.
          </p>
          <p className="intro-text">Somewhere for the links you’ll actually come back to.</p>
        </div>

        <nav className="nav" aria-label="Filter links">
          <p className="nav-label nav-label--desktop">Your storage</p>
          <ul className="nav-list">
            <li>
              <button
                type="button"
                className="nav-item"
                aria-current={activeTag === null ? 'true' : undefined}
                onClick={() => onSelectTag(null)}
              >
                <StackIcon />
                <span className="nav-name">All links</span>
                <span className="nav-count">{total}</span>
                <ChevronIcon className="nav-chevron" />
              </button>
            </li>
          </ul>

          {tags.length > 0 && (
            <>
              <p className="nav-label">By tag</p>
              <ul className="nav-list">
                {tags.map(({ tag, count }) => (
                  <li key={tag}>
                    <button
                      type="button"
                      className="nav-item"
                      aria-current={activeTag === tag ? 'true' : undefined}
                      onClick={() => onSelectTag(tag)}
                    >
                      <span className="nav-dot" aria-hidden="true" />
                      <span className="nav-name">{tag}</span>
                      <span className="nav-count">{count}</span>
                      <ChevronIcon className="nav-chevron" />
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </nav>
      </aside>
    </>
  );
}
