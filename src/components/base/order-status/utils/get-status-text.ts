// models
import { OrderStatusType } from 'models';

// FUNCTION
export const getStatusText = (status: OrderStatusType): string => {
  // Define the text of the status
  let text = '';
  switch (status) {
    case 'created':
      text = 'Создан';
      break;
    case 'pending':
      text = 'Готовится';
      break;
    default:
      text = 'Выполнен';
  }

  return text;
};
