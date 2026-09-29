import { useCallback, useEffect, useRef, useState } from 'react';

export interface ToastMessage {
  id: number;
  message: string;
}

export function useToast(duration = 3000) {
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const timer = useRef<number | undefined>(undefined);

  const dismiss = useCallback(() => {
    window.clearTimeout(timer.current);
    setToast(null);
  }, []);

  const show = useCallback(
    (message: string) => {
      window.clearTimeout(timer.current);
      setToast({ id: Date.now(), message });
      timer.current = window.setTimeout(() => setToast(null), duration);
    },
    [duration],
  );

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return { toast, show, dismiss };
}
