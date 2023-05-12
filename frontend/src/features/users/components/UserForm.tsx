import { memo, type VFC } from 'react';
import {
  FormLabel,
  Input,
  FormErrorMessage,
  FormControl,
  Box,
} from '@chakra-ui/react';
import { type FieldErrors, type UseFormRegister } from 'react-hook-form';
import { type UserRequest } from '../types/user';

type Props = {
  register: UseFormRegister<UserRequest>;
  errors: FieldErrors<UserRequest>;
};

type Field = {
  name: 'username' | 'password' | 'is_admin';
  label: string;
  placeholder?: string;
  type: 'text' | 'password' | 'checkbox';
};

export const UserForm: VFC<Props> = memo((props) => {
  const { register, errors } = props;
  const fields: Field[] = [
    {
      name: 'username',
      label: 'username',
      placeholder: 'ユーザー名を入力してください',
      type: 'text',
    },
    {
      name: 'password',
      label: 'password',
      placeholder: 'パスワードを入力してください',
      type: 'password',
    },
    {
      name: 'is_admin',
      label: 'admin',
      type: 'checkbox',
    },
  ];

  return (
    <>
      {fields.map((field) => (
        <Box key={field.name} mb="24px">
          <FormControl isInvalid={errors[field.name] != null}>
            <FormLabel htmlFor={field.name}>{field.label}</FormLabel>
            {field.type === 'checkbox' ? (
              <input
                type="checkbox"
                id={field.name}
                {...register(field.name)}
              />
            ) : (
              <Input
                type={field.type}
                id={field.name}
                placeholder={field.placeholder}
                {...register(field.name)}
              />
            )}
            <FormErrorMessage fontSize="xs">
              {errors[field.name]?.message}
            </FormErrorMessage>
          </FormControl>
        </Box>
      ))}
    </>
  );
});
