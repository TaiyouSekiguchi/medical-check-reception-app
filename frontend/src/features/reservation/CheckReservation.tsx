import { memo, type VFC } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { PrimaryButton } from 'components/buttons/PrimaryButton';
import { ContentLayout } from 'components/layouts/ContentLayout';
import { CenterSpinner } from 'components/spinner/CenterSpinner';
import { usePostReservations } from './api/usePostReservation';
import { useUpdateReservations } from './api/useUpdateReservation';
import { CheckReservationTable } from './components/CheckReservationTable';
import { type InsuredWithReservation } from './types/insuredWithReservation';
import { type ReservableSlot } from './types/reservableSlot';
import { type ReservationRequest } from './types/reservation';

type SubmitData = {
  IsGastrointestinalEndoscopyChecked: boolean;
  IsBariumChecked: boolean;
  IsBreastCancerScreeningChecked: boolean;
  IsProstateCancerScreeningChecked: boolean;
};

export const CheckReservation: VFC = memo(() => {
  const location = useLocation();

  const { selectedInsured, selectedReservableSlot, submitData } =
    location.state as {
      selectedInsured: InsuredWithReservation | null;
      selectedReservableSlot: ReservableSlot | null;
      submitData: SubmitData;
    };

  const { postReservations, loading } = usePostReservations();
  const { updateReservations } = useUpdateReservations();

  const onClickConfirm = () => {
    const requests: ReservationRequest[] = [];

    const requestBasic: ReservationRequest = {
      insured_id: selectedInsured?.id ?? 0,
      reservation_slot_id: selectedReservableSlot?.id ?? 0,
      examination_item_id: 1,
    };

    requests.push(requestBasic);

    // TODO ここのハードコーディング修正すること
    for (const [key, value] of Object.entries(submitData)) {
      if (value) {
        const request: ReservationRequest = {
          insured_id: selectedInsured?.id ?? 0,
          reservation_slot_id: selectedReservableSlot?.id ?? 0,
          examination_item_id:
            key === 'IsGastrointestinalEndoscopyChecked'
              ? 2
              : key === 'IsBariumChecked'
              ? 3
              : key === 'IsBreastCancerScreeningChecked'
              ? 4
              : key === 'IsProstateCancerScreeningChecked'
              ? 5
              : 0,
        };
        requests.push(request);
      }
    }
    postReservations(requests);
  };

  const onClickUpdate = () => {
    const requests: ReservationRequest[] = [];

    const requestBasic: ReservationRequest = {
      insured_id: selectedInsured?.id ?? 0,
      reservation_slot_id: selectedReservableSlot?.id ?? 0,
      examination_item_id: 1,
    };

    requests.push(requestBasic);

    // TODO ここのハードコーディング修正すること
    for (const [key, value] of Object.entries(submitData)) {
      if (value) {
        const request: ReservationRequest = {
          insured_id: selectedInsured?.id ?? 0,
          reservation_slot_id: selectedReservableSlot?.id ?? 0,
          examination_item_id:
            key === 'IsGastrointestinalEndoscopyChecked'
              ? 2
              : key === 'IsBariumChecked'
              ? 3
              : key === 'IsBreastCancerScreeningChecked'
              ? 4
              : key === 'IsProstateCancerScreeningChecked'
              ? 5
              : 0,
        };
        requests.push(request);
      }
    }
    updateReservations(requests);
  };

  return (
    <ContentLayout title={'予約管理'}>
      {loading ? (
        <CenterSpinner />
      ) : (
        <Box>
          {selectedInsured != null &&
            selectedReservableSlot != null &&
            submitData != null && (
              <CheckReservationTable
                selectedInsured={selectedInsured}
                selectedReservableSlot={selectedReservableSlot}
                submitData={submitData}
              />
            )}
          <Flex m="24px" justifyContent="flex-end">
            {selectedInsured?.is_reserved != null &&
            selectedInsured.is_reserved ? (
              <PrimaryButton onClick={onClickUpdate}>
                予約を変更する
              </PrimaryButton>
            ) : (
              <PrimaryButton onClick={onClickConfirm}>
                予約を確定する
              </PrimaryButton>
            )}
          </Flex>
        </Box>
      )}
    </ContentLayout>
  );
});
