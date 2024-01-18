import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthGuard } from './auth.guard';
import { AppComponent } from './app.component';
import { VehicleInsuranceComponent } from './vehicle-insurance/vehicle-insurance.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HealthInsuranceComponent } from './health-insurance/health-insurance.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

export const routes: Routes = [
    {path:'login',component:LoginComponent},
    {path:'signup',component:SignupComponent},
    {path:'home',component:AppComponent,  canActivate: [AuthGuard]},
    {path:'vehicle',component:VehicleInsuranceComponent,  canActivate: [AuthGuard]},
    {path:'health',component:HealthInsuranceComponent,  canActivate: [AuthGuard]},
    {path:'about',component:AboutUsComponent, canActivate: [AuthGuard]},
    {path:'contact',component:ContactUsComponent,  canActivate: [AuthGuard]}
];
