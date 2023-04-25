import { memo, useCallback, type VFC } from 'react';
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
import { useNavigate } from 'react-router-dom';
import { type InsuredWithReservation } from '../types/insuredWithReservation';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  selectedInsured: InsuredWithReservation | null;
};

export const InsuredListModal: VFC<Props> = memo((props) => {
  const { isOpen, onClose, selectedInsured } = props;
  const navigate = useNavigate();

  const onClickReservation = useCallback(() => {
    navigate('/home/select_reservation_slot');
  }, [navigate]);

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
                {selectedInsured?.sex_alias}
              </Box>
              <Box>
                <strong>住所: </strong>
                {selectedInsured?.address}
              </Box>
              {selectedInsured?.is_reserved ? (
                <>
                  <strong>予約状況: </strong>
                  予約なし
                </>
              ) : (
                <>
                  <strong>予約状況: </strong>
                  予約あり
                  <Box>
                    <strong>検査日: </strong>
                    {selectedInsured?.reservation_date.toLocaleDateString(
                      'ja-JP'
                    )}
                  </Box>
                  <Box>
                    <strong>検査項目: </strong>
                    {selectedInsured?.examination_items.map(
                      (examinationItem, index) => (
                        <Box key={index}>
                          {examinationItem}
                          {index !==
                            selectedInsured?.examination_items.length - 1 &&
                            ', '}
                        </Box>
                      )
                    )}
                  </Box>
                </>
              )}
            </VStack>
          )}
        </ModalBody>
        <ModalFooter>
          {selectedInsured?.is_reserved === true ? (
            <Button onClick={onClickReservation}>予約</Button>
          ) : (
            <>
              <Button>変更</Button>
              <Button>削除</Button>
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});
