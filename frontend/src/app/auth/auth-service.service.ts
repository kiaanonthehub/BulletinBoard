import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthData } from './auth-data.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private token: string | undefined;
  private loggedIn = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) { }

  signup(userusername: string | null, userpassword: string | null, userdepartment: string | null) {
    const authData: AuthData = { username: userusername, password: userpassword, department: userdepartment }
    this.http.post('https://localhost:3000/api/user/signup', authData)
      .subscribe(response => {
        console.log(response);
        this.router.navigateByUrl('/login');
      });
  }

  login(userusername: string | null, userpassword: string | null) {

    const authData = { username: userusername, password: userpassword };

    this.http.post<{ token: string }>('https://localhost:3000/api/user/login', authData)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        this.loggedIn.next(true);
        this.router.navigateByUrl('/posts');
      });
  }

  getToken() {
    return this.token;
  }

  checkLogin() {
    if (!this.token) {
      return false;
    } else {
      return true;
    }
  }

  getUpdatedLogin() {
    return this.loggedIn.asObservable();
  }

  logout() {
    //clears the session token
    this.token = undefined;
    //updates the logged in variable
    this.loggedIn.next(false);
  }
}
