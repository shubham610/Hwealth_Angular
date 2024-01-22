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
    }
    if(this.formData.insuranceDetails.tenure=='two-year'){
      price*=2;
     price= price-price*0.1;
    }else if(this.formData.insuranceDetails.tenure=='three-year'){
      price*=3;
      price= price-price*0.2;
    }
  
  }
  
    this.formData.amount = Math.round(price);
    if(price<=0){
      return;
    }
    this.show=true;
  }
}
