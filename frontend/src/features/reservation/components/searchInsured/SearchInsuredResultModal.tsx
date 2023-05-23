import { memo, useCallback, type VFC } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Flex,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from 'components/buttons/PrimaryButton';
import { type InsuredWithReservation } from '../../types/insuredWithReservation';
import { ReservationStatusTable } from './ReservationStatusTable';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  selectedInsured: InsuredWithReservation | null;
};

export const SearchInsuredResultModal: VFC<Props> = memo((props) => {
  const { isOpen, onClose, selectedInsured } = props;
  const navigate = useNavigate();

  const onClickReservation = useCallback(() => {
    navigate('/home/reservation_management/reservable_slot', {
      state: selectedInsured,
    });
  }, [navigate, selectedInsured]);

  const onClickDelete = useCallback(() => {
    navigate('/home/reservation_management/delete_check', {
      state: selectedInsured,
    });
  }, [navigate, selectedInsured]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>予約状況</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {selectedInsured != null ? (
            <ReservationStatusTable selectedInsured={selectedInsured} />
          ) : (
            <Text>選択されたユーザー情報がありません。</Text>
          )}
        </ModalBody>
        <ModalFooter>
          {selectedInsured != null &&
            (selectedInsured.is_reserved ? (
              <Flex>
                <PrimaryButton mr="8px" onClick={onClickReservation}>
                  変更
                </PrimaryButton>
                <PrimaryButton onClick={onClickDelete}>削除</PrimaryButton>
              </Flex>
            ) : (
              <PrimaryButton onClick={onClickReservation}>予約</PrimaryButton>
            ))}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});
