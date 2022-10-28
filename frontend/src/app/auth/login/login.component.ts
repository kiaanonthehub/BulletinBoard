import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../../../app/auth/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public authservice: AuthServiceService, private router: Router) { }

  ngOnInit(): void {
  }

  onlogin(loginform: NgForm) {
    if (loginform.invalid) {
      alert("Invalid input, please try again")
      return;
    } else {
      alert("Welcome");
      this.authservice.login(loginform.value.enterusername, loginform.value.enterpassword);
    }
  }
}
