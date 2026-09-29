import { useRef, useState, type FormEvent } from 'react';
import type { Bookmark, BookmarkDraft } from '../types/bookmarks';
import { MAX_TAGS, normalizeUrl, parseTags, validate } from '../utils/validation';

interface LinkFormProps {
  
  mode: 'add' | 'edit';
  initial?: Bookmark;
  onSubmit: (draft: BookmarkDraft) => void;
  onCancel: () => void;
}

export function LinkForm({ mode, initial, onSubmit, onCancel }: LinkFormProps) {
  const [title, setTitle] = useState(initial?.title ?? '');
  const [url, setUrl] = useState(initial?.url ?? '');
  const [note, setNote] = useState(initial?.note ?? '');
  const [tagText, setTagText] = useState(initial?.tags.join(', ') ?? '');
  const [touched, setTouched] = useState({ title: false, url: false });

  const titleRef = useRef<HTMLInputElement>(null);
  const urlRef = useRef<HTMLInputElement>(null);

  const errors = validate({ title, url });
  const titleError = touched.title ? errors.title : undefined;
  const urlError = touched.url ? errors.url : undefined;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched({ title: true, url: true });
    if (errors.title) return titleRef.current?.focus();
    if (errors.url) return urlRef.current?.focus();
    onSubmit({
      title: title.trim(),
      url: normalizeUrl(url),
      note: note.trim(),
      tags: parseTags(tagText),
    });
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="form">
      <h2 id="link-form-title" className="modal-title">
        {mode === 'edit' ? 'Edit bookmark' : 'Add a bookmark'}
      </h2>

      <div className="field">
        <label htmlFor="link-title">Name</label>
        <input
          ref={titleRef}
          id="link-title"
          type="text"
          value={title}
          placeholder="The name you’ll remember it by"
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, title: true }))}
          aria-invalid={titleError ? true : undefined}
          aria-describedby={titleError ? 'link-title-error' : undefined}
          maxLength={120}
        />
        {titleError && (
          <p id="link-title-error" className="field-error">
            {titleError}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="link-url">Link</label>
        <input
          ref={urlRef}
          id="link-url"
          type="text"
          inputMode="url"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          value={url}
          placeholder="https://…"
          onChange={(e) => setUrl(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, url: true }))}
          aria-invalid={urlError ? true : undefined}
          aria-describedby={urlError ? 'link-url-error' : undefined}
        />
        {urlError && (
          <p id="link-url-error" className="field-error">
            {urlError}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="link-note">
          Note <span className="field-hint">optional</span>
        </label>
        <textarea
          id="link-note"
          rows={3}
          value={note}
          placeholder="Why did you save this?"
          onChange={(e) => setNote(e.target.value)}
          maxLength={280}
        />
      </div>

      <div className="field">
        <label htmlFor="link-tags">
          Tags <span className="field-hint">optional, separated by commas</span>
        </label>
        <input
          id="link-tags"
          type="text"
          value={tagText}
          placeholder="design, read later, inspiration"
          onChange={(e) => setTagText(e.target.value)}
          aria-describedby="link-tags-help"
        />
        <p id="link-tags-help" className="sr-only">
          Up to {MAX_TAGS} tags.
        </p>
      </div>

      <div className="form-actions">
        <button type="button" className="button button--ghost" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="button button--primary">
          {mode === 'edit' ? 'Save changes' : 'Save link'}
        </button>
      </div>
    </form>
  );
}
