import styles from './index.module.scss';
import { Dialog as BDialog, type DialogRootProps } from '@base-ui/react/dialog';
import { type ReactElement, type ReactNode } from 'react';
import classnames from 'classnames';

interface DialogProps extends Omit<DialogRootProps, 'children'> {
  title: string;
  trigger?: ReactElement;
  triggerClassName?: string;
  children: ReactNode;
  disabled?: boolean;
}

export default function Dialog({
  title,
  trigger,
  triggerClassName,
  children,
  disabled = false,
  ...props
}: DialogProps) {
  return (
    <BDialog.Root {...props}>
      {trigger && (
        <BDialog.Trigger className={classnames(styles.Trigger, triggerClassName)} disabled={disabled}>
          {trigger}
        </BDialog.Trigger>
      )}

      <BDialog.Portal>
        <BDialog.Backdrop className={styles.Backdrop} />

        <BDialog.Popup className={styles.Popup}>
          <BDialog.Title className={styles.Title}>{title}</BDialog.Title>

          <div className={styles.Content}>{children}</div>
        </BDialog.Popup>
      </BDialog.Portal>
    </BDialog.Root>
  );
}
