import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserService } from '../user.service';
import shajs from 'sha.js';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterOutlet,
    RouterLink,
    HttpClientModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  errorMessage: String = '';
  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) {}
  formData: any = {
    userName: null,
    userPassword: null,
  };
  loginUser() {
    this.logIn().subscribe(
      (response) => {
        sessionStorage.setItem('token', JSON.stringify(response));
        this.userService.setUser(response);
        this.router.navigate(['/']);
      },
      (error) => {
        console.log(error.error);
        this.errorMessage = error.error;
        this.formData.userPassword = '';
      }
    );
  }

  private apiUrl = 'http://localhost:8080/user';

  private logIn(): Observable<any> {
    this.formData.userPassword = shajs('SHA256')
      .update(this.formData.userPassword)
      .digest('hex');
    return this.http.post<any>(`${this.apiUrl}/login`, this.formData);
  }

  // constructor(private authService: AuthService) {}

  // isLoggedIn(): boolean {
  //   return this.authService.isLoggedIn();
  // }
  // login(): void {
  //   // Assuming you get a token after successful login
  //   const token = '1234';
  //   this.authService.login(token);
  // }
}
