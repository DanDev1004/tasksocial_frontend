import { Injectable } from '@angular/core';
import jwt_decode, { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly tokenKey = 'CURRENT_TOKEN';

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  getDecodedToken(): any {
    const token = this.getToken();
    return token ? jwtDecode(token) : null;
  }

  getUserId(): number | null {
    const decodedToken = this.getDecodedToken();
    return decodedToken ? decodedToken.data.id : null;
  }

  getUsername(): string | null{
    const decodedToken = this.getDecodedToken();
    return decodedToken ? decodedToken.data.username : null;
  }
}
