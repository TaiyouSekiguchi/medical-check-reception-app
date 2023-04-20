import { type ExaminationItem } from './examinationItem';
import { type Insured } from './insured';
import { type ReservationSlot } from './reservationSlot';

export type Reservation = {
  id: number;
  insured: Insured;
  reservation_slot: ReservationSlot;
  examination_item: ExaminationItem;
};
