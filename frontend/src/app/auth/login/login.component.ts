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

  emailError: string = 'Please enter a valid email address';
  passwordError: string = 'Enter your password';

  ngOnInit(): void {
  }

  onlogin(form: NgForm) {
    if (form.invalid) {
      return;
    } else {
      this.authservice.login(
        this.sanitizer.sanitize(SecurityContext.HTML, form.value.enterusername),
        this.sanitizer.sanitize(SecurityContext.HTML, form.value.enterpassword)
      );
    }
  }
}
