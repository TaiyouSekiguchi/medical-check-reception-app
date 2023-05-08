import { type ExaminationItem } from './examinationItem';
import { type Insured } from '../../features/insureds/types/insured';
import { type ReservationSlot } from '../../features/reservationSlots/types/reservationSlot';

export type Reservation = {
  id: number;
  insured: Insured;
  reservation_slot: ReservationSlot;
  examination_item: ExaminationItem;
};
