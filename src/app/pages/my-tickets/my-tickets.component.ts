import { Component, OnInit  } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from '../../shared/models/ticket';
import { TicketsService } from '../../shared/services/tickets.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { DatePipe } from '@angular/common';
import { parseISO, format } from 'date-fns';

@Component({
  selector: 'app-my-tickets',
  templateUrl: './my-tickets.component.html',
  styleUrls: ['./my-tickets.component.scss'],
})
export class MyTicketsComponent implements OnInit {
  tickets$!: Observable<Ticket[]>; 

  constructor(private ticketsService: TicketsService, private authService: AngularFireAuth) {}

  ngOnInit() {
    this.authService.authState.subscribe(user => {
      if (user && user.uid) {
        this.tickets$ = this.ticketsService.getTicketsByUserId(user.uid);
      }
    });
  }

  deleteTicket(ticketId: string) {
    this.ticketsService.deleteTicket(ticketId).then(() => {
      console.log('Ticket deleted successfully');
      // Optionally refresh the list or show a message
    }).catch(error => {
      console.error('Error deleting ticket: ', error);
    });
  }

  formatDate(dateString: string | null): string {
    if (!dateString) return '';
    let date = parseISO(dateString);
    return format(date, 'PPP'); // 'PPP' example format: 'Apr 29, 1453'
}
}
