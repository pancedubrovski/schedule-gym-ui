import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginCommand } from '../models/login-command';
import { environment } from '../../environments/environments';
import { RegisterCommand } from '../models/register-command';
import * as jwt_decode from 'jwt-decode';
import { BehaviorSubject, finalize, map, Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor(protected http: HttpClient) {
    if (typeof window !== 'undefined') {
   
      this.isAuthenticatedSubject.next(!!localStorage.getItem('token'));
    }
  }

  public login(body: LoginCommand) {
   
    return this.http.post(`${environment.apiUrl}v1/schedule-gym/login`, body, { responseType: 'text' })
    .pipe(finalize(() => 
      this.isAuthenticatedSubject.next(true)));
  }

  public register(body: RegisterCommand) {
    return this.http.post(`${environment.apiUrl}v1/schedule-gym/register`, body)
    .pipe(finalize(() => 
      this.isAuthenticatedSubject.next(true)));
  }
  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('ownerId');
   return of(this.isAuthenticatedSubject.next(false));
  }


  public setDataToSession(token: any) {

    localStorage.setItem('token', token);
    const decodetToken = jwt_decode.jwtDecode(token);
    localStorage.setItem('ownerId', (decodetToken as any)?.ownerId);
  }
}


