import type { ReactNode } from 'react';
import styles from './Modal.module.css';

interface Props {
  titulo: string;
  onClose: () => void;
  children: ReactNode;
  maxWidth?: number;
}

export function Modal({ titulo, onClose, children, maxWidth = 560 }: Props) {
  return (
    <div className={styles.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.box} style={{ maxWidth }}>
        <div className={styles.header}>
          <h2>{titulo}</h2>
          <button className={styles.close} onClick={onClose}>&times;</button>
        </div>
        {children}
      </div>
    </div>
  );
}
