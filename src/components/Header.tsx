import { LogoIcon, MenuIcon, PlusIcon } from './Icons';

interface HeaderProps {
  /** Opens the storage drawer (visible below 1024px). */
  onMenuClick: () => void;
  /** Opens the "Add a bookmark" form. */
  onAddClick: () => void;
}

export function Header({ onMenuClick, onAddClick }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-brand">
        <button
          type="button"
          className="icon-button header-menu"
          onClick={onMenuClick}
          aria-label="Open your storage"
        >
          <MenuIcon width={22} height={22} />
        </button>
        <span className="logo">
          <span className="logo-mark">
            <LogoIcon />
          </span>
          Link Storage
        </span>
      </div>
      <button type="button" className="button button--primary" onClick={onAddClick}>
        <PlusIcon />
        Keep a link
      </button>
    </header>
  );
}
