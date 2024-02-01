import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink,CommonModule,FormsModule,HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
constructor(private http: HttpClient,private router:Router,private userService:UserService) {}
  
  formData:any={
    userName:null,
    userPhoneNo:null,
    userPassword:null

  }
  signUpUser(){

   this.signUp().subscribe( 
    (response) => {
      sessionStorage.setItem("token",response.userName)
      this.userService.setUser(response);
      this.router.navigate(['/']);
    },
    (error) => {
      console.log(error.error);
    }
   );
    
  }

  private apiUrl = 'http://localhost:8080/user';

  private signUp():Observable<any>{ 
    return this.http.post<any>(`${this.apiUrl}/signup`, 
      this.formData
    );
  }
  }