export const formatNumber = (data: number): string => {
  return new Intl.NumberFormat('ru-RU').format(data);
};
