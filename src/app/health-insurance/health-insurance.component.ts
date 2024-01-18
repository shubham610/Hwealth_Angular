import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-health-insurance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './health-insurance.component.html',
  styleUrl: './health-insurance.component.scss'
})
export class HealthInsuranceComponent {
  constructor(private authService: AuthService) {}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
