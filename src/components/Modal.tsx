import { useEffect, useRef, type ReactNode } from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  /** id of the heading inside the modal. */
  labelledBy: string;
  children: ReactNode;
}

/**
 * Wraps the native <dialog>: focus trap, Escape to close and inert background
 * come for free. Children mount only while open, so forms reset every time.
 */
export function Modal({ open, onClose, labelledBy, children }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className="modal"
      aria-labelledby={labelledBy}
      onClose={onClose}
      onClick={(event) => {
        // Only the backdrop itself has the dialog as its target.
        if (event.target === ref.current) onClose();
      }}
    >
      {open && <div className="modal-body">{children}</div>}
    </dialog>
  );
}
