import { type Reservation } from './reservation';

export type ReservationSlot = {
  id: number;
  date: string;
  basic: number;
  gastrointestinal_endoscopy: number;
  barium: number;
  breast_cancer_screening: number;
  reservation: Reservation[];
};
