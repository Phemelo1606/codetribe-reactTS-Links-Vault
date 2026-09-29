import type { Bookmark } from '../types/bookmarks.ts';
import { Modal } from './Modal.tsx';

interface ConfirmDeleteModalProps {
    bookmark: Bookmark | null;
    onConfirm: () => void;
    onCancel: () => void;


}

export function ConfirmDeleteModal({ bookmark, onConfirm, onCancel }: ConfirmDeleteModalProps) {
    return (
        <Modal open={bookmark !== null} onClose={onCancel} labelledBy="confirm-delete-title">
            {bookmark && (
                <div className="form">
          <h2 id="confirm-delete-title" className="modal__title">
            Delete this link?
          </h2>
          <p className="modal__text">
            “{bookmark.title}” will be removed from your storage. This can’t be undone.
          </p>
          <div className="form__actions">
            <button type="button" className="button button--ghost" onClick={onCancel}>
              Cancel
            </button>
            <button type="button" className="button button--danger" onClick={onConfirm}>
              Delete link
            </button>
          </div>
        </div>
            )}
        </Modal>
    )

    }