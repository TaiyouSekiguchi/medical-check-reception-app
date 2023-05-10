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
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { type InsuredWithReservation } from '../types/insuredWithReservation';
import { ReservationStatusTable } from './ReservationStatusTable';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  selectedInsured: InsuredWithReservation | null;
};

export const InsuredListModal: VFC<Props> = memo((props) => {
  const { isOpen, onClose, selectedInsured } = props;
  const navigate = useNavigate();

  const onClickReservation = useCallback(() => {
    navigate('/home/reservation_management/reservable_slot', {
      state: selectedInsured,
    });
  }, [navigate, selectedInsured]);

  const onClickUpdate = useCallback(() => {
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
            <></>
          )}
        </ModalBody>
        <ModalFooter>
          {selectedInsured != null ? (
            selectedInsured.is_reserved ? (
              <>
                <Button onClick={onClickUpdate}>変更</Button>
                <Button onClick={onClickDelete}>削除</Button>
              </>
            ) : (
              <Button onClick={onClickReservation}>予約</Button>
            )
          ) : (
            <></>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});
