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
import { PaymentComponent } from './payment/payment.component';
import { HomeComponent } from './home/home.component';
import { ConfirmComponent } from './confirm/confirm.component';

export const routes: Routes = [
    {path:'login',component:LoginComponent},
    {path:'signup',component:SignupComponent},
    {path:'',component:HomeComponent},
    {path:'vehicle',component:VehicleInsuranceComponent,  canActivate: [AuthGuard]},
    {path:'health',component:HealthInsuranceComponent,  canActivate: [AuthGuard]},
    {path:'about',component:AboutUsComponent, canActivate: [AuthGuard]},
    {path:'contact',component:ContactUsComponent,  canActivate: [AuthGuard]},
    {path:'pay',component:PaymentComponent,  canActivate: [AuthGuard]},
    {path:'confirm',component:ConfirmComponent,  canActivate: [AuthGuard]}

];
