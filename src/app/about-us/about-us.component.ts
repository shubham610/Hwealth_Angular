import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms'
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FormsModule,FooterComponent],
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']

})
export class AboutUsComponent {
  submit: boolean = false;
  change: boolean = false;
  fun: boolean = false;
  constructor(private authService: AuthService) { }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
  toggle() {
    this.submit = !this.submit;


  }
  changes() {
    this.change = !this.change;


  }
  funk()
  {
    this.fun = !this.fun;
  }
  
}