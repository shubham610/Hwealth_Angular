import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideNgxStripe } from 'ngx-stripe';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideNgxStripe(
      'pk_test_51NTUMQSCuUXEi5M2IorbEXUsbJEizJLoSr3CK0R10mXnrgZXDwQPj39az845kW2gee5KEGOGC6BamMbUjkf864IK00xsbPEhm2'
    ),
  ],
};
