import { type VFC, memo } from 'react';
import {
  Input,
  FormLabel,
  FormErrorMessage,
  FormControl,
  Box,
  Flex,
} from '@chakra-ui/react';
import { type UseFormRegister } from 'react-hook-form';
import { type SearchInsuredFormData } from '../../types/searchInsuredFormData';

type Props = {
  isInvalid: boolean;
  label: string;
  id: 'firstName' | 'lastName' | 'birthday';
  placeholder?: string;
  message: string | undefined;
  register: UseFormRegister<SearchInsuredFormData>;
  type?: React.HTMLInputTypeAttribute | undefined;
};

export const MyFormSet: VFC<Props> = memo((props) => {
  const {
    isInvalid,
    label,
    id,
    placeholder = '',
    message,
    register,
    type = undefined,
  } = props;

  return (
    <Box h="60px">
      <FormControl isInvalid={isInvalid}>
        <Flex>
          <Box mx="auto" p={2}>
            <FormLabel htmlFor={id}>{label}</FormLabel>
          </Box>
          <Box>
            <Input
              type={type}
              w={340}
              id={id}
              placeholder={placeholder}
              {...register(id)}
            />
            <FormErrorMessage fontSize="xs">{message}</FormErrorMessage>
          </Box>
        </Flex>
      </FormControl>
    </Box>
  );
});
