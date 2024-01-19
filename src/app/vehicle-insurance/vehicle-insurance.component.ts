import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-vehicle-insurance',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, NavbarComponent],
  templateUrl: './vehicle-insurance.component.html',
  styleUrls: ['./vehicle-insurance.component.scss'],
})
export class VehicleInsuranceComponent {
  formData: any = {
    personalDetails: {
      name: '',
      email: '',
      phone: '',
    },
    vehicleDetails: {
      model: '',
      type: '',
      regNo: '',
      regDate: '',
    },
    insuranceDetails: {
      tenure: '',
      type: '',
    },
    amount: 0,
  };

  constructor(private authService: AuthService, private router: Router) {}
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  getQuote() {
    this.formData.amount = 3500;
  }
}
