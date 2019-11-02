import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CreateUserService {

  constructor(private httpClient: HttpClient) { }

  createUser(userDetails: any): Observable<any> {
    return this.httpClient.post('/api/createUser', userDetails);
  }
}
