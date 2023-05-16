import { memo } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';

type Props = {
  onClick: () => void;
  isRevealPassword: boolean;
};

export const ViewIconButton = memo((props: Props) => {
  const { onClick, isRevealPassword } = props;

  return (
    <IconButton
      aria-label="Password visibility toggle"
      size="lg"
      color="gray.500"
      bg="rgba(0,0,0,0,0)"
      _hover={{ bg: 'rgba(0,0,0,0,0)' }}
      _active={{ bg: 'rgba(0,0,0,0,0)' }}
      icon={isRevealPassword ? <ViewIcon /> : <ViewOffIcon />}
      onClick={onClick}
    />
  );
});
