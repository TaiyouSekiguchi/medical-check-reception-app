import { memo } from 'react';
import {
  Input,
  Box,
  FormLabel,
  Stack,
  Button,
  FormErrorMessage,
  FormControl,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { toHalfWidthKatakana } from 'lib/converter';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { object, string } from 'yup';

type formInputs = {
  firstName: string;
  lastName: string;
  birthday: string | null;
};

const schema = object({
  firstName: string()
    .matches(/^[ぁ-ゔア-ヴｦ-ﾟー]*$/, '半角カナのみで入力してください')
    .max(20, '20文字以内で入力してください'),
  lastName: string()
    .matches(/^[ぁ-ゔア-ヴｦ-ﾟー]*$/, '半角カナのみで入力してください')
    .max(20, '20文字以内で入力してください'),
  birthday: yup
    .date()
    .typeError('有効な日付を入力してください')
    .nullable()
    .min(new Date('1900-01-01'), '1900年以降の日付を入力してください')
    .max(new Date(), '未来の日付は入力できません'),
});

export const SearchInputForm = memo(() => {
  console.log('search input form render');

  const {
    register,
    handleSubmit,
    formState: { isValid, isDirty, errors },
    setValue,
    getValues,
  } = useForm<formInputs>({
    defaultValues: {
      firstName: '',
      lastName: '',
      birthday: null,
    },
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: formInputs) => {
    const inputFirstName = getValues('firstName');
    const inputLastName = getValues('lastName');
    const convertedFirstName = toHalfWidthKatakana(inputFirstName);
    const convertedLastName = toHalfWidthKatakana(inputLastName);
    setValue('firstName', convertedFirstName);
    setValue('lastName', convertedLastName);
    data.firstName = convertedFirstName;
    data.lastName = convertedLastName;
    console.log(data);
  };

  return (
    <>
      <Box
        w="600px"
        h="220px"
        p={8}
        bg="white"
        border="1px"
        borderColor="gray.300"
        borderRadius="md"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack w={450}>
            <FormControl isInvalid={errors.firstName != null}>
              <FormLabel htmlFor="firstName">{'姓（ｾｲ）'}</FormLabel>
              <Input
                id="firstName"
                placeholder="first name"
                {...register('firstName')}
              />
              <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.lastName != null}>
              <FormLabel htmlFor="lastName">{'名（ﾒｲ）'}</FormLabel>
              <Input
                id="lastName"
                placeholder="last name"
                {...register('lastName')}
              />
              <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.birthday != null}>
              <FormLabel htmlFor="birthday">{'誕生日'}</FormLabel>
              <Input
                type="date"
                id="birthday"
                placeholder="誕生日を入力してください"
                {...register('birthday')}
              />
              <FormErrorMessage>{errors.birthday?.message}</FormErrorMessage>
            </FormControl>
          </Stack>
          <Button type="submit" isDisabled={!isDirty || !isValid}>
            検索
          </Button>
        </form>
      </Box>
    </>
  );
});
