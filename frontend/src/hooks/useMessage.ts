import { useCallback } from 'react';
import { useToast } from '@chakra-ui/react';

type Props = {
  title: string;
  status: 'info' | 'warning' | 'error' | 'success';
};

export const useMessage = (): {
  showMessage: (props: Props) => void;
} => {
  const toast = useToast();

  const showMessage = useCallback(
    (props: Props) => {
      const { title, status } = props;

      toast({
        title,
        status,
        position: 'top',
        duration: 2000,
        isClosable: true,
      });
    },
    [toast]
  );

  return { showMessage };
};
