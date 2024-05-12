import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FakeLoadingService } from '../../shared/services/fake-loading.service';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { subscribe } from 'diagnostics_channel';
import { AuthService } from '../../shared/services/auth.service';
import { error } from 'console';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy{

  email = new FormControl('');
  password = new FormControl('');  

  loadingSubscription?: Subscription;
  loadingObservation?: Observable<boolean>;

  loading: boolean = false;

  constructor(private router: Router, private loadingService: FakeLoadingService, private authService: AuthService) {}

  ngOnInit(): void{}
  
  login() {
    this.loading = true;
    if (this.email.value == null || this.password.value == null) {
      alert('Please enter both email and password');
      return;
    }
    this.authService.login(this.email.value, this.password.value).then(cred => {
      console.log(cred);
      this.router.navigateByUrl('/main');
      this.loading = false;
    }).catch(err => {
      console.error(err);
      this.loading = false;
    });
}

ngOnDestroy(): void {
  this.loadingSubscription?.unsubscribe();
}

}

 