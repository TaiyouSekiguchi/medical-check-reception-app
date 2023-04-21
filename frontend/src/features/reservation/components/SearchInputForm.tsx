import { memo, type VFC, type ChangeEvent, useState } from 'react';
import {
  Input,
  Box,
  HStack,
  Flex,
  Spacer,
  FormLabel,
  Stack,
} from '@chakra-ui/react';
import { PrimaryButton } from 'components/buttons/PrimaryButton';

type Props = {
  onClick: () => void;
};

export const SearchInputForm: VFC<Props> = memo((props) => {
  const { onClick } = props;

  const [firstName, setFirstName] = useState('');
  const onChangeFirstName = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const [lastName, setLastName] = useState('');
  const onChangeLastName = (e: ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const [birthday, setBirthday] = useState('');
  const onChangeBirthday = (e: ChangeEvent<HTMLInputElement>) => {
    setBirthday(e.target.value);
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
        <Flex>
          <Stack w={450}>
            <HStack>
              <FormLabel w={100} textAlign="center">
                姓
              </FormLabel>
              <Input
                placeholder="first name"
                value={firstName}
                onChange={onChangeFirstName}
              />
            </HStack>
            <Spacer />
            <HStack>
              <FormLabel w={100} textAlign="center">
                名
              </FormLabel>
              <Input
                placeholder="last name"
                value={lastName}
                onChange={onChangeLastName}
              />
            </HStack>
            <Spacer />
            <HStack>
              <FormLabel w={100} textAlign="center">
                生年月日
              </FormLabel>
              <Input
                placeholder="birthday"
                value={birthday}
                onChange={onChangeBirthday}
              />
            </HStack>
          </Stack>
          <Spacer />
          <Box>
            <PrimaryButton
              disabled={birthday === ''}
              loading={false}
              onClick={onClick}
            >
              検索
            </PrimaryButton>
          </Box>
        </Flex>
      </Box>
    </>
  );
});
