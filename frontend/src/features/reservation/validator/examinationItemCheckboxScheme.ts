import * as yup from 'yup';

export const examinationItemCheckboxScheme = yup
  .object({
    IsGastrointestinalEndoscopyChecked: yup.boolean(),
    IsBariumChecked: yup.boolean(),
    IsBreastCancerScreeningChecked: yup.boolean(),
    IsProstateCancerScreeningChecked: yup.boolean(),
  })
  .test({
    name: 'doubleReserveCheck',
    test: (values) => {
      const { IsGastrointestinalEndoscopyChecked, IsBariumChecked } = values;

      if (
        IsGastrointestinalEndoscopyChecked === undefined ||
        IsBariumChecked === undefined
      ) {
        return false;
      }

      if (IsGastrointestinalEndoscopyChecked && IsBariumChecked) {
        return false;
      }

      return true;
    },
  });
