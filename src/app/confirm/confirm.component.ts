import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.scss'
})
export class ConfirmComponent {
  formData:any;
  paymentDetails:any;
  data:any;

  constructor(private location: Location,private router:Router){

  this.data=location.getState(); 
  this.formData=this.data.formData
  this.paymentDetails=this.data.paymentDetails

  if (!this.formData) {
    this.router.navigate(['']);
  }
  console.log(this.paymentDetails);
  
}

}
