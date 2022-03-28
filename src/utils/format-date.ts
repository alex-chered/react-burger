import moment from 'moment';
import 'moment/locale/ru';

export const formatDate = (strDate: string) => {
  return moment(new Date(strDate)).calendar();
};
