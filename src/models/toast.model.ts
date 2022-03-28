export type ToastTypeType =
  | 'information'
  | 'success'
  | 'danger';

export interface ToastModel {
  id: string;
  text: string;
  type: ToastTypeType;
}
