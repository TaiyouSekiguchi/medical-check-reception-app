import * as yup from 'yup';

export const searchInputFormScheme = yup.object({
  firstName: yup
    .string()
    .matches(/^[ぁ-ゔア-ヴｦ-ﾟー]*$/, 'ひらがな、カタカナで入力してください')
    .max(20, '20文字以内で入力してください'),
  lastName: yup
    .string()
    .matches(/^[ぁ-ゔア-ヴｦ-ﾟー]*$/, 'ひらがな、カタカナで入力してください')
    .max(20, '20文字以内で入力してください'),
  birthday: yup
    .date()
    .typeError('有効な日付を入力してください')
    .nullable()
    .transform((curr: string, orig: string) => {
      if (orig === '') {
        return null;
      }

      return curr;
    })
    .min(new Date('1900-01-01'), '1900年以降の日付を入力してください')
    .max(new Date(), '未来の日付は入力できません'),
});
