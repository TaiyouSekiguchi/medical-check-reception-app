import { memo, type ReactNode, type VFC } from 'react';
import { Button } from '@chakra-ui/react';

type Props = {
  children: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  onClick: () => void;
};

export const PrimaryButton: VFC<Props> = memo((props) => {
  const { children, disabled = true, loading = false, onClick } = props;

  return (
    <Button
      bg="teal.400"
      color="white"
      _hover={{ opacity: 0.8 }}
      isLoading={loading}
      isDisabled={disabled || loading}
      onClick={onClick}
    >
      {children}
    </Button>
  );
});
