import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

export interface Ticket {
  id: string;
  userId: string;     
  exhibitId: number;   
  price: number;       
  quantity: number;    
  type: string;        
  visitDate: Date | null; 
}

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  constructor(private afs: AngularFirestore) {}

  
  addTicket(ticket: Ticket) {
    if (ticket.visitDate) {
      ticket.visitDate = new Date(ticket.visitDate);
    }
    this.afs.collection<Ticket>('tickets').add(ticket)
      .then(() => console.log("Ticket added successfully!"))
      .catch(error => console.error("Error adding ticket: ", error));
  }

  getTicketsByUserId(userId: string): Observable<Ticket[]> {
    return this.afs.collection<Ticket>('tickets', ref => ref.where('userId', '==', userId))
      .valueChanges({ idField: 'id' });
  }

  deleteTicket(ticketId: string): Promise<void> {
    return this.afs.collection('tickets').doc(ticketId).delete();
  }
  
}
