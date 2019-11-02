import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  loginUser(loginRequest): Observable<{ user: any }> {
    return this.login(loginRequest).pipe(
      filter(logindata => !!logindata),
      map(logindata => {
        this.initSession(logindata);
        return { user: logindata };
      })
    );
  }
  private initSession(data: any) {
    sessionStorage.setItem('token', data.token);
    sessionStorage.setItem('role', data.role);
  }

  login(loginRequest: any): Observable<any> {
    return this.httpClient.post('/api/login', loginRequest);
  }
}
