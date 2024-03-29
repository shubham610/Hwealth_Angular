import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth.service';
import { AboutUsComponent } from '../about-us/about-us.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,RouterOutlet,RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  submit:boolean=false;

  constructor(private authService: AuthService,private router:Router) {}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
  toggle()
  {
    this.submit=!this.submit;
  
  }
  logout()
  {
    
    sessionStorage.removeItem("token");
    this.router.navigate(['/login'])
  }
}
