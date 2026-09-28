import type { ToastMessage } from '../hooks/useToast';

interface ToastProps {
  toast: ToastMessage | null;
  onDismiss: () => void;
}

export function Toast({ toast, onDismiss }: ToastProps) {
  return (
    <div className="toast-region" role="status" aria-live="polite">
      {toast && (
        <button key={toast.id} type="button" className="toast" onClick={onDismiss}>
          {toast.message}
        </button>
      )}
    </div>
  );
}
