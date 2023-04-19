import { memo, type VFC } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  VStack,
  Box,
} from '@chakra-ui/react';
import { type Insured } from 'types/api/insured';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  selectedInsured: Insured | null;
};

export const InsuredListModal: VFC<Props> = memo((props) => {
  const { isOpen, onClose, selectedInsured } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>予約状況</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {selectedInsured === null ? (
            <></>
          ) : (
            <VStack>
              <Box>
                <strong>ID: </strong>
                {selectedInsured?.id}
              </Box>
              <Box>
                <strong>被保険者番号: </strong>
                {selectedInsured?.number}
              </Box>
              <Box>
                <strong>氏名: </strong>
                {selectedInsured?.last_name} {selectedInsured?.first_name}
              </Box>
              <Box>
                <strong>生年月日: </strong>
                {new Date(selectedInsured?.birthday).toLocaleDateString(
                  'ja-JP'
                )}
              </Box>
              <Box>
                <strong>性別: </strong>
                {selectedInsured?.sex_code}
              </Box>
              <Box>
                <strong>住所: </strong>
                {selectedInsured?.address}
              </Box>
            </VStack>
          )}
        </ModalBody>
        <ModalFooter>
          <Button>予約</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});
