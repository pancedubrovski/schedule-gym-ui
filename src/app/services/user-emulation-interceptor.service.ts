import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserEmulationInterceptorService implements HttpInterceptor {

  private readonly token: string;

  constructor() {
    this.token = localStorage.getItem('token')!;
   }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.token){
      const modReq = req.clone({
        setHeaders: {
          'Authorization': 'Bearer '+this.token
        }
      });
      return next.handle(modReq);
    }
    return next.handle(req);
  }
}
