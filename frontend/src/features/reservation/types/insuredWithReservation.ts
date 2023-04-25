export type InsuredWithReservation = {
  id: number;
  number: number;
  first_name: string;
  last_name: string;
  first_name_kana: string;
  last_name_kana: string;
  birthday: string;
  sex_alias: string;
  address: string;
  is_reserved: boolean;
  reservation_date: Date;
  examination_items: string[];
};
