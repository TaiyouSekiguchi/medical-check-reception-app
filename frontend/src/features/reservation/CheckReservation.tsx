import { memo, type VFC } from 'react';
import { Box, Spinner } from '@chakra-ui/react';
import { formatStringDate } from 'lib/formatDate';
import { useLocation } from 'react-router-dom';
import { PrimaryButton } from 'components/buttons/PrimaryButton';
import { ContentLayout } from 'components/layouts/ContentLayout';
import { usePostReservations } from './api/usePostReservation';
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

  return (
    <ContentLayout title={'予約管理'}>
      {loading ? (
        <Spinner />
      ) : (
        <Box bg="white">
          <div>予約内容</div>
          <div>{selectedInsured?.last_name}</div>
          <div>{selectedInsured?.first_name}</div>
          <div>
            受診日:
            {selectedReservableSlot?.date != null &&
              formatStringDate(selectedReservableSlot?.date)}
          </div>
          <div>
            {submitData.IsGastrointestinalEndoscopyChecked && '胃カメラ'}
          </div>
          <div>{submitData.IsBariumChecked && 'バリウム'}</div>
          <div>{submitData.IsBreastCancerScreeningChecked && '乳がん検診'}</div>
          <div>
            {submitData.IsProstateCancerScreeningChecked && '前立腺がん検診'}
          </div>
          <div>この内容で予約を確定しますか？</div>
          <div>良ければ「予約を確定する」ボタンを押してください。</div>
          <PrimaryButton onClick={onClickConfirm}>予約を確定する</PrimaryButton>
        </Box>
      )}
    </ContentLayout>
  );
});
