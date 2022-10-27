import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../../../app/auth/auth-service.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public authservice: AuthServiceService, private router: Router) { }

  ngOnInit(): void {
  }
 
  onsignup(signupform: NgForm) {
    if (signupform.invalid) {
      alert("Invalid input, please try again")
      return;
    } else {
      alert("WK");
      this.authservice.signup(signupform.value.enterusername, signupform.value.enterpassword, signupform.value.enteredDepartment);
    }
  }
}
