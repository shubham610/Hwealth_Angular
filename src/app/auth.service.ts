// auth.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Method to check if the user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // Method to log in the user and store the token
  login(token: string): void {
    localStorage.setItem('token', token);
  }

  // Method to log out the user and remove the token
  logout(): void {
    localStorage.removeItem('token');
  }
}
