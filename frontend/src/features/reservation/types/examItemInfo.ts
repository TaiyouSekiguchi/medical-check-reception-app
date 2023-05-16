export type ExamItemInfo = {
  id:
    | 'IsGastrointestinalEndoscopyChecked'
    | 'IsBariumChecked'
    | 'IsBreastCancerScreeningChecked'
    | 'IsProstateCancerScreeningChecked';
  name: string;
  checked: boolean;
  disabled: boolean;
  isReservable: boolean;
};
