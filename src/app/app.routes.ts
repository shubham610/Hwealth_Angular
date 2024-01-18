import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    {path:'login',component:LoginComponent},
    {path:'signup',component:SignupComponent},
    {path:'navbar',component:NavbarComponent,  canActivate: [AuthGuard]}
];
