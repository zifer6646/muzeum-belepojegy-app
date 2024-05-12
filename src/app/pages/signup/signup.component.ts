import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators  } from '@angular/forms';
import { first } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { error } from 'console';
import { User } from '../../shared/models/User';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'] 
})
export class SignupComponent implements OnInit{
    
  signUpForm = new FormGroup({    
    email: new FormControl(''),
    password: new FormControl(''),
    rePassword: new FormControl(''),
    name: new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl('')
    })
  });


  constructor(
    private location: Location,
    private authService: AuthService,
    private userService: UserService,
  ) {}
  
    ngOnInit(): void{}
    
    onSubmit() {
      const email = this.signUpForm.get('email')?.value;
      const password = this.signUpForm.get('password')?.value;
      const firstName = this.signUpForm.get(['name', 'firstName'])?.value;
      const lastName = this.signUpForm.get(['name', 'lastName'])?.value;
    
      if (typeof email === 'string' && typeof password === 'string' && typeof firstName === 'string' && typeof lastName === 'string') {
        console.log(this.signUpForm.value);
        this.authService.signup(email, password).then(cred => {
          console.log(cred);
          const user: User = {
            id: cred.user?.uid as string, 
            email: email,
            username: email.split('@')[0], 
            name: {
              firstName: firstName,
              lastName: lastName
            }
          }
          this.userService.create(user).then(() => {
            console.log('User created successfully!');
          }).catch(error => {
            console.error(error);
          });
        }).catch(error => {
          console.log(error);
        });
      } else {
        console.log('Email, password, or name fields are missing!');
      }
    }
    
    
    goBack() {
      this.location.back();
    }

}
