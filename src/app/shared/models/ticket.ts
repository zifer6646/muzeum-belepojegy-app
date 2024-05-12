export interface Ticket {
  id: string;
  userId: string;
  exhibitId: number;
  price: number;
  quantity: number;
  type: string;
  visitDate: Date | null; 
}

  