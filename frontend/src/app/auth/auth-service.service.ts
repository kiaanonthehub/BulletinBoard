import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthData } from './auth-data.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private token!: string;

  constructor(private http: HttpClient, private router: Router) { }

  signup(userusername: string | null, userpassword: string | null, userdepartment: string | null) {
    const authData: AuthData = { username: userusername, password: userpassword, department: userdepartment }
    this.http.post('https://localhost:3000/api/user/signup', authData)
      .subscribe(response => { });
  }

  login(userusername: string|null, userpassword: string|null) {

    const authData = { username: userusername, password: userpassword };
    
    this.http.post<{ token: string }>('https://localhost:3000/api/user/login', authData)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        this.router.navigateByUrl('/posts');
      });
  }

  getToken() {
    return this.token;
  }
}
