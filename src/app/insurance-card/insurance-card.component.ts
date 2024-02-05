import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-insurance-card',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './insurance-card.component.html',
  styleUrl: './insurance-card.component.scss',
})
export class InsuranceCardComponent {
  items: string[] = ['Slide 1', 'Slide 2', 'Slide 3']; // Add more items if needed
  currentIndex: number = 0;
  interval: any;
  showVehicleSection: boolean = true;

  toggleSection() {
    this.showVehicleSection = !this.showVehicleSection;
  }

  next(): void {
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
  }

  prev(): void {
    this.currentIndex =
      this.currentIndex > 0 ? this.currentIndex - 1 : this.items.length - 1;
  }

  private apiUrl = 'http://localhost:8080/';
  vehicleResult: any;
  healthResult: any;
  userId: any;
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private userService: UserService
  ) {
    authService.isLoggedIn();
    this.userId = this.userService.getUser().userId;
    console.log(this.userId);
  }

  ngAfterViewInit() {
    if (this.userId != null) {
      this.fetchVehicle().subscribe(
        (response) => {
          this.vehicleResult = response;
          console.log(this.vehicleResult);
        },
        (error) => {
          console.log(error.error);
        }
      );
      this.fetchHealth().subscribe(
        (response) => {
          this.healthResult = response;
          console.log(this.healthResult);
        },
        (error) => {
          console.log(error.error);
        }
      );
    }
  }

  private fetchVehicle(): Observable<any> {
    // Send PaymentMethod ID to the server to create a PaymentIntent

    return this.http.get<any>(`${this.apiUrl}vehicle/user/${this.userId}`);
  }
  private fetchHealth(): Observable<any> {
    // Send PaymentMethod ID to the server to create a PaymentIntent

    return this.http.get<any>(`${this.apiUrl}health/user/${this.userId}`);
  }
}
