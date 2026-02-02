import { CheckCheckIcon, PenLineIcon, RotateCwIcon } from 'lucide-react';
import styles from './index.module.scss';
import { useKeyboardShortcut } from '@/hools/useKeyboardShortcut';

interface ContentControlPanelProps {
  onSave: (draft: boolean) => Promise<any>;
  onReset: () => void;
  isPending: boolean;
}

export default function ContentControlPanel({ onSave, onReset, isPending }: ContentControlPanelProps) {
  useKeyboardShortcut({
    onSave: () => void onSave(true),
  });

  return (
    <div className={styles.control_panel}>
      <button onClick={onReset} className={styles.reset} disabled={isPending}>
        <RotateCwIcon />
      </button>

      <button onClick={() => void onSave(true)} className={styles.draft} disabled={isPending}>
        <PenLineIcon />
        <span>Draft</span>
      </button>
      <button onClick={() => void onSave(false)} className={styles.ship} disabled={isPending}>
        <CheckCheckIcon />
        <span>Ship It!</span>
      </button>
    </div>
  );
}
