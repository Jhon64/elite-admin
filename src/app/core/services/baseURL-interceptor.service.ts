import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BaseUrlInterceptor implements HttpInterceptor {

  // 👉 Tu API base
  private baseUrl = environment.apiUrl;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // ✅ Si ya es URL absoluta, no modificar
    if (req.url.startsWith('http://') || req.url.startsWith('https://')) {
      return next.handle(req);
    }

    // ❌ Evitar modificar assets
    if (req.url.startsWith('/assets')) {
      return next.handle(req);
    }

 
    // 🔄 Construir nueva URL
    const apiReq = req.clone({
      url: `${this.baseUrl}${req.url}`
    });

    return next.handle(apiReq);
  }
}