import { Component, OnInit, SecurityContext } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../../../app/auth/auth-service.service';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  // decalre error messages 
  usernameError: string = 'Please enter a valid username';
  passwordError: string = 'Please enter a password that conatains lowercase, uppercase letters and at least one number';
  departmentError: string = 'Please Select a Department';

  constructor(public authservice: AuthServiceService, private router: Router, private sanitizer: DomSanitizer) { }


  public showPassword: boolean = false;

  // toggele to hide/show password componenet
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  ngOnInit(): void {
  }

  onsignup(signupform: NgForm) {
    if (signupform.invalid) {
      return;
    } else {

      // sanitize display
      this.authservice.signup(
        this.sanitizer.sanitize(SecurityContext.HTML, signupform.value.enterusername),
        this.sanitizer.sanitize(SecurityContext.HTML, signupform.value.enterpassword),
        this.sanitizer.sanitize(SecurityContext.HTML, signupform.value.enteredDepartment)
      );

      alert('Account : ' + signupform.value.enterusername + ' has successfully been created.\nPlease Log In.')
    }
  }
}

/* 
Nitish Kaushik 
Create Show / Hide password in Angular with Angular Material
https://nitishkaushik.com/show-hide-password-in-angular-with-angular-material/
November 13, 2021
*/