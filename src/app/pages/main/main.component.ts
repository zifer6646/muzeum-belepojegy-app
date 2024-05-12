import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TicketsService } from '../../shared/services/tickets.service';
import { Ticket } from '../../shared/models/ticket';
import { UserService } from '../../shared/services/user.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../../shared/models/User';
import e from 'express';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  ticketForm!: FormGroup;
  currentUser: User | null = null;

  constructor(
    private fb: FormBuilder,
    private ticketService: TicketsService,
    private userService: UserService,
    private authService: AngularFireAuth
  ) {}

  ngOnInit() {
    this.ticketForm = this.fb.group({
      type: ['', Validators.required],
      exhibititon: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      visitDate: [''],
      price: [{value: '', disabled: true}]  // Az ár mező kezdetben kikapcsolt
    });

    this.getUserData();
    this.setupPriceChange();
  }
  setupPriceChange() {
    this.ticketForm.get('type')?.valueChanges.subscribe(value => {
      const prices: { [key: string]: number } = { 'Felnőtt': 5000, 'Diák': 3000, 'Csoport': 15000 };
      const price = prices[value as keyof typeof prices] || 0;
      this.ticketForm.get('price')?.setValue(price);
    });
  }


  getUserData() {
    this.authService.authState.subscribe(userAuth => {
      if (userAuth) {
        this.userService.getById(userAuth.uid).subscribe(user => {
          if (user) {
            this.currentUser = user;
          } else {
            console.error('Felhasználói adatok nem találhatók.');
          }
        });
      } else {
        console.error('Nincs bejelentkezett felhasználó.');
      }
    });
  }

  onSubmit() {
    if (this.ticketForm.valid && this.currentUser) {
      const formValues = {
        ...this.ticketForm.value,
        price: this.ticketForm.get('price')?.value, // Explicit módon kiszedjük az értéket
        userId: this.currentUser.id,
        exhibitId: this.ticketForm.value.exhibititon,
        visitDate: this.ticketForm.value.visitDate ? new Date(this.ticketForm.value.visitDate) : null
      };
      this.ticketService.addTicket(formValues as Ticket);
    }
  }
  
}
