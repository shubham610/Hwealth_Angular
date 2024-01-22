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
    this.formData.amount = 3500;
    this.show=true;
  }
}
