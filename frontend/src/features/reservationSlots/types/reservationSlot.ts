import { type Reservation } from '../../../types/api/reservation';

export type ReservationSlot = {
  id: number;
  date: string;
  basic: number;
  gastrointestinal_endoscopy: number;
  barium: number;
  breast_cancer_screening: number;
  reservation: Reservation[];
};

export type ReservationSlotRequest = {
  date: string;
  basic: number;
  gastrointestinal_endoscopy: number;
  barium: number;
  breast_cancer_screening: number;
};

export type ReservationSlotResponse = {
  id: number;
  date: string;
  basic: number;
  gastrointestinal_endoscopy: number;
  barium: number;
  breast_cancer_screening: number;
  created_at: string;
  updated_at: string;
};
