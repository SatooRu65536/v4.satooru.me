import { useEffect } from 'react';

interface UseKeyboardShortcutProps {
  onEdit?: () => void;
  onSave?: () => void;
  onNew?: () => void;
}

export function useKeyboardShortcut({ onNew, onEdit, onSave }: UseKeyboardShortcutProps) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      //  n
      if (e.key === 'n') {
        e.preventDefault();
        onNew?.();
      }

      // cmd + e
      if (e.metaKey && e.key === 'e') {
        e.preventDefault();
        onEdit?.();
      }

      // cmd + enter
      if (e.metaKey && e.key === 'Enter') {
        e.preventDefault();
        onSave?.();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onNew, onEdit, onSave]);
}
