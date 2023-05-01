export type ReservationRequest = {
  insured_id: number;
  reservation_slot_id: number;
  examination_item_id: number;
};

export type ReservationResponse = {
  id: number;
  insured_id: number;
  reservation_slot_id: number;
  examination_item_id: number;
  created_at: string;
  updated_at: string;
};
