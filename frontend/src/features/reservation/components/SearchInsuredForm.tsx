import { memo, type VFC } from 'react';
import { Box, Stack, Button, Spacer, Flex } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { toHalfWidthKatakana } from 'lib/converter';
import { useForm } from 'react-hook-form';
import { BorderedBox } from 'components/box/BorderedBox';
import { type SearchInsuredFormData } from '../types/searchInsuredFormData';
import { searchInputFormScheme } from '../validator/searchInputFormValidateScheme';
import { MyFormSet } from './MyFormSet';

type Props = {
  getInsuredsWithReservation: (data: SearchInsuredFormData) => void;
};

export const SearchInsuredForm: VFC<Props> = memo((props) => {
  const { getInsuredsWithReservation } = props;

  const {
    register,
    handleSubmit,
    formState: { isValid, isDirty, errors },
    setValue,
    getValues,
  } = useForm<SearchInsuredFormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      birthday: '',
    },
    mode: 'onChange',
    resolver: yupResolver(searchInputFormScheme),
  });

  const onSubmit = (data: SearchInsuredFormData) => {
    const convertedFirstName = toHalfWidthKatakana(data.firstName);
    const convertedLastName = toHalfWidthKatakana(data.lastName);
    setValue('firstName', convertedFirstName);
    setValue('lastName', convertedLastName);
    data.firstName = convertedFirstName;
    data.lastName = convertedLastName;
    getInsuredsWithReservation(data);
  };

  return (
    <BorderedBox w="600px" h="280px">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex>
          <Stack w={450}>
            <MyFormSet
              isInvalid={errors.lastName != null}
              label={'姓（ｾｲ）'}
              id={'lastName'}
              placeholder={'last name'}
              message={errors.lastName?.message}
              register={register}
            />
            <Spacer />
            <MyFormSet
              isInvalid={errors.firstName != null}
              label={'名（ﾒｲ）'}
              id={'firstName'}
              placeholder={'first name'}
              message={errors.firstName?.message}
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
    </BorderedBox>
  );
});
