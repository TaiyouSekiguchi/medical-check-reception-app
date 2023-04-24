import { memo } from 'react';
import { Box, Stack, Button, Spacer, Flex } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { toHalfWidthKatakana } from 'lib/converter';
import { useForm } from 'react-hook-form';
import { type FormInputs } from '../types/formInputs';
import { searchInputFormScheme } from '../validator/searchInputFormValidateScheme';
import { MyFormSet } from './MyFormSet';

export const SearchInputForm = memo(() => {
  console.log('search input form render');

  const {
    register,
    handleSubmit,
    formState: { isValid, isDirty, errors },
    setValue,
    getValues,
  } = useForm<FormInputs>({
    defaultValues: {
      firstName: '',
      lastName: '',
      birthday: '',
    },
    mode: 'onChange',
    resolver: yupResolver(searchInputFormScheme),
  });

  const onSubmit = (data: FormInputs) => {
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
        h="280px"
        p={6}
        bg="white"
        border="1px"
        borderColor="gray.300"
        borderRadius="md"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex>
            <Stack w={450}>
              <MyFormSet
                isInvalid={errors.firstName != null}
                label={'姓（ｾｲ）'}
                id={'firstName'}
                placeholder={'first name'}
                message={errors.firstName?.message}
                register={register}
              />
              <Spacer />
              <MyFormSet
                isInvalid={errors.lastName != null}
                label={'名（ﾒｲ）'}
                id={'lastName'}
                placeholder={'last name'}
                message={errors.lastName?.message}
                register={register}
              />
              <Spacer />
              <MyFormSet
                isInvalid={errors.birthday != null}
                label={'生年月日'}
                id={'birthday'}
                message={errors.birthday?.message}
                register={register}
                type={'date'}
              />
            </Stack>
            <Box bg="yellow" mx={6} position="relative">
              <Button
                bg="teal.400"
                color="white"
                type="submit"
                isDisabled={
                  !isDirty ||
                  !isValid ||
                  (getValues('birthday') === '' &&
                    getValues('firstName') === '' &&
                    getValues('lastName') === '')
                }
                position="absolute"
                bottom={4}
              >
                検索
              </Button>
            </Box>
          </Flex>
        </form>
      </Box>
    </>
  );
});
