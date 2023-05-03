import * as yup from 'yup';

export const createUserFormValidateScheme = yup.object({
  username: yup
    .string()
    .required('必須項目です')
    .matches(/^[a-zA-Z]*$/, 'アルファベットで入力してください')
    .min(4, '4文字以上で入力してください')
    .max(20, '20文字以内で入力してください'),
  password: yup
    .string()
    .matches(/^[a-zA-Z]*$/, 'アルファベットで入力してください')
    .min(4, '4文字以上で入力してください')
    .max(20, '20文字以内で入力してください'),
  is_admin: yup.boolean().required('必須項目です'),
});
