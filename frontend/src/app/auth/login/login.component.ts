import { Component, OnInit, SecurityContext } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../../../app/auth/auth-service.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public authservice: AuthServiceService, private router: Router, protected sanitizer: DomSanitizer) { }

  // decalre error messages
  emailError: string = 'Please enter a valid email address';
  passwordError: string = 'Enter your password';

  public showPassword: boolean = false;

  // toggele to hide/show password componenet
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  ngOnInit(): void {
  }

  onlogin(form: NgForm) {
    if (form.invalid) {
      return;
    } else {
      // sanitize display
      this.authservice.login(
        this.sanitizer.sanitize(SecurityContext.HTML, form.value.enterusername),
        this.sanitizer.sanitize(SecurityContext.HTML, form.value.enterpassword)
      );
    }
  }
}

/* 
Nitish Kaushik 
Create Show / Hide password in Angular with Angular Material
https://nitishkaushik.com/show-hide-password-in-angular-with-angular-material/
November 13, 2021
*/