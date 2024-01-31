import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-health-insurance',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FormsModule, RouterModule,FooterComponent],
  templateUrl: './health-insurance.component.html',
  styleUrl: './health-insurance.component.scss',
})
export class HealthInsuranceComponent {
  show:boolean=false;
  formData: any = {
    personalDetails: {
      name: '',
      email: '',
      phone: '',
      age: '',
    },
    insuranceDetails: {
      tenure: '',
      type: '',
    },
    familyDetails: {
      numChild: 0,
      numAdult: 0,
      childs: [],
      adults: [],
    },
    amount: 0,
  };

  constructor(private authService: AuthService) {
    // this.formData.familyDetails.adults=new Array(this.formData.numAdult);
  }
  onSelectChild() {
    this.show=false;
    this.formData.familyDetails.numChild = Number(
      this.formData.familyDetails.numChild
    );
    this.formData.familyDetails.childs = new Array(
      this.formData.familyDetails.numChild
    )
      .fill(null)
      .map(() => ({ name: '', age: '' }));
  }

  onSelectAdult() {
    this.show=false;
    this.formData.familyDetails.numAdult = Number(
      this.formData.familyDetails.numAdult
    );
    this.formData.familyDetails.adults = new Array(
      this.formData.familyDetails.numAdult
    )
      .fill(null)
      .map(() => ({ name: '', age: '' }));
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
  getQuote() {

    let price=0;
    const currentDate = new Date();
    if(this.formData.insuranceDetails.type=='self'){
      if(this.formData.personalDetails.age==''||this.formData.personalDetails.age==0){
        return
      }
      if(this.formData.personalDetails.age>=60){
        price=6999
      }else if(this.formData.personalDetails.age>=45){
        price=5499
      }else if(this.formData.personalDetails.age>=25){
        price=5099
    }else if(this.formData.personalDetails.age>=16){
      price=4599
  }else{
      price=3999
    }}
    else if (this.formData.insuranceDetails.type === 'family') {
  
      const adultPrice = 4000;
      const childPrice = 2500;
  
      for (const adult of this.formData.familyDetails.adults) {
        if (adult.age === '' || adult.age === 0) {
          return; 
        }
        if (adult.age >= 60) {
          price += adultPrice + 1999; 
        } else if (adult.age >= 45) {
          price += adultPrice + 1299;
        }else if(this.formData.personalDetails.age>=25){
          price += adultPrice + 599;
        }
         else {
          price += adultPrice;
        }
      }

      for (const child of this.formData.familyDetails.childs) {
        if (child.age === '' || child.age === 0) {
          return; 
        }
        if(child.age>=18){
          alert('Invalid age- Child must be less than 18 years of age')
          return;
        }
        if (child.age >= 10) {
          price += childPrice + 499; // Additional charge for children above 10
        } else {
          price += childPrice;
        }
      }
  
    }

    if(this.formData.insuranceDetails.tenure=='two-year'){
      price*=2;
     price= price-price*0.1;
    }else if(this.formData.insuranceDetails.tenure=='three-year'){
      price*=3;
      price= price-price*0.2;
    }
  
  
    this.formData.amount = Math.round(price);
    if(price<=0){
      return;
    }
    this.show=true;
  }
  reverseShow(){
    this.show=false;
  }
}
