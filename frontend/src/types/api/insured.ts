import { type Reservation } from './reservation';

export type Insured = {
  id: number;
  number: number;
  first_name: string;
  last_name: string;
  birthday: string;
  sex_code: number;
  address: string;
  reservation: Reservation[];
};
