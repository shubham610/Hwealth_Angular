import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vehicle-insurance',
  standalone: true,
  imports: [NavbarComponent,CommonModule,FormsModule,],
  templateUrl: './vehicle-insurance.component.html',
  styleUrl: './vehicle-insurance.component.scss'
})
export class VehicleInsuranceComponent {
  constructor(private authService: AuthService) {}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
