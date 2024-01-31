import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink,CommonModule,FormsModule,HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  
  formData:any={
    userName:null,
    userPhoneNo:null,
    userPassword:null

  }
  signUpUser(){
    console.log(this.formData);
    

   this.signUp().subscribe( 
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

  private signUp():Observable<any>{ 
    return this.http.post<any>(`${this.apiUrl}/signup`, 
      this.formData
    );
  }
  }