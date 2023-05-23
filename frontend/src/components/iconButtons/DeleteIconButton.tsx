import { memo } from 'react';
import { DeleteIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';
import { type UserResponse } from 'features/users/types/user';

type Props = {
  onClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    user: UserResponse
  ) => void;
  user: UserResponse;
};

export const DeleteIconButton = memo((props: Props) => {
  const { onClick, user } = props;

  return (
    <IconButton
      aria-label="delete"
      size="lg"
      color="gray.500"
      bg="rgba(0,0,0,0,0)"
      _hover={{ bg: 'rgba(0,0,0,0,0)' }}
      _active={{ bg: 'rgba(0,0,0,0,0)' }}
      icon={<DeleteIcon />}
      onClick={(event) => {
        onClick(event, user);
      }}
    />
  );
});
