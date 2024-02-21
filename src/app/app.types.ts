export interface PetAppointmentType {
  aptId: number;
  petName: string;
  ownerName: string;
  aptNotes: string;
  aptDate: string;
  [key: string]: any;
}

export interface OrderType {
  orderBy: string;
  orderType: string;
}
