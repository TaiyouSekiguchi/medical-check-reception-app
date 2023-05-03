import { type Reservation } from '../../../types/api/reservation';

export type Insured = {
  id: number;
  number: number;
  first_name: string;
  last_name: string;
  birthday: string;
  sex_alias: string;
  address: string;
  reservation: Reservation[];
};
