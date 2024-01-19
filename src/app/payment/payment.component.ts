import { Component } from '@angular/core';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {
  paymentHandler: any = null;
  constructor() {}
  ngOnInit() {
    this.invokeStripe(); 
  }
  makePayment(amount: any) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51NTUMQSCuUXEi5M2IorbEXUsbJEizJLoSr3CK0R10mXnrgZXDwQPj39az845kW2gee5KEGOGC6BamMbUjkf864IK00xsbPEhm2',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken);
        alert('Payment has been successfull!');
      },
    });
    paymentHandler.open({
      name: 'Hwealth Insurance',
      description: 'Your Shield for Financial Security',
      amount: amount * 100,
    });
  }
  
  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51NTUMQSCuUXEi5M2IorbEXUsbJEizJLoSr3CK0R10mXnrgZXDwQPj39az845kW2gee5KEGOGC6BamMbUjkf864IK00xsbPEhm2',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken);
            alert('Payment has been successfull!');
          },
        });
      };
      window.document.body.appendChild(script);
    }
  }
}
