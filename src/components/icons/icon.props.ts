// components
import {
  BurgerIcon,
  ProfileIcon,
  ListIcon,
  CurrencyIcon,
  DeleteIcon,
  LockIcon,
  DragIcon,
  CloseIcon,
  ErrorIcon,
  NotificationIcon,
  ArrowUp,
  ArrowDown
} from './icons';

export type IconTypeType =
  | 'primary'
  | 'secondary'
  | 'error'
  | 'success'
  | 'none';

export const icons = {
  BurgerIcon,
  ProfileIcon,
  ListIcon,
  CurrencyIcon,
  DeleteIcon,
  LockIcon,
  DragIcon,
  CloseIcon,
  ErrorIcon,
  NotificationIcon,
  ArrowUp,
  ArrowDown
};

export type IconNameType = keyof typeof icons;

// type SpanProps = HTMLAttributes<HTMLSpanElement>;

export interface IconProps {
  name?: IconNameType,
  type?: IconTypeType,
  large?: boolean,
  className?: string
  onClick?: () => void;
}
