import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterOutlet,RouterLink,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  formData:any={
    userName:null,
    userPassword:null
  }
  loginUser(){
    console.log(this.formData);
    

   this.logIn().subscribe( 
    (response) => {console.log(response);
      sessionStorage.setItem("token",response.userName)
    },
    (error) => {
      console.log(error.error);
    }
   );
    
  }

  private apiUrl = 'http://localhost:8080/user';
  constructor(private http: HttpClient) {}

  private logIn():Observable<any>{ 
    return this.http.post<any>(`${this.apiUrl}/login`, 
      this.formData
    );
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
