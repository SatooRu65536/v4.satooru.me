import styles from './index.module.scss';
import { Select as BSelect } from '@base-ui/react';
import { ChevronDownIcon, CheckIcon } from 'lucide-react';

interface MultiSelectProps<T extends string> {
  options: { value: T; label: string }[];
  selectedValues: T[];
  placeholder?: string;
  className?: string;
  render?: (value: T) => React.ReactNode;
  onChange: (selectedValues: T[]) => void;
}

export default function MultipleSelect<T extends string>({
  options,
  selectedValues,
  placeholder,
  className,
  render,
  onChange,
}: MultiSelectProps<T>) {
  return (
    <div className={className}>
      <BSelect.Root items={options} multiple value={selectedValues} onValueChange={(values) => onChange(values)}>
        <BSelect.Trigger className={styles.Select}>
          {placeholder && <p>{placeholder}</p>}
          <BSelect.Icon className={styles.SelectIcon}>
            <ChevronDownIcon />
          </BSelect.Icon>
        </BSelect.Trigger>
        <BSelect.Portal>
          <BSelect.Positioner className={styles.Positioner} sideOffset={8}>
            <BSelect.Popup className={styles.Popup}>
              <BSelect.ScrollUpArrow className={styles.ScrollArrow} />
              <BSelect.List className={styles.List}>
                {options.map(({ label, value }) => (
                  <BSelect.Item key={label} value={value} className={styles.Item}>
                    <BSelect.ItemIndicator className={styles.ItemIndicator}>
                      <CheckIcon className={styles.ItemIndicatorIcon} />
                    </BSelect.ItemIndicator>
                    <BSelect.ItemText className={styles.ItemText}>{render ? render(value) : label}</BSelect.ItemText>
                  </BSelect.Item>
                ))}
              </BSelect.List>
              <BSelect.ScrollDownArrow className={styles.ScrollArrow} />
            </BSelect.Popup>
          </BSelect.Positioner>
        </BSelect.Portal>
      </BSelect.Root>
    </div>
  );
}
