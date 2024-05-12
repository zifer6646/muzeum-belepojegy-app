import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
// Define the Ticket interface
export interface Ticket {
  id: string;
  userId: string;      // User identifier who purchased the ticket
  exhibitId: number;   // Identifier of the exhibition the ticket is valid for
  price: number;       // Price of the ticket
  quantity: number;    // Number of tickets purchased
  type: string;        // Type of ticket (e.g., "adult", "student", etc.)
  visitDate: Date | null; // Date of the visit, can be null if not specified
}

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  constructor(private afs: AngularFirestore) {}

  // Method to add a ticket to Firestore 
  addTicket(ticket: Ticket) {
    // Handling optional visitDate with Firestore timestamp
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
