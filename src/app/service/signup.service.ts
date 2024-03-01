import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private apiUrl = 'http://localhost:2000/signup'; // Corrected the string syntax

  constructor(private http: HttpClient) { }

  signup(userData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, userData);
  }
}
