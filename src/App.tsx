import { useCallback, useEffect, useMemo, useState } from 'react';
import { Header } from './components/Header';
import { LinkForm } from './components/LinkForm';
import { LinkList } from './components/LinkList';
import { Modal } from './components/Modal';
import { SearchBar } from './components/SearchBar';
import { Sidebar } from './components/Sidebar';
import { SEED_BOOKMARKS } from './data/seed';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { Bookmark, BookmarkDraft } from './types/bookmarks';
import { countTags, filterBookmarks } from './utils/filter';
import { createId } from './utils/id';

type FormState = { mode: 'closed' } | { mode: 'add' } | { mode: 'edit'; bookmark: Bookmark };

export function App() {
  const [links, setLinks] = useLocalStorage<Bookmark[]>('link-storage:links', SEED_BOOKMARKS);
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formState, setFormState] = useState<FormState>({ mode: 'closed' });


  const tags = useMemo(() => countTags(links), [links]);


  const currentTag = activeTag && tags.some((t) => t.tag === activeTag) ? activeTag : null;
  const visible = useMemo(
    () => filterBookmarks(links, query, currentTag),
    [links, query, currentTag],
  );
  const isFiltering = query.trim() !== '' || currentTag !== null;

  const closeSidebar = useCallback(() => setSidebarOpen(false), []);
  const closeForm = useCallback(() => setFormState({ mode: 'closed' }), []);

  // Drawer: Escape closes it and the page behind it doesn't scroll.
  useEffect(() => {
    if (!sidebarOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeSidebar();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [sidebarOpen, closeSidebar]);

  const selectTag = (tag: string | null) => {
    setActiveTag(tag);
    setSidebarOpen(false);
  };

  const handleSubmit = (draft: BookmarkDraft) => {
    if (formState.mode === 'edit') {
      const { id } = formState.bookmark;
      setLinks((prev) =>
        prev.map((link) => (link.id === id ? { ...link, ...draft, updatedAt: Date.now() } : link)),
      );

    } else {
      const now = Date.now();
      setLinks((prev) => [{ id: createId(), ...draft, createdAt: now, updatedAt: now }, ...prev]);

    }
    closeForm();
  };



  const clearFilters = () => {
    setQuery('');
    setActiveTag(null);
  };

  return (
    <div className="app">
      <Header onMenuClick={() => setSidebarOpen(true)} onAddClick={() => setFormState({ mode: 'add' })} />

      <div className="layout">
        <Sidebar
          total={links.length}
          tags={tags}
          activeTag={currentTag}
          open={sidebarOpen}
          onSelectTag={selectTag}
          onClose={closeSidebar}
        />

        <main className="main">
          <div className="main-inner">
            <h1 className="main-title">{currentTag ? `Tagged ${currentTag}` : 'All links'}</h1>
            <SearchBar value={query} onChange={setQuery} />

            <p className="main-status" aria-live="polite">
              {isFiltering
                ? `Showing ${visible.length} of ${links.length} ${links.length === 1 ? 'link' : 'links'}`
                : ''}
            </p>

            <LinkList
              bookmarks={visible}
              totalCount={links.length}
              onEdit={(bookmark) => setFormState({ mode: 'edit', bookmark })}
              onTagClick={setActiveTag}
              onAdd={() => setFormState({ mode: 'add' })}
              onClearFilters={clearFilters}
            />
          </div>
        </main>
      </div>

      <Modal open={formState.mode !== 'closed'} onClose={closeForm} labelledBy="link-form-title">
        {formState.mode !== 'closed' && (
          <LinkForm
            mode={formState.mode}
            initial={formState.mode === 'edit' ? formState.bookmark : undefined}
            onSubmit={handleSubmit}
            onCancel={closeForm}
          />
        )}
      </Modal>


    </div>
  );
}
