import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../auth/auth-service.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-component',
  templateUrl: './nav-component.component.html',
  styleUrls: ['./nav-component.component.css']
})
export class NavComponentComponent implements OnInit {

  constructor(public authService: AuthServiceService, private router: Router) { }

  private loginSub: Subscription = new Subscription;
  isLoggedIn: boolean = false;

  ngOnInit(): void {
    this.authService.checkLogin();
    this.loginSub = this.authService.getUpdatedLogin().subscribe((value: boolean) => {
      this.isLoggedIn = value;
    })
  }

  onLogout() {
    //logs the user out and returns them to the login page
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

}
