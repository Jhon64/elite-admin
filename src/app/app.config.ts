import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { BaseUrlInterceptor } from './core/services/baseURL-interceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
     provideHttpClient(
      // Habilita el soporte para interceptores basados en clases
      withInterceptorsFromDi() 
    ),
    // Registro manual del interceptor como proveedor
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: BaseUrlInterceptor, 
      multi: true 
    }
  ]
};
