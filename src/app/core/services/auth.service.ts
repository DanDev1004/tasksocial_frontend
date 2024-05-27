import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth } from '../models/Auth.model';
import { apiEndpoint } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<Auth> {
    return this.http.post<Auth>(apiEndpoint.AuthEndpoint.login, credentials);
  }

  register(data: { username: string; email: string; password: string }): Observable<Auth> {
    return this.http.post<Auth>(apiEndpoint.AuthEndpoint.register, data);
  }
}
