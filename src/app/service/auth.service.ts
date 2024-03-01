import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:2000/login';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; username: string; password: string }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' }); // Add necessary headers

    return this.http.post<any>(this.apiUrl, credentials, { headers })
      .pipe(
        tap(response => console.log('Login response:', response)), // Log response for debugging
        catchError(error => {
          console.error('Login error:', error);
          return throwError(error); // Re-throw the error for further handling
        })
      );
  }
}
