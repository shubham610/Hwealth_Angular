import { Component,OnChanges } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router, RouterModule } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-vehicle-insurance',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, NavbarComponent,FooterComponent],
  templateUrl: './vehicle-insurance.component.html',
  styleUrls: ['./vehicle-insurance.component.scss'],
})
export class VehicleInsuranceComponent {
  show:boolean=false;
  formData: any = {
    user:this.userService.getUser(),
    personalDetails: {
      userName: '',
      userMailId: '',
      phone: this.userService.getUser().userPhoneNo,
    },
    vehicleDetails: {
      vehicleModel: '',
      vehicleType: '',
      vehicleRegistrationNo: '',
      vehicleRegistrationDate: '',
    },
    insuranceDetails: {
      insuranceTenure: '',
      insuranceType: '',
    },
    amount: 0,
  };

  constructor(private authService: AuthService, private router: Router,private userService:UserService) {}
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  getQuote() {

    let price=0;
    const currentDate = new Date();
    if(this.formData.vehicleDetails.vehicleType=='bike'){
      price=900;
      if(new Date(this.formData.vehicleDetails.vehicleRegistrationDate) < new Date(currentDate.getFullYear() - 2, currentDate.getMonth(), currentDate.getDate())){
        price=price+299;
      }else if(new Date(this.formData.vehicleDetails.vehicleRegistrationDate) < new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), currentDate.getDate())){
        price=price+199;
      }
      if(this.formData.insuranceDetails.insuranceTenure=='two-year'){
        price*=2;
       price= price-price*0.1;
      }else if(this.formData.insuranceDetails.insuranceTenure=='three-year'){
        price*=3;
        price= price-price*0.2;
      }
      if(this.formData.insuranceDetails.insuranceType=='thirdParty'){
        price=price-price*0.6;
      }
    }
    if(this.formData.vehicleDetails.vehicleType=='car'){
      price=2900;
      if(new Date(this.formData.vehicleDetails.vehicleRegistrationDate) < new Date(currentDate.getFullYear() - 2, currentDate.getMonth(), currentDate.getDate())){
        price=price+1199;
      }else if(new Date(this.formData.vehicleDetails.vehicleRegistrationDate) < new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), currentDate.getDate())){
        price=price+899;
      }
      if(this.formData.insuranceDetails.insuranceTenure=='two-year'){
        price*=2;
       price= price-price*0.1;
      }else if(this.formData.insuranceDetails.insuranceTenure=='three-year'){
        price*=3;
        price= price-price*0.2;
      }
      if(this.formData.insuranceDetails.insuranceType=='thirdParty'){
        price=price-price*0.6;
      }
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
  
one(): void {
  this.router.navigate(['pay'], {
    state: {
      formData:this.formData,
    },
  });
}

}
