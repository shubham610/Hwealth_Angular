import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule,NavbarComponent],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent {
  submit1:boolean=false;
  submit2:boolean=false;

  onReset1(){
    this.submit1=!this.submit1;
  }
  onReset2(){
    this.submit2=!this.submit2;
  }

  constructor(private authService: AuthService) {}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}