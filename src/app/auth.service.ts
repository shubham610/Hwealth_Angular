// auth.service.ts

import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private userService:UserService){}

  // Method to check if the user is logged in
  isLoggedIn(): boolean {
    if(typeof document !==undefined){
    if(sessionStorage.getItem('token')!=null){
      this.userService.setUser(JSON.parse(sessionStorage.getItem('token')||"{'userId':null,'userName':null,'userPhoneNo':null}"));
      return true;
    }
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
      this.userService.setUser(JSON.parse("{'userId':null,'userName':null,'userPhoneNo':null}"))
    }
  }
}
