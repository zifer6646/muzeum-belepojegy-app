import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/User';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  user: User | undefined;

  constructor(private userService: UserService,private authService: AngularFireAuth,) { }

  ngOnInit() {
    this.getUserData();
  }

  getUserData() {
    this.authService.authState.subscribe(userAuth => {
      if (userAuth) {
        const userId = userAuth.uid;
        this.userService.getById(userId).subscribe((userDataFromFirestore: User | undefined) => {
          if (userDataFromFirestore) {
            this.user = userDataFromFirestore;
          } else {
            console.error('A felhasználói adatok nem találhatók a Firestore-ban.');
          }
        });
      } else {
        console.error('Nincs bejelentkezett felhasználó.');
      }
    });
  }
  
}
