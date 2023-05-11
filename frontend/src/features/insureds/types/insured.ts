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

export type InsuredRequest = {
  number: number;
  first_name: string;
  last_name: string;
  first_name_kana: string;
  last_name_kana: string;
  birthday: string;
  sex_code: number;
  address: string;
};

export type InsuredResponse = {
  id: number;
  number: number;
  first_name: string;
  last_name: string;
  first_name_kana: string;
  last_name_kana: string;
  birthday: string;
  sex_code: number;
  address: string;
  created_at: string;
  updated_at: string;
};
