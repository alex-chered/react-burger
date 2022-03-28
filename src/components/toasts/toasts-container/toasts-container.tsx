// hooks
import { useToasts } from 'hooks/toasts';
// components
import { Toast } from 'components/toasts';
// css
import styles from './toasts-container.module.css';

// COMPONENT
export const ToastsContainer = () => {
  const { toasts, deleteToast } = useToasts();

  // RENDER
  return (
    <div className={styles['toasts-container']}>
      {
        toasts.map((item) => (
          <Toast
            key={item.id}
            toast={item}
            onRemoved={deleteToast}
          />
        ))
      }
    </div>
  );
};
