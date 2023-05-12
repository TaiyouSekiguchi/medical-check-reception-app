import * as yup from 'yup';

export const userFormValidateScheme = yup.object({
  username: yup
    .string()
    .required('必須項目です')
    .matches(/^[a-zA-Z0-9]*$/, 'アルファベット、数字で入力してください')
    .min(4, '4文字以上で入力してください')
    .max(16, '16文字以内で入力してください'),
  password: yup
    .string()
    .required('必須項目です')
    .matches(
      /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]*$/,
      'アルファベット、数字で入力してください。また、大文字、小文字、数字はそれぞれ一文以上必要です。'
    )
    .min(8, '8文字以上で入力してください')
    .max(32, '32文字以内で入力してください'),
  is_admin: yup.boolean().required('必須項目です'),
});
