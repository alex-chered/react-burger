// Custom types
import { IconTypeType } from '../icon.props';
// CSS
import styles from '../icon.module.css';

export const getClass = (type: IconTypeType): string => {
  let value = '';

  switch (type) {
    case 'primary':
      value = styles['icon--primary'];
      break;
    case 'secondary':
      value = styles['icon--secondary'];
      break;
    case 'success':
      value = styles['icon--success'];
      break;
    case 'error':
      value = styles['icon--error'];
      break;
    default:
      value = '';
  }

  return value;
};
