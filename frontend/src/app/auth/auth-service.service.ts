import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private token!: string;

  constructor(private http: HttpClient) { }

  signup(userusername: string, userpassword: string, userdepartment: string) {
    this.http.post('https://localhost:3000/api/user/signup', { username: userusername, password: userpassword, department: userdepartment })
      .subscribe(response => { });
  }

  login(userusername: string, userpassword: string) {
    this.http.post<{ token: string }>('https://localhost:3000/api/user/login', { username: userusername, password: userpassword })
      .subscribe(response => {
        const token = response.token;
        this.token = token;
      });
  }

  getToken() {
    return this.token;
  }
}
