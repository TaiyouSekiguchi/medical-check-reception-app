// 日付をYYYY-MM-DDの書式で返すメソッド
export const formatDate = (stringDate: string): string => {
  if (stringDate === '' || stringDate === null) {
    return '';
  }

  const date = new Date(stringDate);

  const year = date.getFullYear();
  const month = ('0' + `${date.getMonth() + 1}`).slice(-2);
  const day = ('0' + `${date.getDate()}`).slice(-2);

  return `${year}-${month}-${day}`;
};
