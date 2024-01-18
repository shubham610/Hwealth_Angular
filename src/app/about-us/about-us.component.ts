import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [NavbarComponent,CommonModule,FormsModule],
  templateUrl: './about-us.component.html',
 styleUrls: ['./about-us.component.scss']

})
export class AboutUsComponent {
  constructor(private authService: AuthService) {}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
