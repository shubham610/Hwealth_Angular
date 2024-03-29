import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'console';
import { Location } from '@angular/common';

declare var Stripe: any;

@Component({
  selector: 'app-payment',
  imports: [
    HttpClientModule,
    // other modules
  ],
  standalone: true,
  templateUrl: './payment.component.html',
})
export class PaymentComponent implements AfterViewInit {
  formData: any;
  isDisabled: boolean = false;
  paymentDetails: any;
  private apiUrl = 'http://localhost:8080/';
  private stripe: any;
  private clientSecret!: string;
  private card: any; // Define card variable here
  @ViewChild('stripeContainer') stripeContainer!: ElementRef;

  // constructor(private http: HttpClient, private route: ActivatedRoute) {}

  constructor(
    private location: Location,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // this.data = this.router.getCurrentNavigation().extras.state?.['response'];
    this.formData = location.getState();
    this.formData = this.formData.formData;
    if (!this.formData) {
      this.router.navigate(['']);
    }
    console.log(this.formData);
  }

  ngAfterViewInit() {
    this.isDisabled = false;
    // this.route.queryParams.subscribe((params) => {
    //   this.formData = params['formData'];
    //   this.formData = JSON.parse(this.formData);
    // });

    // Initialize Stripe.js after the view is initialized
    this.stripe = Stripe(
      'pk_test_51NTUMQSCuUXEi5M2IorbEXUsbJEizJLoSr3CK0R10mXnrgZXDwQPj39az845kW2gee5KEGOGC6BamMbUjkf864IK00xsbPEhm2'
    );

    // Create an instance of Elements
    const elements = this.stripe.elements();

    // Create an instance of the card Element
    this.card = elements.create('card', { hidePostalCode: true });

    // Mount the card Element to the container
    this.card.mount('#card-element');
  }

  makePayment() {
    this.isDisabled = true;
    // Create PaymentMethod using the card Element
    this.stripe
      .createPaymentMethod({
        type: 'card',
        card: this.card, // Use the defined card variable
      })
      .then((result: any) => {
        if (result.error) {
          console.error('Error creating PaymentMethod:', result.error);
          this.isDisabled = false;
        } else {
          // PaymentMethod created successfully, proceed to create PaymentIntent on the server
          this.createPaymentIntent().subscribe(
            (response) => {
              // Handle successful payment intent creation
              this.clientSecret = response.clientSecret;

              // Call the Stripe.js method to confirm the payment on the client side
              this.stripe
                .confirmCardPayment(this.clientSecret, {
                  payment_method: result.paymentMethod.id, // Pass the PaymentMethod ID
                })
                .then((confirmationResult: any) => {
                  if (confirmationResult.error) {
                    // Handle payment confirmation error
                    console.error(
                      'Payment confirmation error:',
                      confirmationResult.error
                    );
                  } else {
                    // Payment confirmed successfully
                    (this.paymentDetails = confirmationResult.paymentIntent),
                      console.log('Payment confirmed:', this.paymentDetails);
                    if (this.formData.familyDetails === undefined) {
                      this.addVehicleInsurance().subscribe(
                        (response) => {
                          console.log(response);
                          this.router.navigate(['confirm'], {
                            state: {
                              formData: response,
                              paymentDetails: this.paymentDetails,
                            },
                          });
                        },
                        (error) => {
                          console.log(error.error);
                          this.isDisabled = false;
                        }
                      );
                    } else {
                      this.addHealthInsurance().subscribe(
                        (response) => {
                          console.log(response);
                          this.router.navigate(['confirm'], {
                            state: {
                              formData: response,
                              paymentDetails: this.paymentDetails,
                            },
                          });
                        },
                        (error) => {
                          console.log(error.error);
                        }
                      );
                    }
                  }
                });
            },
            (error) => {
              // Handle errors
              console.error('Error creating payment intent:', error);
              this.isDisabled = false;
            }
          );
        }
      });
  }

  private createPaymentIntent(): Observable<any> {
    // Send PaymentMethod ID to the server to create a PaymentIntent

    return this.http.post<any>(`${this.apiUrl}api/create-payment-intent`, {
      amount: Number(this.formData.amount),
    });
  }

  private addVehicleInsurance(): Observable<any> {
    // Send PaymentMethod ID to the server to create a PaymentIntent

    return this.http.post<any>(`${this.apiUrl}vehicle/add`, this.formData);
  }
  private addHealthInsurance(): Observable<any> {
    // Send PaymentMethod ID to the server to create a PaymentIntent

    return this.http.post<any>(`${this.apiUrl}health/add`, this.formData);
  }
}
