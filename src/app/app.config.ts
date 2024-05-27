import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpTokenInterceptor } from './core/interceptors/http.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
              provideRouter(routes), 
              provideHttpClient(),
              importProvidersFrom(BrowserModule, HttpClientModule, FormsModule), 
              { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true } 
            ]
};
