// auth.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Method to check if the user is logged in
  isLoggedIn(): boolean {
    if(typeof document !==undefined){
    return !! sessionStorage.getItem('token');
    }
    return false;
  }

  // Method to log in the user and store the token
  login(token: string): void {
    if(typeof document!==undefined){
      sessionStorage.setItem('token', token);
    }
    
  }

  // Method to log out the user and remove the token
  logout(): void {
    if(typeof document!==undefined){
      sessionStorage.removeItem('token');
    }
  }
}
