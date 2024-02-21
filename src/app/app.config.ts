import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { AppointmentService } from './services/appointment.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(),AppointmentService],
};
