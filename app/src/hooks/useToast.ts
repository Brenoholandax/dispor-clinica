import { useState, useCallback } from 'react';

export type ToastTema = 'verde' | 'azul';

interface ToastState {
  mensagem: string;
  tema: ToastTema;
  visible: boolean;
}

export function useToast() {
  const [toast, setToast] = useState<ToastState>({ mensagem: '', tema: 'verde', visible: false });

  const mostrarToast = useCallback((mensagem: string, tema: ToastTema = 'verde') => {
    setToast({ mensagem, tema, visible: true });
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 3000);
  }, []);

  return { toast, mostrarToast };
}
