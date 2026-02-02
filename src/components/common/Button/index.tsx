import styles from './index.module.scss';
import classNames from 'classnames';

interface Propps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
}

export default function Button({ children, className, icon, ...props }: Propps) {
  return (
    <button className={classNames(styles.button, className)} {...props}>
      {icon && <span className={styles.icon}>{icon}</span>}
      {children && <span className={styles.children}>{children}</span>}
    </button>
  );
}
