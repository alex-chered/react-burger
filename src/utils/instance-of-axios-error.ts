import { AxiosError } from 'axios';

export const instanceOfAxiosError = (object: AxiosError): object is AxiosError => {
  return 'isAxiosError' in object;
};
