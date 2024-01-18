import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-vehicle-insurance',
  standalone: true,
  imports: [CommonModule, FormsModule,NavbarComponent],
  templateUrl: './vehicle-insurance.component.html',
  styleUrls: ['./vehicle-insurance.component.scss']
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
  };

  constructor(private authService: AuthService) {}
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  onBuyInsurance() {
    console.log('Form Data:', this.formData);
  
  }
}
