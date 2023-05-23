import { memo, type VFC } from 'react';
import { Button, type ButtonProps } from '@chakra-ui/react';

type PrimaryButtonProps = ButtonProps;

export const PrimaryButton: VFC<PrimaryButtonProps> = memo((props) => {
  return (
    <Button bg="teal.400" color="white" _hover={{ opacity: 0.8 }} {...props}>
      {props.children}
    </Button>
  );
});
