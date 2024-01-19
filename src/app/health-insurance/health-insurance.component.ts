import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-health-insurance',
  standalone: true,
  imports: [NavbarComponent,CommonModule,FormsModule],
  templateUrl: './health-insurance.component.html',
  styleUrl: './health-insurance.component.scss'
})


export class HealthInsuranceComponent {

  

  child:number;
  adult:number;
  val:string="";
  constructor(private authService: AuthService) {
    this.child=0;
    this.adult=0;

  }
  onSelect(){
    this.child=Number(this.child);
    this.adult=Number(this.adult);
  }
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
