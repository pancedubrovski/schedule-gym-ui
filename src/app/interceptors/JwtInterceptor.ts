import { DOCUMENT } from "@angular/common";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";



@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(@Inject(DOCUMENT) private document: Document) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const localStorage = this.document.defaultView?.localStorage;


        if (localStorage) {
            const token = localStorage.getItem('token');

            if (token != null || token != '') {
                req = req.clone({
                    setHeaders: { Authorization: `Bearer ${token}` }
                });
            }

        }
        return next.handle(req);
    }
}