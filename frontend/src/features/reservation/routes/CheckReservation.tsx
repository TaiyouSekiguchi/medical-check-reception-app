import { memo, type VFC } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { BorderedBox } from 'components/box/BorderedBox';
import { PrimaryButton } from 'components/buttons/PrimaryButton';
import { ContentLayout } from 'components/layouts/ContentLayout';
import { CenterSpinner } from 'components/spinner/CenterSpinner';
import { usePostReservations } from '../api/usePostReservation';
import { useUpdateReservations } from '../api/useUpdateReservation';
import { CheckReservationTable } from '../components/checkReservation/CheckReservationTable';
import { type InsuredWithReservation } from '../types/insuredWithReservation';
import { type ReservableSlot } from '../types/reservableSlot';
import { type ReservationRequest } from '../types/reservation';
import { type SelectExaminationItemFormData } from '../types/selectExaminationItemFormData';

export const CheckReservation: VFC = memo(() => {
  const location = useLocation();

  const { selectedInsured, selectedReservableSlot, examinationItem } =
    location.state as {
      selectedInsured: InsuredWithReservation | null;
      selectedReservableSlot: ReservableSlot | null;
      examinationItem: SelectExaminationItemFormData;
    };

  const { postReservations, loading } = usePostReservations();
  const { updateReservations } = useUpdateReservations();

  const onClickExecute = (func: (data: ReservationRequest[]) => void) => {
    if (selectedInsured == null || selectedReservableSlot == null) {
      return;
    }

    const requests: ReservationRequest[] = [];

    const requestBasic: ReservationRequest = {
      insured_id: selectedInsured.id,
      reservation_slot_id: selectedReservableSlot.id,
      examination_item_id: 1,
    };

    requests.push(requestBasic);

    for (const [key, value] of Object.entries(examinationItem)) {
      if (value) {
        const request: ReservationRequest = {
          insured_id: selectedInsured.id,
          reservation_slot_id: selectedReservableSlot.id,
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

    func(requests);
  };

  return (
    <ContentLayout title={'予約管理'}>
      {loading ? (
        <CenterSpinner />
      ) : (
        <Box>
          {selectedInsured == null || selectedReservableSlot == null ? (
            <p>被保険者情報、または予約枠情報がありません。</p>
          ) : (
            <Box>
              <BorderedBox p="24px">
                <CheckReservationTable
                  selectedInsured={selectedInsured}
                  selectedReservableSlot={selectedReservableSlot}
                  examinationItem={examinationItem}
                />
              </BorderedBox>
              <Flex m="24px" justifyContent="flex-end">
                {selectedInsured.is_reserved ? (
                  <PrimaryButton
                    onClick={() => {
                      onClickExecute(updateReservations);
                    }}
                  >
                    予約を変更する
                  </PrimaryButton>
                ) : (
                  <PrimaryButton
                    onClick={() => {
                      onClickExecute(postReservations);
                    }}
                  >
                    予約を確定する
                  </PrimaryButton>
                )}
              </Flex>
            </Box>
          )}
        </Box>
      )}
    </ContentLayout>
  );
});
