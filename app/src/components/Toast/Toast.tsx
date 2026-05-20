import type { ToastTema } from '../../hooks/useToast';
import styles from './Toast.module.css';

interface Props {
  mensagem: string;
  tema: ToastTema;
  visible: boolean;
}

export function Toast({ mensagem, tema, visible }: Props) {
  if (!visible) return null;
  return (
    <div className={`${styles.toast} ${styles[tema]}`}>
      <i className={`fa-solid ${tema === 'azul' ? 'fa-circle-check' : 'fa-square-check'}`} />
      {mensagem}
    </div>
  );
}
